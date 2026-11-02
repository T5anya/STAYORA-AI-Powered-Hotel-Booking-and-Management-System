export type UserRole = 'customer' | 'owner' | 'staff' | 'admin' | 'hotel_owner' | 'hotel_staff' | 'platform_admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  hotelId?: string; // If owner or staff, bound to specific hotel
  staffRole?: 'Receptionist' | 'Housekeeping' | 'Manager' | 'Service Staff' | 'Maintenance Staff';
  createdAt: string;
}

export type RoomStatus = 'Available' | 'Reserved' | 'Occupied' | 'Cleaning' | 'Clean' | 'Maintenance' | 'Unavailable';

export interface Room {
  id: string;
  hotelId: string;
  roomNumber: string;
  roomType: string;
  name: string;
  description: string;
  capacityAdults: number;
  capacityChildren: number;
  pricePerNight: number;
  sizeSqFt: number;
  bedType: string;
  amenities: string[];
  images: string[];
  status: RoomStatus;
}

export interface Hotel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  destination: string;
  city: string;
  state: string;
  country: string;
  address: string;
  category: 'Luxury Heritage' | 'Boutique Resort' | 'Mountain Retreat' | 'Coastal Villa' | 'Business Prime' | 'Wellness Sanctuary';
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  heroImage: string;
  images: string[];
  amenities: string[];
  policies: {
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;
    petFriendly: boolean;
    smokingAllowed: boolean;
  };
  verified: boolean;
  ownerId: string;
  featured?: boolean;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Success' | 'Failed' | 'Refunded';

export interface Booking {
  id: string;
  bookingReference: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  hotelId: string;
  hotelName: string;
  hotelCity: string;
  roomId: string;
  roomNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  roomPricePerNight: number;
  subtotal: number;
  taxAmount: number;
  serviceFee: number;
  discountAmount: number;
  couponCode?: string;
  totalAmount: number;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: 'UPI' | 'Card' | 'NetBanking';
  transactionId?: string;
  specialRequests?: string;
  qrCodeData: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  shareAmount: number;
  paymentStatus: 'Pending' | 'Paid';
  paidAt?: string;
  roomAssigned?: string;
}

export interface GroupBooking {
  id: string;
  groupCode: string;
  name: string;
  organizerId: string;
  organizerName: string;
  hotelId: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  roomsCount: number;
  totalCost: number;
  amountPaid: number;
  splitType: 'full_organizer' | 'equal_split' | 'custom_split';
  members: GroupMember[];
  status: 'Draft' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  hotelId: string;
  userId: string;
  userName: string;
  userCity?: string;
  bookingId?: string;
  rating: number;
  categories: {
    cleanliness: number;
    comfort: number;
    location: number;
    service: number;
    value: number;
  };
  comment: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  date: string;
}

export interface HousekeepingTask {
  id: string;
  hotelId: string;
  roomNumber: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Normal' | 'High' | 'Urgent';
  notes: string;
  createdAt: string;
  completedAt?: string;
}

export interface MaintenanceTask {
  id: string;
  hotelId: string;
  roomNumber: string;
  issue: string;
  assignedStaffName?: string;
  priority: 'Normal' | 'High' | 'Urgent';
  status: 'Reported' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface FoodItem {
  id: string;
  hotelId: string;
  name: string;
  description: string;
  category: 'Breakfast' | 'Starters' | 'Main Course' | 'Desserts' | 'Beverages';
  price: number;
  isVegetarian: boolean;
  image: string;
  isAvailable: boolean;
}

export interface FoodOrder {
  id: string;
  orderNumber: string;
  hotelId: string;
  userId: string;
  customerName: string;
  roomNumber: string;
  items: {
    foodItemId: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalAmount: number;
  status: 'Incoming' | 'Accepted' | 'Preparing' | 'Ready' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  specialInstructions?: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  minBookingValue: number;
  description: string;
  validUntil: string;
}

export interface KPIStats {
  totalBookings: number;
  todayArrivals: number;
  todayDepartures: number;
  occupancyRate: number;
  availableRooms: number;
  occupiedRooms: number;
  totalRooms: number;
  totalRevenue: number;
  pendingPayments: number;
  cancellationRate: number;
  adr: number; // Average Daily Rate
  revPar: number; // Revenue Per Available Room
}

export interface AIRecommendation {
  hotel: Hotel;
  matchScore: number; // 0 to 100
  reasons: string[];
  priceSuitability: string;
  amenityMatch: string;
}

export interface AIPricingSuggestion {
  roomType: string;
  currentPrice: number;
  suggestedPrice: number;
  differencePercentage: number;
  justification: string;
  confidence: number;
  demandFactor: string;
}

export interface AIBusinessInsight {
  id: string;
  category: 'occupancy' | 'revenue' | 'operations' | 'sentiment';
  finding: string;
  dateRange: string;
  supportingMetric: string;
  suggestedAction: string;
  confidenceLevel: 'High' | 'Medium';
}
