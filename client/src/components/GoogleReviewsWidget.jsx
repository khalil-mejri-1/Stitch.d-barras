import React, { useEffect, useRef } from 'react';

const GoogleReviewsWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset container content
    container.innerHTML = '';

    // Create and append the Trustindex loader script
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?a5b2413832e2637bf7768946d9b';
    script.defer = true;
    script.async = true;

    container.appendChild(script);

    // If Trustindex class is already in memory, trigger widget init
    if (window.Trustindex && typeof window.Trustindex.loadWidgetsFromDom === 'function') {
      try {
        window.Trustindex.loadWidgetsFromDom();
      } catch (err) {
        console.warn('Trustindex init warning:', err);
      }
    }
  }, []);

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 mt-8 mb-12">
      {/* Official Google Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg p-2.5 flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-wide">
                BEL'DEBARRAS EXPRESS
              </h3>
              <span className="bg-[#00d26a]/20 text-[#00d26a] text-xs font-black px-3 py-1 rounded-full border border-[#00d26a]/40 flex items-center gap-1 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Avis Google Vérifiés
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-yellow-400 text-lg tracking-wider">
                ★★★★★
              </div>
              <span className="text-white font-black text-lg">5.0</span>
              <span className="text-gray-300 text-sm font-medium">• 75 avis clients authentiques</span>
            </div>
          </div>
        </div>

        <a 
          href="https://maps.google.com/?q=BEL'DEBARRAS+EXPRESS" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-[#00d26a] hover:text-[#1e0a2d] text-white font-bold rounded-2xl border border-white/20 transition-all duration-300 text-sm group shadow-md"
        >
          <span>Voir sur Google Maps</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Trustindex Live Google Reviews Container */}
      <div 
        ref={containerRef} 
        id="trustindex-reviews-widget" 
        className="w-full min-h-[160px] bg-white rounded-3xl p-4 md:p-6 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-center py-12 text-gray-400 animate-pulse text-sm gap-2">
          <svg className="w-5 h-5 animate-spin text-[#00d26a]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Synchronisation des avis Google Maps en direct...</span>
        </div>
      </div>
    </div>
  );
};

export default GoogleReviewsWidget;
