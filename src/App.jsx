import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './admin/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin        from './admin/AdminLogin';
import AdminDashboard    from './admin/AdminDashboard';
import AdminProjects     from './admin/AdminProjects';
import AdminPortfolio    from './admin/AdminPortfolio';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminLeads        from './admin/AdminLeads';
import AdminServices     from './admin/AdminServices';
import AdminWhyUs        from './admin/AdminWhyUs';
import AdminSettings     from './admin/AdminSettings';

// Guards
import ProtectedRoute from './components/ProtectedRoute';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about"     element={<About />} />
          <Route path="projects"  element={<Projects />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="services"  element={<Services />} />
          <Route path="contact"   element={<Contact />} />
        </Route>

        {/* ── Admin Login ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── Protected Admin Routes ── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard"    element={<AdminDashboard />} />
          <Route path="projects"     element={<AdminProjects />} />
          <Route path="portfolio"    element={<AdminPortfolio />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="leads"        element={<AdminLeads />} />
          <Route path="services"     element={<AdminServices />} />
          <Route path="why-us"       element={<AdminWhyUs />} />
          <Route path="settings"     element={<AdminSettings />} />

          {/* Legacy redirect: /admin/messages → /admin/leads */}
          <Route path="messages" element={<Navigate to="/admin/leads" replace />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}
