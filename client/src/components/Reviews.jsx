import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleReviewsWidget from './GoogleReviewsWidget';

const Reviews = ({ data, isAdmin, onEdit }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[700px] flex flex-col py-24 overflow-hidden">
      {/* Admin Edit Button */}
      {isAdmin && (
        <div className="absolute top-4 right-6 z-50">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-xl shadow-[0_0_15px_rgba(0,210,106,0.4)] transition-all flex items-center gap-2 text-sm group"
          >
            <span>✏️</span> Modifier Section Avis
          </button>
        </div>
      )}

      {/* Friendly Background with Soft Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2000"
          alt="Artisans souriants"
          className="w-full h-full object-cover grayscale-[30%] opacity-90 scale-105 transform hover:scale-110 transition-transform duration-[10s]"
        />
        {/* Playful gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e0a2d] via-[#1e0a2d]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a2d] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full">

        <div className="max-w-[1400px] mx-auto px-gutter mb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* Main Title Area */}
            <div className="max-w-xl text-center lg:text-left flex-1">
              <h2 className="text-3xl lg:text-7xl font-black font-h1 text-white leading-[1.1] mb-6">
                {data?.title ? (
                  <span dangerouslySetInnerHTML={{
                    __html: data.title.replace(/convaincre/g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00d26a] to-emerald-300">convaincre</span>')
                  }} />
                ) : (
                  <>
                    Laissez-vous <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d26a] to-emerald-300">convaincre.</span>
                  </>
                )}
              </h2>
              <p className="text-gray-300 text-xl font-body-md leading-relaxed">
                {data?.subtitle || "Des centaines de milliers de projets réussis. Derrière chaque avis, il y a un sourire et une maison transformée !"}
                <svg className="w-6 h-6 inline-block ml-2 text-[#00d26a]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </p>
            </div>

            {/* Extracted CTA Card */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20 text-center flex flex-col items-center justify-center space-y-6 shadow-[0_0_50px_rgba(0,210,106,0.15)] hover:bg-white/15 hover:shadow-[0_0_60px_rgba(0,210,106,0.25)] transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">À vous de jouer !</h3>
                  <p className="text-gray-300 font-medium text-lg">Rejoignez nos milliers de clients satisfaits et réalisez vos projets.</p>
                </div>
                <button 
                  onClick={() => navigate('/quote-request')}
                  className="relative z-10 bg-white text-[#1e0a2d] hover:bg-[#00d26a] hover:text-white px-10 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl w-full mt-4 flex items-center justify-center gap-3 group/btn"
                >
                  Publier un projet
                  <svg className="w-6 h-6 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Live Google Maps Reviews (Trustindex Widget) */}
        <GoogleReviewsWidget />

      </div>
    </section>
  );
};

export default Reviews;
