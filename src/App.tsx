import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StayoraAIChat } from './components/ai/StayoraAIChat';
import { CompareModal } from './components/hotel/CompareModal';

import { Home } from './pages/Home';
import { ExploreHotels } from './pages/ExploreHotels';
import { HotelDetail } from './pages/HotelDetail';
import { Destinations } from './pages/Destinations';
import { Offers } from './pages/Offers';
import { GroupBookingPage } from './pages/GroupBookingPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { Experiences } from './pages/Experiences';
import { Dining } from './pages/Dining';
import { Aviation } from './pages/Aviation';
import { PrivilegeClub } from './pages/PrivilegeClub';

import { CustomerDashboard } from './pages/CustomerDashboard';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { StaffDashboard } from './pages/StaffDashboard';
import { PlatformAdminDashboard } from './pages/PlatformAdminDashboard';

import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { CursorTrail } from './components/CursorTrail';
import { ScrollToTop } from './components/common/ScrollToTop';

export default function App() {
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <ScrollToTop />
            <CursorTrail />
            <div className="min-h-screen flex flex-col bg-[#FBF9F4] dark:bg-[#0C1310] text-[#1F2421] dark:text-[#E8ECE9] antialiased transition-colors duration-200">
              <Navbar onOpenCompare={() => setCompareOpen(true)} />

              <main className="flex-1 w-full min-w-0">
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<ExploreHotels />} />
                  <Route path="/hotels/:id" element={<HotelDetail />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route path="/experiences" element={<Experiences />} />
                  <Route path="/dining" element={<Dining />} />
                  <Route path="/aviation" element={<Aviation />} />
                  <Route path="/privilege" element={<PrivilegeClub />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/group-booking" element={<GroupBookingPage />} />
                  <Route
                    path="/favorites"
                    element={
                      <ProtectedRoute>
                        <FavoritesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Role-Specific Protected Portals */}
                  <Route
                    path="/customer/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['customer']}>
                        <CustomerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['customer']}>
                        <CustomerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/owner/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['owner', 'hotel_owner']}>
                        <OwnerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/staff/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['staff', 'hotel_staff']}>
                        <StaffDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['admin', 'platform_admin']}>
                        <PlatformAdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

                  {/* Fallback to Home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
              <StayoraAIChat />
              <CompareModal isOpen={compareOpen} onClose={() => setCompareOpen(false)} />
            </div>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
