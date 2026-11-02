# Stayora — "Stay Smarter. Travel Better."

**Stayora** is a full-stack, AI-powered multi-hotel booking marketplace and property management system with real business intelligence, predictive analytics, automated operations, and an interactive luxury UI.

---

## 1. Executive Summary & Architecture

Stayora connects discerning travelers with handpicked luxury heritage palaces, mountain sanctuaries, and private coastal villas across India, while providing hoteliers and staff with an enterprise-grade property management operating system.

### Core Architecture
- **Frontend:** React 19, TypeScript, React Router 7, Tailwind CSS v4, Lucide React, Recharts analytics, Framer Motion transitions, GSAP.
- **Backend:** Node.js 22 + Express running on Port 3000, Vite middleware integration, session/token authentication with scrypt hashing.
- **Database:** Persistent SQLite (WAL mode, foreign keys, concurrency reservation locks) with full document models for Users, Hotels, Rooms, Bookings, Group Bookings, Reviews, Favorites, Housekeeping Tasks, Food Orders, Coupons, and Audit Logs.
- **AI & Analytics Services:**
  1. *Smart Hotel Recommendations:* Weighted multi-factor recommendation engine (budget suitability, 4.5+ guest rating, signature amenities matching).
  2. *Natural Language Hotel Search:* Converts free-form requests into structured validated filters.
  3. *Stayora AI Concierge Assistant:* Grounded in live property catalog, room availability, cancellation policies, and active user bookings.
  4. *Demand Forecasting:* Grounded seasonality model for Indian heritage and holiday travel windows.
  5. *Smart Dynamic Pricing:* Occupancy-based tariff suggestions (+10-15% surge or promotional discounts).
  6. *Review Sentiment Analysis:* Categorizes cleanliness, comfort, service, culinary quality, and staff courtesy.
  7. *Cancellation Risk Estimation:* Lead time and refundable condition heuristics.

---

## 2. Key Modules & Features

### A. Customer Journey & Discovery
- **Cinematic Landing Page:** Hero search widget (Destination, Dates, Guests), interactive hotel slider with auto-play & touch swipe, categories, verified stays, guest testimonials, and FAQ.
- **Hotel Discovery & Filtering:** Live filter by destination, price slider, guest rating, signature amenities (Pool, Spa, Wi-Fi, Butler), sorting by recommendation score or price.
- **Natural Language AI Search:** Enter queries like *"Find a luxury heritage hotel in Jaipur under 30000 with pool and spa"* to auto-populate validated filters.
- **Hotel Comparison Tool:** Side-by-side comparison matrix for 2–4 hotels across tariffs, ratings, room sizes, breakfast, cancellation, and amenities.
- **Full Individual Booking Flow:** Room selection -> Guest details -> Capacity validation -> Coupon code application (`STAYORA20`, `WELCOME10`, `LUXURY50`) -> Itemized price breakdown (Subtotal + 12% GST + Resort Fee - Discount) -> Simulated Payment (UPI, Card, Net Banking) -> Instant Confirmation.
- **Printable Tax Invoice & SVG QR Pass:** Official tax invoice with GSTIN, booking reference, and cryptographic check-in QR code.
- **Customer Dashboard:** Booking history, 1-click invoice download, 1-click cancellation with simulated refund, in-suite dining order placement, and saved favorites.

### B. Group Booking & Split Payments
- **Group Trip Planner:** Specify group name, dates, guest count, suites, and total tariff.
- **Automated Bill Split:** Automatically partitions total cost equally or per custom allocation.
- **Live Reconciliation Ledger:** Shows amount paid, balance remaining, and which members have paid.
- **Member Simulated Contributions:** Each guest can pay their individual share directly.

### C. Hotel Operations & Property Management
- **Owner Dashboard & Live KPIs:**
  - *Occupancy Rate (%):* Occupied Nights / Available Nights × 100
  - *Average Daily Rate (ADR):* Room Revenue / Rooms Sold
  - *RevPAR:* Room Revenue / Available Sellable Room Nights
  - *Total Revenue, Today’s Arrivals, Today’s Departures, Cancellation Rate*
  - *Interactive Recharts:* 7-day revenue trajectory and room category yield
- **Room Management & Status Control:** Toggle room readiness (`Available`, `Reserved`, `Occupied`, `Cleaning`, `Clean`, `Maintenance`, `Unavailable`).
- **Housekeeping Turnover Queue:** Tasks auto-generated on checkout; mark ready with 1 click.
- **Staff Express QR Check-In:** Front desk receptionist scans digital QR pass or enters reference (`STY-RAJ-88421`) for instant check-in / check-out.
- **Kitchen & Room Service Module:** Chef menu with dietary tags; track incoming orders through `Preparing`, `Ready`, `Out for Delivery`, and `Delivered`.

### D. Platform Administration
- **Platform-Wide Metrics:** Registered users, active partner properties, gross booking value.
- **Property Governance:** Verified badge status.
- **System Audit Log:** Immutable chronological record of system events.

---

## 3. Pre-Seeded Demonstration Accounts

Switch between live personas instantly from the top navigation role dropdown:

| Role | Name | Email | Password | Pre-seeded Hotel / Access |
| :--- | :--- | :--- | :--- | :--- |
| **Customer** | Tanya Agarwal | `tanyaagr229@gmail.com` | `Password@123` | Active Jaipur Booking (`STY-RAJ-88421`), Group Trip |
| **Customer (Demo)** | Aditya Sen | `customer@stayora.com` | `Password@123` | Active bookings & reviews |
| **Hotel Owner** | Vikramaditya Singh | `owner@stayora.com` | `Password@123` | The Oberoi Rajvilas (ADR, RevPAR, Rooms, AI Pricing) |
| **Hotel Staff** | Rajesh Verma | `staff@stayora.com` | `Password@123` | Front Desk Receptionist (Express QR Scanner & Turnovers) |
| **Platform Admin**| Super Admin | `admin@stayora.com` | `Password@123` | Platform oversight & security audit logs |

---

## 4. How to Run the Project

### Development Server
```bash
# Start unified frontend and backend (Port 3000)
npm run dev
```

### Production Build & Linting
```bash
npm run lint
npm run build
npm start
```

### Automated Backend Tests
```bash
python3 backend/tests/test_stayora.py
```
*(All 12 automated unit and integration tests run and pass 100% OK).*
