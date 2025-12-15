import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ServicesManager from './pages/admin/ServicesManager';
import JobsManager from './pages/admin/JobsManager';
import ApplicationsManager from './pages/admin/ApplicationsManager';
import ContentManager from './pages/admin/ContentManager';
import MessagesManager from './pages/admin/MessagesManager';

import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Layout wrapper for public pages to include Navbar/Footer
const PublicLayout = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Admin Routes (No Public Navbar/Footer) */}
            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><ServicesManager /></ProtectedRoute>} />
            <Route path="/admin/jobs" element={<ProtectedRoute><JobsManager /></ProtectedRoute>} />
            <Route path="/admin/applications" element={<ProtectedRoute><ApplicationsManager /></ProtectedRoute>} />
            <Route path="/admin/messages" element={<ProtectedRoute><MessagesManager /></ProtectedRoute>} />
            <Route path="/admin/content" element={<ProtectedRoute><ContentManager /></ProtectedRoute>} />

            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
            <Route path="/work" element={<PublicLayout><Work /></PublicLayout>} />
            <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;