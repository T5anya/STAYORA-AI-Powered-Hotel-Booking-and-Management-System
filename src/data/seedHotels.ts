import { Hotel, Room, FoodItem, Coupon } from '../types/hotel.js';
import { generateCatalog, CITIES_CATALOG } from './catalogGenerator.js';

const catalog = generateCatalog();

export const SEED_HOTELS: Hotel[] = catalog.hotels;
export const SEED_ROOMS: Room[] = catalog.rooms;
export { CITIES_CATALOG };

export const SEED_COUPONS: Coupon[] = [
  {
    code: 'STAYORA20',
    discountPercentage: 20,
    maxDiscount: 5000,
    minBookingValue: 15000,
    description: '20% off on premium stays up to ₹5,000 for Stayora members',
    validUntil: '2027-12-31'
  },
  {
    code: 'WELCOME10',
    discountPercentage: 10,
    maxDiscount: 3000,
    minBookingValue: 10000,
    description: 'Welcome 10% instant discount on your first booking',
    validUntil: '2027-12-31'
  },
  {
    code: 'LUXURY50',
    discountPercentage: 25,
    maxDiscount: 10000,
    minBookingValue: 35000,
    description: 'Exclusive 25% off on Royal Presidential suites & villas',
    validUntil: '2027-12-31'
  }
];

export const SEED_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'food-01',
    hotelId: 'hotel-01',
    name: 'Royal Rajasthani Thali',
    description: 'Laal Maas, Dal Baati Churma, Gatte ki Sabzi, Ker Sangri, served with hot phulkas, saffron pulao, and ghevar.',
    category: 'Main Course',
    price: 1850,
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
    isAvailable: true
  },
  {
    id: 'food-02',
    hotelId: 'hotel-01',
    name: 'Artisanal Saffron French Toast',
    description: 'Brioche soaked in Kashmiri saffron custard, wild organic berry compote, Madagascar vanilla cream, and maple drizzle.',
    category: 'Breakfast',
    price: 950,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1484723091739-0045614eb662?auto=format&fit=crop&w=600&q=80',
    isAvailable: true
  },
  {
    id: 'food-03',
    hotelId: 'hotel-01',
    name: 'Truffle Edamame Dim Sum',
    description: 'Steamed translucent parcels stuffed with crushed edamame, water chestnuts, and fragrant white truffle essence.',
    category: 'Starters',
    price: 1150,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
    isAvailable: true
  },
  {
    id: 'food-04',
    hotelId: 'hotel-01',
    name: 'Valrhona Dark Chocolate Fondant',
    description: '70% Guanaja chocolate molten cake with roasted pistachio gelato and gold leaf garnish.',
    category: 'Desserts',
    price: 850,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    isAvailable: true
  },
  {
    id: 'food-05',
    hotelId: 'hotel-01',
    name: 'Kashmiri Kahwa & Organic Darjeeling First Flush',
    description: 'Steeped green tea infused with saffron threads, cardamom pods, cinnamon bark, and slivered almonds.',
    category: 'Beverages',
    price: 550,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    isAvailable: true
  }
];
