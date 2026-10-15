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
