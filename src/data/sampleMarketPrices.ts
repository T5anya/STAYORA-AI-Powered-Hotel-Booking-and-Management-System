export interface PricePoint {
  date: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  volumeQuintals: number;
}

export interface StatePriceData {
  state: string;
  districts: string[];
  history: PricePoint[];
}

export const SAMPLE_MARKET_PRICES: Record<string, StatePriceData[]> = {
  wheat: [
    {
      state: 'Madhya Pradesh',
      districts: ['Indore', 'Sehore', 'Hoshangabad', 'Ujjain'],
      history: [
        { date: 'May 2026', avgPrice: 2280, minPrice: 2150, maxPrice: 2420, modalPrice: 2260, volumeQuintals: 14200 },
        { date: 'Jun 2026', avgPrice: 2310, minPrice: 2180, maxPrice: 2450, modalPrice: 2300, volumeQuintals: 9800 },
        { date: 'Jul 2026', avgPrice: 2350, minPrice: 2200, maxPrice: 2480, modalPrice: 2340, volumeQuintals: 7200 },
        { date: 'Aug 2026', avgPrice: 2390, minPrice: 2250, maxPrice: 2520, modalPrice: 2380, volumeQuintals: 6100 },
        { date: 'Sep 2026', avgPrice: 2430, minPrice: 2290, maxPrice: 2560, modalPrice: 2420, volumeQuintals: 5400 },
        { date: 'Oct 2026', avgPrice: 2470, minPrice: 2320, maxPrice: 2600, modalPrice: 2460, volumeQuintals: 4900 },
      ],
    },
    {
      state: 'Haryana',
      districts: ['Karnal', 'Kurukshetra', 'Ambala', 'Hisar'],
      history: [
        { date: 'May 2026', avgPrice: 2260, minPrice: 2125, maxPrice: 2380, modalPrice: 2250, volumeQuintals: 18500 },
        { date: 'Jun 2026', avgPrice: 2290, minPrice: 2160, maxPrice: 2410, modalPrice: 2280, volumeQuintals: 11200 },
        { date: 'Jul 2026', avgPrice: 2330, minPrice: 2190, maxPrice: 2440, modalPrice: 2320, volumeQuintals: 8400 },
        { date: 'Aug 2026', avgPrice: 2360, minPrice: 2220, maxPrice: 2480, modalPrice: 2350, volumeQuintals: 6900 },
        { date: 'Sep 2026', avgPrice: 2400, minPrice: 2260, maxPrice: 2520, modalPrice: 2390, volumeQuintals: 5800 },
        { date: 'Oct 2026', avgPrice: 2440, minPrice: 2300, maxPrice: 2550, modalPrice: 2430, volumeQuintals: 5100 },
      ],
    },
    {
      state: 'Uttar Pradesh',
      districts: ['Agra', 'Aligarh', 'Bareilly', 'Varanasi'],
      history: [
        { date: 'May 2026', avgPrice: 2240, minPrice: 2100, maxPrice: 2350, modalPrice: 2230, volumeQuintals: 16400 },
        { date: 'Jun 2026', avgPrice: 2270, minPrice: 2140, maxPrice: 2390, modalPrice: 2260, volumeQuintals: 10500 },
        { date: 'Jul 2026', avgPrice: 2310, minPrice: 2170, maxPrice: 2420, modalPrice: 2300, volumeQuintals: 7900 },
        { date: 'Aug 2026', avgPrice: 2340, minPrice: 2200, maxPrice: 2460, modalPrice: 2330, volumeQuintals: 6500 },
        { date: 'Sep 2026', avgPrice: 2380, minPrice: 2240, maxPrice: 2500, modalPrice: 2370, volumeQuintals: 5600 },
        { date: 'Oct 2026', avgPrice: 2420, minPrice: 2280, maxPrice: 2540, modalPrice: 2410, volumeQuintals: 4800 },
      ],
    },
  ],
  rice: [
    {
      state: 'Punjab',
      districts: ['Ludhiana', 'Amritsar', 'Patiala', 'Jalandhar'],
      history: [
        { date: 'May 2026', avgPrice: 3200, minPrice: 2950, maxPrice: 3450, modalPrice: 3180, volumeQuintals: 9200 },
        { date: 'Jun 2026', avgPrice: 3250, minPrice: 3000, maxPrice: 3500, modalPrice: 3220, volumeQuintals: 7500 },
        { date: 'Jul 2026', avgPrice: 3320, minPrice: 3050, maxPrice: 3580, modalPrice: 3300, volumeQuintals: 6200 },
        { date: 'Aug 2026', avgPrice: 3400, minPrice: 3120, maxPrice: 3650, modalPrice: 3380, volumeQuintals: 5500 },
        { date: 'Sep 2026', avgPrice: 3480, minPrice: 3180, maxPrice: 3720, modalPrice: 3460, volumeQuintals: 6800 },
        { date: 'Oct 2026', avgPrice: 3550, minPrice: 3250, maxPrice: 3800, modalPrice: 3520, volumeQuintals: 11200 },
      ],
    },
  ],
  potato: [
    {
      state: 'Uttar Pradesh',
      districts: ['Agra', 'Farrukhabad', 'Kannauj', 'Mathura'],
      history: [
        { date: 'May 2026', avgPrice: 1150, minPrice: 950, maxPrice: 1350, modalPrice: 1120, volumeQuintals: 32000 },
        { date: 'Jun 2026', avgPrice: 1240, minPrice: 1020, maxPrice: 1420, modalPrice: 1210, volumeQuintals: 24000 },
        { date: 'Jul 2026', avgPrice: 1320, minPrice: 1100, maxPrice: 1510, modalPrice: 1290, volumeQuintals: 19000 },
        { date: 'Aug 2026', avgPrice: 1410, minPrice: 1180, maxPrice: 1600, modalPrice: 1380, volumeQuintals: 16500 },
        { date: 'Sep 2026', avgPrice: 1490, minPrice: 1250, maxPrice: 1680, modalPrice: 1460, volumeQuintals: 14200 },
        { date: 'Oct 2026', avgPrice: 1580, minPrice: 1320, maxPrice: 1750, modalPrice: 1550, volumeQuintals: 12800 },
      ],
    },
  ],
  tomato: [
    {
      state: 'Maharashtra',
      districts: ['Nashik', 'Pune', 'Ahmednagar', 'Satara'],
      history: [
        { date: 'May 2026', avgPrice: 1450, minPrice: 1050, maxPrice: 1850, modalPrice: 1400, volumeQuintals: 18000 },
        { date: 'Jun 2026', avgPrice: 1950, minPrice: 1350, maxPrice: 2400, modalPrice: 1900, volumeQuintals: 14000 },
        { date: 'Jul 2026', avgPrice: 2400, minPrice: 1700, maxPrice: 2950, modalPrice: 2350, volumeQuintals: 9500 },
        { date: 'Aug 2026', avgPrice: 2150, minPrice: 1550, maxPrice: 2650, modalPrice: 2100, volumeQuintals: 12000 },
        { date: 'Sep 2026', avgPrice: 1750, minPrice: 1250, maxPrice: 2150, modalPrice: 1700, volumeQuintals: 16500 },
        { date: 'Oct 2026', avgPrice: 1500, minPrice: 1100, maxPrice: 1900, modalPrice: 1480, volumeQuintals: 21000 },
      ],
    },
  ],
  onion: [
    {
      state: 'Maharashtra',
      districts: ['Nashik', 'Lasalgaon', 'Ahmednagar', 'Solapur'],
      history: [
        { date: 'May 2026', avgPrice: 1650, minPrice: 1300, maxPrice: 1950, modalPrice: 1620, volumeQuintals: 26000 },
        { date: 'Jun 2026', avgPrice: 1820, minPrice: 1450, maxPrice: 2120, modalPrice: 1780, volumeQuintals: 21000 },
        { date: 'Jul 2026', avgPrice: 2050, minPrice: 1650, maxPrice: 2380, modalPrice: 2010, volumeQuintals: 17500 },
        { date: 'Aug 2026', avgPrice: 2280, minPrice: 1820, maxPrice: 2650, modalPrice: 2240, volumeQuintals: 14800 },
        { date: 'Sep 2026', avgPrice: 2520, minPrice: 2050, maxPrice: 2900, modalPrice: 2480, volumeQuintals: 12500 },
        { date: 'Oct 2026', avgPrice: 2680, minPrice: 2180, maxPrice: 3100, modalPrice: 2640, volumeQuintals: 11200 },
      ],
    },
  ],
  mustard: [
    {
      state: 'Rajasthan',
      districts: ['Bharatpur', 'Bikaner', 'Alwar', 'Kota'],
      history: [
        { date: 'May 2026', avgPrice: 4950, minPrice: 4600, maxPrice: 5300, modalPrice: 4920, volumeQuintals: 11500 },
        { date: 'Jun 2026', avgPrice: 5080, minPrice: 4720, maxPrice: 5410, modalPrice: 5050, volumeQuintals: 8900 },
        { date: 'Jul 2026', avgPrice: 5200, minPrice: 4850, maxPrice: 5520, modalPrice: 5160, volumeQuintals: 7200 },
        { date: 'Aug 2026', avgPrice: 5320, minPrice: 4950, maxPrice: 5650, modalPrice: 5280, volumeQuintals: 6100 },
        { date: 'Sep 2026', avgPrice: 5440, minPrice: 5080, maxPrice: 5780, modalPrice: 5400, volumeQuintals: 5300 },
        { date: 'Oct 2026', avgPrice: 5550, minPrice: 5150, maxPrice: 5880, modalPrice: 5500, volumeQuintals: 4700 },
      ],
    },
  ],
  maize: [
    {
      state: 'Karnataka',
      districts: ['Davangere', 'Haveri', 'Belagavi', 'Ballari'],
      history: [
        { date: 'May 2026', avgPrice: 1920, minPrice: 1750, maxPrice: 2080, modalPrice: 1900, volumeQuintals: 13500 },
        { date: 'Jun 2026', avgPrice: 1980, minPrice: 1800, maxPrice: 2140, modalPrice: 1960, volumeQuintals: 10200 },
        { date: 'Jul 2026', avgPrice: 2040, minPrice: 1850, maxPrice: 2200, modalPrice: 2020, volumeQuintals: 8500 },
        { date: 'Aug 2026', avgPrice: 2110, minPrice: 1910, maxPrice: 2260, modalPrice: 2090, volumeQuintals: 7100 },
        { date: 'Sep 2026', avgPrice: 2180, minPrice: 1970, maxPrice: 2330, modalPrice: 2150, volumeQuintals: 6200 },
        { date: 'Oct 2026', avgPrice: 2240, minPrice: 2020, maxPrice: 2390, modalPrice: 2210, volumeQuintals: 5800 },
      ],
    },
  ],
};
