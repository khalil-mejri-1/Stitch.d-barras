import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Categories from './components/Categories';
import Reviews from './components/Reviews';
import B2B from './components/B2B';
import Auth from './components/Auth';
import PublishProject from './components/PublishProject';
import EditModal from './components/EditModal';
import { API_BASE_URL } from './config';

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

import SEOHead from './components/SEOHead';

const Home = ({ isAdmin, homepageData, onEditClick }) => {
  const heroData = homepageData?.hero || {
    badge: "Service Professionnel de Débarras en France",
    title: "Libérez de l'espace sans effort avec Stitch",
    subtitle: "Maison, appartement, cave ou bureau: nous trions, recyclons et nettoyons après débarras de manière écoresponsable.",
    button1Title: "Vous êtes un Particulier ?",
    button1Sub: "Maison, appartement, cave, bureaux...",
    button2Title: "Vous êtes un Professionnel ?",
    button2Sub: "Usines, Entrepôts, Domaines...",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
  };

  const statsData = homepageData?.stats || {
    items: [
      { number: "15k+", label: "Interventions", sublabel: "Particuliers & Pros" },
      { number: "98%", label: "Taux de Recyclage", sublabel: "Objectif Zéro Déchet" },
      { number: "4.9/5", label: "Note Moyenne", sublabel: "Avis Clients Vérifiés" }
    ]
  };

  const howItWorksData = homepageData?.howItWorks || {
    title: "Comment ça fonctionne ?",
    subtitle: "Un service simple, transparent et professionnel en 3 étapes clés.",
    steps: [
      { number: "01", title: "Demande en ligne", description: "Décrivez vos besoins, estimez votre volume et recevez une estimation instantanée de votre tarif.", icon: "📝" },
      { number: "02", title: "Visite & Tri", description: "Nos experts se déplacent, effectuent un tri rigoureux pour favoriser le réemploi et le recyclage.", icon: "🔍" },
      { number: "03", title: "Libération & Nettoyage", description: "Nous débarrassons tout rapidement et laissons les espaces parfaitement propres derrière nous.", icon: "✨" }
    ]
  };

  const categoriesData = homepageData?.categories || {
    title: "Nos Domaines d'Intervention",
    subtitle: "Des solutions adaptées pour chaque type de débarras, que vous soyez particulier ou professionnel.",
    items: [
      { title: "Débarras de Maison", description: "Tri complet, valorisation des objets, don aux associations et recyclage écoresponsable.", icon: "🏠", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600" },
      { title: "Débarras d'Appartement", description: "Intervention rapide en étage, gestion des accès difficiles et respect de la copropriété.", icon: "🏢", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=600" },
      { title: "Débarras de Cave & Garage", description: "Extraction rapide des encombrants, tri écologique et balayage soigné après intervention.", icon: "📦", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600" }
    ]
  };

  const reviewsData = homepageData?.reviews || {
    title: "Ce que disent nos clients",
    subtitle: "Découvrez les avis de ceux qui nous ont fait confiance pour leur débarras.",
    items: [
      { name: "Sophie L.", role: "Particulier - Débarras Maison", content: "Une équipe incroyable ! Rapides, polis, et d'une efficacité redoutable. Ils ont trié tous les objets et donné une grande partie à des associations. Je recommande à 100% !", rating: 5, avatar: "👩" },
      { name: "Jean-Marc P.", role: "Professionnel - Vente Entrepôt", content: "Excellent service professionnel. Devis clair et respecté. Intervention propre et dans les temps. La dimension écoresponsable est un vrai plus.", rating: 5, avatar: "👨" }
    ]
  };

  const b2bData = homepageData?.b2b || {
    title: "Solutions B2B & Grands Espaces",
    subtitle: "Partenaire de confiance pour les entreprises, syndics, études notariales et collectivités.",
    description: "Nous proposons des solutions sur-mesure pour vider vos bureaux, commerces, entrepôts ou locaux industriels avec une traçabilité totale des déchets et dons.",
    points: [
      { title: "Devis Rapide & Visite Gratuite", description: "Une estimation précise sous 24h et une visite technique sans aucun engagement." },
      { title: "Normes & Responsabilité RSE", description: "Bilan carbone optimisé, valorisation maximale et certificats de destruction fournis." }
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  };

  return (
    <>
      <SEOHead 
        title="Stitch Débarras - Services de Débarras Écoresponsables en France"
        description="Solution N°1 pour le débarras gratuit et payant de maison, appartement, cave et entreprise. Tri écologique, réemploi et intervention rapide 7j/7."
      />
      <div className="reveal-hidden">
        <Hero data={heroData} isAdmin={isAdmin} onEdit={() => onEditClick('hero')} />
      </div>
      <div className="reveal-hidden">
        <Stats data={statsData} isAdmin={isAdmin} onEdit={() => onEditClick('stats')} />
      </div>
      <div className="reveal-hidden">
        <HowItWorks data={howItWorksData} isAdmin={isAdmin} onEdit={() => onEditClick('howItWorks')} />
      </div>
      <div className="reveal-hidden">
        <Categories data={categoriesData} isAdmin={isAdmin} onEdit={() => onEditClick('categories')} />
      </div>
      <div className="reveal-hidden">
        <Reviews data={reviewsData} isAdmin={isAdmin} onEdit={() => onEditClick('reviews')} />
      </div>
      <div className="reveal-hidden">
        <B2B data={b2bData} isAdmin={isAdmin} onEdit={() => onEditClick('b2b')} />
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
};

const AdminRoute = ({ children }) => {
  const userObj = localStorage.getItem('user');
  let user = null;
  if (userObj) {
    try {
      user = JSON.parse(userObj);
    } catch (e) {
      console.error(e);
    }
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [homepageData, setHomepageData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // Check admin role
  useEffect(() => {
    const checkRole = () => {
      try {
        const userObj = localStorage.getItem('user');
        if (userObj) {
          const user = JSON.parse(userObj);
          setIsAdmin(user.role === 'admin');
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkRole();
    window.addEventListener('storage', checkRole);
    return () => window.removeEventListener('storage', checkRole);
  }, [location.pathname]);

  // Fetch Homepage Data
  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/homepage`);
        if (res.ok) {
          const data = await res.json();
          setHomepageData(data);
        }
      } catch (error) {
        console.error("Error fetching homepage content:", error);
      }
    };
    fetchHomepage();
  }, []);

  const handleEditClick = (section) => {
    setActiveSection(section);
    setIsEditModalOpen(true);
  };

  const handleSaveHomepage = async (updatedData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/homepage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        const data = await res.json();
        setHomepageData(data);
      }
    } catch (error) {
      console.error("Error saving homepage content:", error);
    }
  };

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
  }, [location.pathname, homepageData]); // Re-observe when route changes or content loads

  return (
    <div className="flex flex-col min-h-screen bg-[#1e0a2d]">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home isAdmin={isAdmin} homepageData={homepageData} onEditClick={handleEditClick} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quote-request" element={<PublishProject />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/pro-space" element={<ProSpace />} />
        </Routes>
      </main>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        sectionName={activeSection}
        initialData={homepageData}
        onSave={handleSaveHomepage}
      />
    </div>
  );
}

export default App;
