import { SAMPLE_BUYERS, SampleBuyer } from '../data/sampleBuyers';
import { convertToQuintals } from './calculationService';

export interface HarvestMatchRequest {
  crop: string;
  quantity: number;
  unit: 'quintal' | 'kg';
  grade: string;
  state: string;
  district: string;
  harvestDate?: string;
  sellingDeadline?: string;
  minAcceptablePrice?: number;
  maxTransportDistanceKm?: number;
  customBuyers?: SampleBuyer[];
}

export interface BuyerMatchItem {
  buyerId: string;
  buyerName: string;
  buyerType: string;
  location: string;
  distanceKm: number;
  indicativePricePerQuintal: number;
  compatibleQuantityQuintals: number;
  unabsorbedQuantityQuintals: number;
  grossSaleValue: number;
  transportDeduction: number;
  handlingDeduction: number;
  totalDeductions: number;
  estimatedNetProceeds: number;
  effectiveNetPricePerQuintal: number;
  paymentTerms: string;
  paymentTermsHi: string;
  deliveryRequirement: string;
  matchReasons: string[];
  keyRisks: string[];
  rank: number;
}

export interface RejectedBuyerItem {
  buyerId: string;
  buyerName: string;
  buyerType: string;
  location: string;
  rejectionReasons: string[];
  rejectionReasonsHi: string[];
}

export interface MatchEngineResult {
  totalCandidatesEvaluated: number;
  compatibleMatches: BuyerMatchItem[];
  rejectedCandidates: RejectedBuyerItem[];
  harvestQuantityQuintals: number;
  crop: string;
  grade: string;
  bestEstimatedNetProceeds: number;
  bestBuyerName: string | null;
}

export function matchBuyers(request: HarvestMatchRequest): MatchEngineResult {
  const allBuyers = request.customBuyers && request.customBuyers.length > 0
    ? request.customBuyers
    : SAMPLE_BUYERS;

  const harvestQty = convertToQuintals(request.quantity, request.unit || 'quintal');
  const cropLower = (request.crop || '').toLowerCase().trim();
  const minPrice = Number(request.minAcceptablePrice) || 0;
  const maxDistance = Number(request.maxTransportDistanceKm) || 300;

  const compatibleMatches: BuyerMatchItem[] = [];
  const rejectedCandidates: RejectedBuyerItem[] = [];

  for (const buyer of allBuyers) {
    if (!buyer.active) {
      continue;
    }

    const rejectionReasons: string[] = [];
    const rejectionReasonsHi: string[] = [];

    // 1. Crop compatibility
    const acceptsCrop = buyer.acceptedCrops.some(
      (c) => c.toLowerCase() === cropLower || cropLower.includes(c.toLowerCase()) || c.toLowerCase().includes(cropLower)
    );
    if (!acceptsCrop) {
      rejectionReasons.push(`Does not purchase ${request.crop}`);
      rejectionReasonsHi.push(`${request.crop} की खरीद नहीं करते हैं`);
    }

    // 2. Grade compatibility
    if (acceptsCrop && request.grade) {
      const gradeLower = request.grade.toLowerCase();
      const acceptsGrade = buyer.acceptedGrades.some((g) => {
        const gLow = g.toLowerCase();
        if (gradeLower.includes('grade a') && gLow.includes('grade a')) return true;
        if (gradeLower.includes('grade b') && gLow.includes('grade b')) return true;
        if (gradeLower.includes('grade c') && gLow.includes('grade c')) return true;
        return gLow.includes(gradeLower) || gradeLower.includes(gLow);
      });
      if (!acceptsGrade) {
        rejectionReasons.push(`Quality grade "${request.grade}" does not meet buyer specifications`);
        rejectionReasonsHi.push(`गुणवत्ता ग्रेड "${request.grade}" खरीदार के मानकों से मेल नहीं खाती`);
      }
    }

    // 3. Buyer Indicative Price
    const indicativePrice = buyer.indicativePricePerQuintal[cropLower] || 0;
    if (acceptsCrop && indicativePrice <= 0) {
      rejectionReasons.push('No current active price quotation for this crop');
      rejectionReasonsHi.push('इस फसल के लिए कोई सक्रिय भाव उपलब्ध नहीं है');
    } else if (minPrice > 0 && indicativePrice < minPrice) {
      rejectionReasons.push(`Offered price (₹${indicativePrice}/qtl) is below your minimum threshold of ₹${minPrice}/qtl`);
      rejectionReasonsHi.push(`प्रस्तावित भाव (₹${indicativePrice}/क्विंटल) आपके न्यूनतम ₹${minPrice}/क्विंटल से कम है`);
    }

    // 4. Quantity compatibility
    if (harvestQty < buyer.minQuantityQuintals) {
      rejectionReasons.push(`Batch size (${harvestQty} qtl) is below minimum lot capacity (${buyer.minQuantityQuintals} qtl)`);
      rejectionReasonsHi.push(`मात्रा (${harvestQty} क्विंटल) न्यूनतम क्षमता (${buyer.minQuantityQuintals} क्विंटल) से कम है`);
    }

    // 5. Distance check
    const isLocalState = buyer.state.toLowerCase() === (request.state || '').toLowerCase();
    const effectiveDistance = isLocalState ? buyer.estimatedDistanceKm : buyer.estimatedDistanceKm + 100;
    if (effectiveDistance > maxDistance) {
      rejectionReasons.push(`Distance (${effectiveDistance} km) exceeds maximum acceptable transport limit (${maxDistance} km)`);
      rejectionReasonsHi.push(`दूरी (${effectiveDistance} किमी) आपकी अधिकतम परिवहन सीमा (${maxDistance} किमी) से अधिक है`);
    }

    if (rejectionReasons.length > 0) {
      rejectedCandidates.push({
        buyerId: buyer.id,
        buyerName: buyer.name,
        buyerType: buyer.buyerType,
        location: `${buyer.district}, ${buyer.state}`,
        rejectionReasons,
        rejectionReasonsHi,
      });
      continue;
    }

    // Feasible candidate!
    const compatibleQty = Math.min(harvestQty, buyer.maxQuantityQuintals);
    const unabsorbedQty = Math.max(0, harvestQty - buyer.maxQuantityQuintals);

    const grossSale = compatibleQty * indicativePrice;
    const transportCost = Math.round(compatibleQty * buyer.transportRatePerKmPerQuintal * (effectiveDistance / 25));
    const handlingCost = Math.round(compatibleQty * buyer.handlingFeePerQuintal);
    const totalDeductions = transportCost + handlingCost;
    const netProceeds = grossSale - totalDeductions;
    const effectiveNetPrice = compatibleQty > 0 ? netProceeds / compatibleQty : 0;

    const matchReasons: string[] = [
      `Compatible crop & accepted grade: ${request.grade || 'Standard'}`,
      `Can absorb ${compatibleQty} quintals (${Math.round((compatibleQty / harvestQty) * 100)}% of harvest)`,
      `Competitive base quotation of ₹${indicativePrice}/quintal`,
    ];
    if (isLocalState) {
      matchReasons.push(`Located within home state (${buyer.district}), reducing transport transit time`);
    }

    const keyRisks: string[] = [];
    if (unabsorbedQty > 0) {
      keyRisks.push(`Leaves ${unabsorbedQty} quintals unabsorbed; requires secondary buyer or lot splitting`);
    }
    if (buyer.paymentTerms.toLowerCase().includes('7 days') || buyer.paymentTerms.toLowerCase().includes('corporate')) {
      keyRisks.push('Payment credit period requires 3 to 7 business days waiting');
    }
    if (effectiveDistance > 60) {
      keyRisks.push(`Transport distance (${effectiveDistance} km) introduces potential transit moisture/weight loss`);
    }

    compatibleMatches.push({
      buyerId: buyer.id,
      buyerName: buyer.name,
      buyerType: buyer.buyerType,
      location: `${buyer.district}, ${buyer.state}`,
      distanceKm: effectiveDistance,
      indicativePricePerQuintal: indicativePrice,
      compatibleQuantityQuintals: compatibleQty,
      unabsorbedQuantityQuintals: unabsorbedQty,
      grossSaleValue: grossSale,
      transportDeduction: transportCost,
      handlingDeduction: handlingCost,
      totalDeductions,
      estimatedNetProceeds: netProceeds,
      effectiveNetPricePerQuintal: Math.round(effectiveNetPrice),
      paymentTerms: buyer.paymentTerms,
      paymentTermsHi: buyer.paymentTermsHi,
      deliveryRequirement: buyer.deliveryRequirement,
      matchReasons,
      keyRisks,
      rank: 0,
    });
  }

  // Sort by net proceeds descending
  compatibleMatches.sort((a, b) => b.estimatedNetProceeds - a.estimatedNetProceeds);
  compatibleMatches.forEach((m, idx) => {
    m.rank = idx + 1;
  });

  const bestMatch = compatibleMatches[0];

  return {
    totalCandidatesEvaluated: allBuyers.length,
    compatibleMatches,
    rejectedCandidates,
    harvestQuantityQuintals: harvestQty,
    crop: request.crop,
    grade: request.grade,
    bestEstimatedNetProceeds: bestMatch ? bestMatch.estimatedNetProceeds : 0,
    bestBuyerName: bestMatch ? bestMatch.buyerName : null,
  };
}
