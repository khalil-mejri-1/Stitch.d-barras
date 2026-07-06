import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Categories from './components/Categories';
import Reviews from './components/Reviews';
import B2B from './components/B2B';
import Auth from './components/Auth';
import PublishProject from './components/PublishProject';

// Import New Pages
import Services from './pages/Services';
import Booking from './pages/Booking';
import Prices from './pages/Prices';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import ProSpace from './pages/ProSpace';

const Home = () => (
  <>
    <div className="reveal-hidden">
      <Hero />
    </div>
    <div className="reveal-hidden">
      <Stats />
    </div>
    <div className="reveal-hidden">
      <HowItWorks />
    </div>
    <div className="reveal-hidden">
      <Categories />
    </div>
    <div className="reveal-hidden">
      <Reviews />
    </div>
    <div className="reveal-hidden">
      <B2B />
    </div>
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-white/5 reveal-hidden">
      <div className="max-w-[1280px] mx-auto px-gutter text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(0,210,106,0.1)] relative overflow-hidden">
            <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 20 C45 5, 55 5, 70 20 C85 35, 75 50, 50 50 C25 50, 15 65, 30 80 C45 95, 55 95, 70 80" stroke="url(#footer-stitch-grad)" strokeWidth="12" strokeLinecap="round" fill="none" />
              <defs>
                <linearGradient id="footer-stitch-grad" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00d26a" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Stitch<span className="text-[#00d26a]">.</span>débarras</span>
        </div>
        <p>© 2026 Stitch Débarras - Tous droits réservés. Solution d'économie circulaire et recyclage.</p>
      </div>
    </footer>
  </>
);

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      }, observerOptions);

      const hiddenElements = document.querySelectorAll('.reveal-hidden');
      hiddenElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Re-observe when route changes

  return (
    <div className="flex flex-col min-h-screen bg-[#1e0a2d]">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quote-request" element={<PublishProject />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/pro-space" element={<ProSpace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
