import React from 'react';
import { useNavigate } from 'react-router-dom';

const B2B = ({ data, isAdmin, onEdit }) => {
  const navigate = useNavigate();

  const title = data?.title || "Solutions B2B & Grands Espaces";
  const subtitle = data?.subtitle || "Partenaire de confiance pour les entreprises, syndics et collectivités.";
  const description = data?.description || "Nous proposons des solutions sur-mesure pour vider vos bureaux, commerces, entrepôts ou locaux industriels avec une traçabilité totale des déchets et dons.";
  const points = data?.points || [
    { title: "Devis Rapide & Visite Gratuite", description: "Une estimation précise sous 24h et une visite technique sans aucun engagement." },
    { title: "Normes & Responsabilité RSE", description: "Bilan carbone optimisé, valorisation maximale et certificats de destruction fournis." }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Admin Edit Button */}
      {isAdmin && (
        <div className="absolute top-4 right-6 z-50">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-xl shadow-[0_0_15px_rgba(0,210,106,0.4)] transition-all flex items-center gap-2 text-sm group"
          >
            <span>✏️</span> Modifier Section B2B
          </button>
        </div>
      )}

      <div className="max-w-[1300px] mx-auto px-gutter relative z-10">

        {/* Main Super Friendly Container */}
        <div className="relative bg-[#1e0a2d] rounded-[3rem] p-10 lg:p-20 overflow-hidden shadow-[0_30px_60px_rgba(30,10,45,0.2)]">

          {/* Playful Background Blobs inside the container */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00d26a] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#5d3077] rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>

          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">

            {/* Left Content Area */}
            <div className="flex-1 space-y-10">
              <h2 className="text-3xl lg:text-7xl font-black font-h2 text-white leading-[1.1] tracking-tight">
                {title ? (
                  <span dangerouslySetInnerHTML={{
                    __html: title
                      .replace(/avec le sourire/g, '<span class="text-[#00d26a]">avec le sourire</span>')
                      .replace(/B2B/g, '<span class="text-[#00d26a]">B2B</span>')
                  }} />
                ) : (
                  <>
                    Solutions <span className="text-[#00d26a]">B2B</span> & Grands Espaces
                  </>
                )}
              </h2>

              <p className="text-gray-300 text-xl font-body-md max-w-lg leading-relaxed">
                {description}
              </p>

              <div className="flex flex-wrap gap-5 pt-4">
                <button 
                  onClick={() => navigate('/pro-space')}
                  className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg border border-white/10 backdrop-blur-md transition-all duration-300"
                >
                  Espace Pro
                </button>
              </div>
            </div>

            {/* Right Grid Area - Playful and Bouncy */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Point 1 */}
                {points[0] && (
                  <div className="lg:mt-12 p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] transform hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group cursor-default">
                    <div className="text-[#00d26a] font-black text-xl mb-3 group-hover:scale-105 origin-left transition-transform">{points[0].title}</div>
                    <div className="text-gray-300 text-sm font-medium">{points[0].description}</div>
                    <div className="mt-6 relative w-12 h-12 group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-[#00d26a] opacity-20 blur-xl rounded-full animate-pulse"></div>
                      <div className="relative w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                        <svg className="w-6 h-6 text-[#00d26a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Point 2 */}
                {points[1] && (
                  <div className="p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] transform hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group cursor-default">
                    <div className="text-[#00d26a] font-black text-xl mb-3 group-hover:scale-105 origin-left transition-transform">{points[1].title}</div>
                    <div className="text-gray-300 text-sm font-medium">{points[1].description}</div>
                    <div className="mt-6 relative w-12 h-12 group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-[#00d26a] opacity-20 blur-xl rounded-full animate-pulse"></div>
                      <div className="relative w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                        <svg className="w-6 h-6 text-[#00d26a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subtitle Card */}
                <div className="lg:mt-12 p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] transform hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group cursor-default col-span-1 md:col-span-2">
                  <div className="text-gray-300 text-sm font-medium leading-relaxed italic">
                    {subtitle}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default B2B;
