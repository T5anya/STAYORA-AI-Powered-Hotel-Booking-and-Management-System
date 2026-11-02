import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Users, Filter, ArrowLeft, ShieldCheck, AlertCircle, Sparkles, Building2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { apiRequest } from '../api/client';
import { BuyerCard } from '../components/BuyerCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { MatchEngineResult } from '../services/matchingService';
import { CROPS } from '../data/crops';

export const Buyers: React.FC = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedLotFromState = (location.state as any)?.selectedLot;

  const [myListings, setMyListings] = useState<any[]>([]);
  const [selectedLotId, setSelectedLotId] = useState<string>(selectedLotFromState?.id || '');
  const [crop, setCrop] = useState<string>(selectedLotFromState?.crop || 'Wheat');
  const [quantity, setQuantity] = useState<number>(selectedLotFromState?.quantity || 100);
  const [unit, setUnit] = useState<'quintal' | 'kg'>(selectedLotFromState?.unit || 'quintal');
  const [grade, setGrade] = useState<string>(selectedLotFromState?.grade || 'Grade A (Sharbati/Premium)');
  const [state, setState] = useState<string>(selectedLotFromState?.state || 'Madhya Pradesh');
  const [district, setDistrict] = useState<string>(selectedLotFromState?.district || 'Sehore');
  const [minPrice, setMinPrice] = useState<number>(selectedLotFromState?.min_selling_price || 2200);

  const [matchResult, setMatchResult] = useState<MatchEngineResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch farmer's own listings to populate lot switcher
  useEffect(() => {
    async function fetchListings() {
      try {
        const data = await apiRequest<{ listings: any[] }>('/api/listings?ownerOnly=true');
        setMyListings(data.listings || []);
        if (!selectedLotId && data.listings && data.listings.length > 0) {
          applyLot(data.listings[0]);
        }
      } catch (err: any) {
        // ignore if not logged in
      }
    }
    fetchListings();
  }, []);

  const applyLot = (lot: any) => {
    setSelectedLotId(lot.id);
    setCrop(lot.crop);
    setQuantity(lot.quantity);
    setUnit(lot.unit);
    setGrade(lot.grade);
    setState(lot.state);
    setDistrict(lot.district);
    setMinPrice(lot.min_selling_price || 0);
  };

  const handleLotSelect = (id: string) => {
    const found = myListings.find((l) => l.id === id);
    if (found) {
      applyLot(found);
    }
  };

  const runMatching = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiRequest<MatchEngineResult>('/api/match-buyers', {
        method: 'POST',
        body: JSON.stringify({
          crop,
          quantity,
          unit,
          grade,
          state,
          district,
          minAcceptablePrice: minPrice,
        }),
      });
      setMatchResult(result);
    } catch (err: any) {
      setError(err.message || 'Error running buyer matching.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runMatching();
  }, [crop, quantity, unit, grade, state, district, minPrice]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#166534]">
            {t.feat1Title}
          </span>
          <h1 className="text-2xl font-black text-[#17251C] tracking-tight mt-0.5">
            {language === 'hi' ? 'उपयुक्त खरीदार मिलान इंजन' : 'Compatible Buyer Matching Engine'}
          </h1>
          <p className="text-xs text-[#647067] mt-1 max-w-2xl">
            {language === 'hi'
              ? 'पारदर्शी नियम-आधारित मिलान जो फसल, ग्रेड, मात्रा और परिवहन लागत को ध्यान में रखकर सर्वोत्तम शुद्ध प्राप्ति वाले खरीदारों को रैंक करता है।'
              : 'Rule-based matching evaluating crop compatibility, buyer capacity, geographic distance, and net proceeds.'}
          </p>
        </div>

        {myListings.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
              {language === 'hi' ? 'फसल चुनें:' : 'Select Lot:'}
            </span>
            <select
              value={selectedLotId}
              onChange={(e) => handleLotSelect(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm bg-white font-semibold text-gray-800 focus:outline-none focus:border-[#166534]"
            >
              {myListings.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.crop} - {l.quantity} {l.unit} ({l.district})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Criteria Filter Strip */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div>
          <span className="text-gray-500 block mb-1">{t.cropLabel}</span>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 font-semibold focus:outline-none focus:border-[#166534] bg-white"
          >
            {CROPS.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="text-gray-500 block mb-1">{t.quantityLabel}</span>
          <div className="flex gap-1">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-2/3 px-2.5 py-1.5 rounded-lg border border-gray-200 font-semibold focus:outline-none focus:border-[#166534]"
            />
            <span className="w-1/3 flex items-center justify-center bg-gray-100 rounded-lg text-[11px] font-semibold text-gray-600">
              {unit}
            </span>
          </div>
        </div>

        <div>
          <span className="text-gray-500 block mb-1">{t.gradeLabel}</span>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 font-semibold focus:outline-none focus:border-[#166534]"
          />
        </div>

        <div>
          <span className="text-gray-500 block mb-1">{t.locationCol}</span>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 font-semibold focus:outline-none focus:border-[#166534]"
          />
        </div>

        <div>
          <span className="text-gray-500 block mb-1">{t.minSellingPriceLabel}</span>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 font-semibold focus:outline-none focus:border-[#166534]"
          />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Evaluating candidate buyers and computing net proceeds..." />
      ) : error ? (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : matchResult ? (
        <div className="space-y-6">
          {/* Summary Strip */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#166534]" />
              <span className="font-semibold text-emerald-950">
                {language === 'hi'
                  ? `${matchResult.totalCandidatesEvaluated} खरीदारों का मूल्यांकन किया गया • ${matchResult.compatibleMatches.length} उपयुक्त मिले`
                  : `Evaluated ${matchResult.totalCandidatesEvaluated} buyers • Found ${matchResult.compatibleMatches.length} compatible candidates`}
              </span>
            </div>

            {matchResult.bestBuyerName && (
              <span className="font-bold text-[#166534]">
                {language === 'hi' ? 'सर्वोत्तम शुद्ध प्राप्ति:' : 'Top Net Realization:'} ₹
                {matchResult.bestEstimatedNetProceeds.toLocaleString('en-IN')} ({matchResult.bestBuyerName})
              </span>
            )}
          </div>

          {/* Matched Buyers Grid */}
          {matchResult.compatibleMatches.length === 0 ? (
            <EmptyState
              title={language === 'hi' ? 'कोई उपयुक्त खरीदार नहीं मिला' : 'No Compatible Buyers Found'}
              description={
                language === 'hi'
                  ? 'वर्तमान मापदंडों (न्यूनतम भाव या ग्रेड) के साथ कोई खरीदार मेल नहीं खाता। कृपया नीचे अस्वीकृति का कारण देखें।'
                  : 'No candidate buyers satisfied all current constraints. Review the rejection reasons below or adjust your minimum price threshold.'
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchResult.compatibleMatches.map((m) => (
                <BuyerCard
                  key={m.buyerId}
                  match={m}
                  actionLabel={language === 'hi' ? 'विश्लेषण में उपयोग करें' : 'Analyze Scenarios'}
                  onSelect={() => navigate('/farmer/selling-analysis', { state: { selectedLot: selectedLotFromState, buyer: m } })}
                />
              ))}
            </div>
          )}

          {/* Rejected Candidates Section with Transparent Reasons */}
          {matchResult.rejectedCandidates.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#17251C]">
                    {language === 'hi' ? 'अस्वीकृत खरीदार और कारण' : 'Rejected Candidates & Explanations'}
                  </h3>
                  <p className="text-xs text-[#647067]">
                    {language === 'hi'
                      ? 'पारदर्शिता के तहत जानें कि ये खरीदार वर्तमान लॉट के लिए क्यों नहीं चुने गए'
                      : 'Why these candidate buyers did not qualify for this specific harvest batch'}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                  {matchResult.rejectedCandidates.length} excluded
                </span>
              </div>

              <div className="divide-y divide-gray-100 text-xs">
                {matchResult.rejectedCandidates.map((rej) => (
                  <div key={rej.buyerId} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-gray-800">{rej.buyerName} ({rej.buyerType})</h4>
                      <span className="text-[11px] text-gray-400">{rej.location}</span>
                    </div>

                    <div className="space-y-0.5 sm:text-right">
                      {(language === 'hi' ? rej.rejectionReasonsHi : rej.rejectionReasons).map((r, i) => (
                        <p key={i} className="text-red-600 font-medium text-[11px] flex sm:justify-end items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                          <span>{r}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
