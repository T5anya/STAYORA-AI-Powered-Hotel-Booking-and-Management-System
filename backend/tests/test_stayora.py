import unittest
import urllib.request
import urllib.parse
import json

BASE_URL = "http://localhost:3000/api"

def api_call(endpoint, method="GET", data=None, token=None):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, method=method)
    req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    body = json.dumps(data).encode("utf-8") if data else None
    try:
        with urllib.request.urlopen(req, data=body, timeout=5) as response:
            return response.status, json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode("utf-8"))

class TestStayora(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        status, res = api_call("/auth/demo-switch", method="POST", data={"role": "customer"})
        cls.cust_token = res["token"]
        cls.cust_user = res["user"]
        
        status, res = api_call("/auth/demo-switch", method="POST", data={"role": "staff"})
        cls.staff_token = res["token"]
        cls.staff_user = res["user"]
        
        status, res = api_call("/auth/demo-switch", method="POST", data={"role": "owner"})
        cls.owner_token = res["token"]
        cls.owner_user = res["user"]
        
        status, res = api_call("/auth/demo-switch", method="POST", data={"role": "admin"})
        cls.admin_token = res["token"]
        cls.admin_user = res["user"]

    # ========================================================
    # CORE HOSPITALITY PLATFORM FEATURES
    # ========================================================

    def test_01_health_check(self):
        status, res = api_call("/health")
        self.assertEqual(status, 200)
        self.assertEqual(res["status"], "healthy")
        self.assertIn("Stayora", res["service"])

    def test_02_hotel_catalog(self):
        status, res = api_call("/hotels")
        self.assertEqual(status, 200)
        self.assertGreaterEqual(len(res["hotels"]), 5)
        self.assertTrue(any(h["destination"] == "Jaipur" for h in res["hotels"]))

    def test_03_hotel_search_and_availability(self):
        status, res = api_call("/hotels?destination=Jaipur&checkIn=2026-11-10&checkOut=2026-11-12")
        self.assertEqual(status, 200)
        self.assertGreaterEqual(len(res["hotels"]), 1)

    def test_04_booking_creation_and_pricing(self):
        import random
        year = random.randint(2030, 2090)
        month = random.randint(1, 12)
        day = random.randint(1, 20)
        cls = self.__class__
        cls.test_checkin = f"{year}-{month:02d}-{day:02d}"
        cls.test_checkout = f"{year}-{month:02d}-{(day + 3):02d}"

        data = {
            "hotelId": "hotel-01",
            "roomId": "room-101",
            "checkInDate": cls.test_checkin,
            "checkOutDate": cls.test_checkout,
            "adults": 2,
            "children": 0,
            "couponCode": "STAYORA20",
            "paymentMethod": "UPI"
        }
        status, res = api_call("/bookings", method="POST", data=data, token=self.cust_token)
        self.assertEqual(status, 201)
        booking = res["booking"]
        self.assertIn("STY-", booking["booking_reference"])
        self.assertEqual(booking["nights"], 3)
        self.assertEqual(booking["booking_status"], "Confirmed")
        self.assertEqual(booking["payment_status"], "Success")

    def test_05_double_booking_prevention(self):
        data = {
            "hotelId": "hotel-01",
            "roomId": "room-101",
            "checkInDate": self.__class__.test_checkin,
            "checkOutDate": self.__class__.test_checkout,
            "adults": 2,
            "children": 0
        }
        status, res = api_call("/bookings", method="POST", data=data, token=self.cust_token)
        self.assertEqual(status, 409)
        self.assertIn("already been reserved", res["error"])

    def test_06_group_booking_split_payments(self):
        status, res = api_call("/group-bookings/grp-01/pay-share", method="POST", data={"memberEmail": "simran@example.com"}, token=self.cust_token)
        self.assertEqual(status, 200)
        self.assertTrue(res["success"])

    def test_07_qr_checkin_verification(self):
        status, res = api_call("/bookings/verify-qr", method="POST", data={"reference": "STY-RAJ-88421"}, token=self.staff_token)
        self.assertEqual(status, 200)
        self.assertTrue(res["verified"])
        self.assertEqual(res["booking"]["customer_name"], "Tanya Agarwal")

    def test_08_food_order_and_kitchen(self):
        items = [{"foodItemId": "food-01", "name": "Royal Rajasthani Thali", "quantity": 2, "unitPrice": 1850}]
        status, res = api_call("/food/orders", method="POST", data={"hotelId": "hotel-01", "roomNumber": "Villa 101", "items": items}, token=self.cust_token)
        self.assertEqual(status, 201)
        self.assertIn("KIT-", res["orderNumber"])

    def test_09_owner_analytics_kpi(self):
        status, res = api_call("/analytics/owner", token=self.owner_token)
        self.assertEqual(status, 200)
        kpi = res["kpi"]
        self.assertGreater(kpi["occupancyRate"], 0)
        self.assertGreater(kpi["adr"], 0)
        self.assertGreater(kpi["revPar"], 0)

    def test_10_ai_recommendations(self):
        data = {"destination": "Jaipur", "budget": 35000, "category": "Luxury Heritage"}
        status, res = api_call("/ai/recommendations", method="POST", data=data)
        self.assertEqual(status, 200)
        self.assertGreater(len(res["recommendations"]), 0)
        top = res["recommendations"][0]
        self.assertGreaterEqual(top["matchScore"], 50)

    def test_11_ai_nl_search_parser(self):
        data = {"query": "Find a palace in Jaipur under 30000 with pool and spa"}
        status, res = api_call("/ai/parse-nl-search", method="POST", data=data)
        self.assertEqual(status, 200)
        filters = res["filters"]
        self.assertEqual(filters["destination"], "Jaipur")
        self.assertEqual(filters["maxPrice"], 30000)

    def test_12_ai_chat_assistant(self):
        data = {"message": "What is your cancellation policy?"}
        status, res = api_call("/ai/chat", method="POST", data=data)
        self.assertEqual(status, 200)
        self.assertIn("cancellation", res["reply"].lower())

    # ========================================================
    # 12 EXPLICIT SECURITY & RBAC ISOLATION TEST CASES
    # ========================================================

    def test_sec_01_customer_portal_access_and_isolation(self):
        """Test 1: Customer can access customer endpoints, but is isolated from owner, staff, and admin portals."""
        # Authorized access to customer bookings
        status, res = api_call("/customer/bookings", token=self.cust_token)
        self.assertEqual(status, 200)
        self.assertIn("bookings", res)

        # Isolated from owner portal
        status, res = api_call("/analytics/owner", token=self.cust_token)
        self.assertEqual(status, 403)

        # Isolated from staff operations
        status, res = api_call("/operations/housekeeping", token=self.cust_token)
        self.assertEqual(status, 403)

        # Isolated from platform admin
        status, res = api_call("/analytics/admin", token=self.cust_token)
        self.assertEqual(status, 403)

    def test_sec_02_owner_portal_access_and_isolation(self):
        """Test 2: Hotel Owner can access owner endpoints, but is forbidden from platform admin endpoints."""
        # Authorized access to owner analytics and hotels
        status, res = api_call("/analytics/owner", token=self.owner_token)
        self.assertEqual(status, 200)
        self.assertIn("kpi", res)

        status, res = api_call("/owner/hotels", token=self.owner_token)
        self.assertEqual(status, 200)
        self.assertIn("hotels", res)

        # Isolated from admin operations
        status, res = api_call("/analytics/admin", token=self.owner_token)
        self.assertEqual(status, 403)
        status, res = api_call("/admin/users", token=self.owner_token)
        self.assertEqual(status, 403)

    def test_sec_03_staff_portal_access_and_isolation(self):
        """Test 3: Hotel Staff can access assigned operations, but is forbidden from owner analytics and admin."""
        # Authorized access to housekeeping and assigned hotel
        status, res = api_call("/operations/housekeeping", token=self.staff_token)
        self.assertEqual(status, 200)
        self.assertIn("tasks", res)

        status, res = api_call("/staff/hotel", token=self.staff_token)
        self.assertEqual(status, 200)
        self.assertIn("hotel", res)

        # Isolated from owner analytics
        status, res = api_call("/analytics/owner", token=self.staff_token)
        self.assertEqual(status, 403)

        # Isolated from admin
        status, res = api_call("/analytics/admin", token=self.staff_token)
        self.assertEqual(status, 403)

    def test_sec_04_admin_portal_access(self):
        """Test 4: Platform Admin has authorized access to admin analytics and system users directory."""
        status, res = api_call("/analytics/admin", token=self.admin_token)
        self.assertEqual(status, 200)
        self.assertIn("totalUsers", res)
        self.assertIn("activeHotels", res)

        status, res = api_call("/admin/users", token=self.admin_token)
        self.assertEqual(status, 200)
        self.assertIn("users", res)

    def test_sec_05_unauthenticated_access_rejected(self):
        """Test 5: Unauthenticated access to protected portal routes is rejected with 401 Unauthorized."""
        status, res = api_call("/analytics/admin")
        self.assertEqual(status, 401)
        self.assertIn("error", res)

        status, res = api_call("/analytics/owner")
        self.assertEqual(status, 401)
        self.assertIn("error", res)

    def test_sec_06_customer_forbidden_from_owner(self):
        """Test 6: Customer role attempting to call owner endpoints is rejected with 403 Forbidden."""
        status, res = api_call("/analytics/owner", token=self.cust_token)
        self.assertEqual(status, 403)
        self.assertIn("Access forbidden", res["error"])

        status, res = api_call("/owner/hotels", token=self.cust_token)
        self.assertEqual(status, 403)
        self.assertIn("Access forbidden", res["error"])

        status, res = api_call("/owner/staff", method="POST", data={"fullName": "Bad Staff", "email": "bad@staff.com", "password": "Pass"}, token=self.cust_token)
        self.assertEqual(status, 403)

    def test_sec_07_customer_forbidden_from_admin_api(self):
        """Test 7: Customer role attempting to call platform administrator APIs is rejected with 403 Forbidden."""
        status, res = api_call("/analytics/admin", token=self.cust_token)
        self.assertEqual(status, 403)

        status, res = api_call("/admin/users", token=self.cust_token)
        self.assertEqual(status, 403)

    def test_sec_08_unauthenticated_api_rejection(self):
        """Test 8: Unauthenticated access to Customer bookings, Staff housekeeping, and invalid tokens are rejected with 401."""
        status, res = api_call("/customer/bookings")
        self.assertEqual(status, 401)

        status, res = api_call("/operations/housekeeping")
        self.assertEqual(status, 401)

        # Invalid token rejection
        status, res = api_call("/customer/bookings", token="invalid.token.payload")
        self.assertEqual(status, 401)

    def test_sec_09_localstorage_role_tampering_ineffective(self):
        """Test 9: Modifying client-side claims or forging signatures fails cryptographic validation (401), and genuine customer tokens cannot elevate roles (403)."""
        # Forged signature token
        header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        # Payload claiming admin role
        payload = "eyJzdWIiOiJ1c2VyLWN1c3QtMDEiLCJlbWFpbCI6InRhbnlhQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiZXhwIjoyMDAwMDAwMDAwfQ"
        fake_sig = "fake_signature_hash_12345"
        forged_token = f"{header}.{payload}.{fake_sig}"

        status, res = api_call("/analytics/admin", token=forged_token)
        self.assertEqual(status, 401)
        self.assertIn("signature", res["error"].lower())

        # Authentic customer token cannot access admin even if client claims role in local state
        status, res = api_call("/analytics/admin", token=self.cust_token)
        self.assertEqual(status, 403)

    def test_sec_10_hotel_owner_cross_hotel_forbidden(self):
        """Test 10: Hotel owner attempting cross-hotel access to an unowned hotel returns 403 Forbidden."""
        # Owner of hotel-01 attempts to query analytics for hotel-02
        status, res = api_call("/analytics/owner?hotelId=hotel-02", token=self.owner_token)
        self.assertEqual(status, 403)
        self.assertIn("ownership clearance", res["error"])

    def test_sec_11_registration_admin_role_rejected(self):
        """Test 11: Public registration requesting 'admin' or 'platform_admin' role is rejected with 403 Forbidden."""
        import random
        rnd = random.randint(1000, 9999)
        reg_data = {
            "fullName": "Malicious Admin",
            "email": f"hacker_{rnd}@stayora.com",
            "password": "Password@123",
            "confirmPassword": "Password@123",
            "role": "platform_admin"
        }
        status, res = api_call("/auth/register", method="POST", data=reg_data)
        self.assertEqual(status, 403)
        self.assertIn("prohibited", res["error"])

        reg_data["role"] = "admin"
        status, res = api_call("/auth/register", method="POST", data=reg_data)
        self.assertEqual(status, 403)
        self.assertIn("prohibited", res["error"])

    def test_sec_12_staff_cross_hotel_access_forbidden(self):
        """Test 12: Hotel staff attempting to access another hotel property's housekeeping tasks returns 403 Forbidden."""
        status, res = api_call("/operations/housekeeping?hotelId=hotel-02", token=self.staff_token)
        self.assertEqual(status, 403)
        self.assertIn("not assigned to this hotel", res["error"])

    def test_sec_13_google_account_login(self):
        """Test 13: Google account authentication registers or logs in verified user with secure JWT."""
        data = {
            "email": "tanyaagr229@gmail.com",
            "fullName": "Tanya Agarwal"
        }
        status, res = api_call("/auth/google", method="POST", data=data)
        self.assertEqual(status, 200)
        self.assertIn("token", res)
        self.assertEqual(res["user"]["email"], "tanyaagr229@gmail.com")
        self.assertEqual(res["redirectUrl"], "/customer/dashboard")

if __name__ == "__main__":
    unittest.main()
