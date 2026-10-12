import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ phone }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const location = useLocation();
  const displayPhone = phone || "01 88 99 00 11";

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    {
      title: "Accueil",
      path: "/",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      title: "Services",
      path: "/services",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: "Espace Pro",
      path: "/pro-space",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          <path d="M12 11v6" />
          <path d="M9 14h6" />
        </svg>
      )
    },
    {
      title: "Tarifs",
      path: "/prices",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      title: "Qui sommes-nous",
      path: "/about",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: "Blog",
      path: "/blog",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    {
      title: "Contact",
      path: "/contact",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] backdrop-blur-md bg-[#1e0a2d]/90 border-b border-white/10 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-12 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 relative z-[70] shrink-0">
            <Link to="/" className="flex items-center group cursor-pointer shrink-0">
              <img 
                src="/logo.png" 
                alt="Stitch Débarras" 
                className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]" 
              />
            </Link>
            <div className="flex flex-col text-left justify-center">
              <Link to="/" className="group cursor-pointer">
                <span className="text-lg sm:text-xl md:text-2xl font-black font-h1 tracking-tight text-white group-hover:text-[#00d26a] transition-colors leading-tight block">
                  Stitch<span className="text-[#00d26a]">.</span>débarras
                </span>
              </Link>
              <a 
                href={`tel:${displayPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#00d26a] hover:text-[#34ee8a] transition-colors group/tel mt-0.5"
                title="Appelez-nous directement"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00d26a] group-hover/tel:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="tracking-wider">{displayPhone}</span>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1.5 xl:gap-2.5 2xl:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-button text-xs 2xl:text-sm whitespace-nowrap flex items-center gap-1.5 relative group py-2 px-2.5 2xl:px-3.5 rounded-xl transition-all duration-300 ${
                  location.pathname === link.path 
                    ? 'text-[#00d26a] bg-white/5' 
                    : link.path === '/pro-space'
                    ? 'bg-[#00d26a]/15 text-[#00d26a] border border-[#00d26a]/30 hover:bg-[#00d26a]/25 shadow-[0_0_15px_rgba(0,210,106,0.1)]'
                    : 'text-white hover:bg-white/5'
                }`}
              >
                <span className={`transition-transform duration-300 group-hover:scale-110 ${
                  location.pathname === link.path 
                    ? 'text-[#00d26a]' 
                    : link.path === '/pro-space'
                    ? 'text-[#00d26a]'
                    : 'text-gray-400 group-hover:text-white'
                }`}>
                  {link.icon}
                </span>
                <span className="relative z-10 font-bold">{link.title}</span>
                {link.path !== '/pro-space' && (
                  <span className={`absolute bottom-0 left-2 right-2 h-0.5 bg-[#00d26a] transition-all duration-300 ${location.pathname === link.path ? 'w-[calc(100%-16px)]' : 'w-0 group-hover:w-[calc(100%-16px)]'}`}></span>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA & Account Buttons */}
          <div className="hidden lg:flex items-center gap-4 2xl:gap-6 shrink-0">
            {!isLoggedIn ? (
              <Link
                to="/auth"
                className={`px-4 py-2 rounded-xl text-sm font-bold border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 ${location.pathname === '/auth' ? 'text-[#00d26a] border--[#00d26a]/30' : 'text-white'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                </svg>
                Connexion
              </Link>
            ) : (
              <Link
                to="/profile"
                className={`px-4 py-2 rounded-xl text-sm font-bold border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 ${location.pathname.startsWith('/profile') || location.pathname.startsWith('/admin') ? 'text-[#00d26a] border-[#00d26a]/30' : 'text-white'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Mon Profil
              </Link>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                title="Se déconnecter"
                className="px-4 py-2.5 bg-red-650 hover:bg-red-700 text-white rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>

          {/* Menu Button for Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden relative z-[70] p-2 hover:bg-white/10 rounded-xl transition-all active:scale-90 group"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
              <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
              <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-2.5' : 'w-5'}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Side Menu Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-[#1e0a2d]/60 backdrop-blur-sm transition-opacity duration-500 xl:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Side Menu Content */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] z-[65] bg-[#1e0a2d] xl:hidden transition-transform duration-500 ease-out border-l border-white/10 shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00d26a] rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 -left-20 w-64 h-64 bg-[#5d3077] rounded-full blur-[100px]"></div>
        </div>

        <div className="relative h-full flex flex-col p-8 pt-20 overflow-y-auto no-scrollbar">
          <div className="mb-6 flex flex-col items-center justify-center border-b border-white/10 pb-6 gap-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 group">
              <img 
                src="/logo.png" 
                alt="Stitch Débarras" 
                className="h-14 w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform" 
              />
              <span className="text-xl font-black font-h1 tracking-tight text-white">
                Stitch<span className="text-[#00d26a]">.</span>débarras
              </span>
            </Link>
            <a
              href={`tel:${displayPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#00d26a] hover:underline mt-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span className="tracking-wider">{displayPhone}</span>
            </a>
          </div>
          <div className="space-y-4">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between group p-3 rounded-2xl transition-all duration-300 ${
                  location.pathname === link.path 
                    ? 'bg-white/10 text-[#00d26a]' 
                    : link.path === '/pro-space'
                    ? 'bg-[#00d26a]/5 border border-[#00d26a]/20 text-[#00d26a]'
                    : 'text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    location.pathname === link.path 
                      ? 'bg-[#00d26a] text-white shadow-[0_0_20px_rgba(0,210,106,0.3)]' 
                      : link.path === '/pro-space'
                      ? 'bg-[#00d26a]/25 text-[#00d26a]'
                      : 'bg-white/5 text-gray-400 group-hover:bg-[#00d26a]/20 group-hover:text-[#00d26a]'
                  }`}>
                    {link.icon}
                  </div>
                  <span className="text-lg font-bold tracking-tight">
                    {link.title}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00d26a]/20 transition-all">
                  <svg className="w-4 h-4 text-[#00d26a]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}

            <div className="h-px bg-white/10 my-4"></div>

             {/* Account & Booking for mobile side drawer */}
            {!isLoggedIn ? (
              <Link
                to="/auth"
                className="flex items-center gap-3 p-3 rounded-2xl text-white hover:bg-white/5"
              >
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                  </svg>
                </div>
                <span className="text-lg font-bold">Connexion</span>
              </Link>
            ) : (
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-2xl text-white hover:bg-white/5"
              >
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-lg font-bold">Mon Profil</span>
              </Link>
            )}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                title="Se déconnecter"
                className="w-full mt-4 py-4 bg-red-650 hover:bg-red-700 text-white rounded-2xl transition-all cursor-pointer flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>

          <div className="mt-auto pt-8">
            <div className="flex justify-center gap-6">
              {['FB', 'IG', 'TW'].map((social) => (
                <div key={social} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-gray-400 hover:text-[#00d26a] hover:border-[#00d26a]/30 transition-all cursor-pointer">
                  {social}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;

