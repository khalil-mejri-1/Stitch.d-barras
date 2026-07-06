import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-mesh relative text-white pt-40 pb-24 z-20">
      {/* Abstract background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d26a]/10 rounded-full blur-[120px] -mr-64 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5d3077]/25 rounded-full blur-[100px] -ml-32 -mb-32"></div>
      </div>

      <div className="max-w-[1280px] mx-auto px-gutter relative z-30 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10 animate-reveal relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00d26a] text-sm font-bold tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d26a] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d26a]"></span>
              </span>
              Service Professionnel de Débarras en France
            </div>
            <h1 className="text-3xl lg:text-6xl font-h1 font-black leading-[1.1] tracking-tight">
              Libérez de l'espace <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">sans effort</span> <br />
              avec <span className="text-[#00d26a]">Stitch</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Maison, appartement, cave ou bureau: nous trions, recyclons et nettoyons après débarras de manière écoresponsable.
            </p>
          </div>
          <div className="space-y-6 max-w-lg">
            <h2 className="text-xl font-h2 font-bold flex items-center gap-3">
              Quel type de débarras recherchez-vous ?
              <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
            </h2>

            {/* Particulier Button */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00d26a] to-[#5d3077] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <button 
                onClick={() => navigate('/booking?service=')}
                className="relative w-full inline-flex items-center justify-between gap-3 px-6 py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#00d26a]/50 font-black text-base transition-all duration-300 shadow-2xl group/partic"
              >
                <div className="flex items-center gap-4 text-left">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <span className="text-lg font-bold block text-white group-hover/partic:text-[#00d26a] transition-colors">
                      Vous êtes un Particulier ?
                    </span>
                    <span className="text-xs text-gray-400 font-normal">
                      Maison, appartement, cave, bureaux...
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/partic:bg-[#00d26a] group-hover/partic:text-white transition-all duration-300">
                  <svg className="w-5 h-5 transform group-hover/partic:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Professionnel Button */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00d26a] to-[#5d3077] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <button 
                onClick={() => navigate('/pro-space')}
                className="relative w-full inline-flex items-center justify-between gap-3 px-6 py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#00d26a]/50 font-black text-base transition-all duration-300 shadow-2xl group/pro"
              >
                <div className="flex items-center gap-4 text-left">
                  <span className="text-2xl">🏭</span>
                  <div>
                    <span className="text-lg font-bold block text-white group-hover/pro:text-[#00d26a] transition-colors">
                      Vous êtes un Professionnel ?
                    </span>
                    <span className="text-xs text-gray-400 font-normal">
                      Usines, Entrepôts, Domaines...
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/pro:bg-[#00d26a] group-hover/pro:text-white transition-all duration-300">
                  <svg className="w-5 h-5 transform group-hover/pro:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-6 pt-4 border-t border-white/5 w-fit">
            <div className="flex flex-col">
              <span className="text-3xl font-bold font-h2">Écoresponsable</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-6 h-6 bg-[#00d26a] flex items-center justify-center rounded-sm">
                      <span className="text-white text-xs">★</span>
                    </div>
                  ))}
                </div>
                <span className="font-bold opacity-60">Tri Sélectif & Recyclage</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative flex justify-center lg:justify-end animate-reveal [animation-delay:200ms]">
          <div className="relative max-w-md lg:max-w-none animate-float">
            {/* Decorative elements around image */}
            <div className="absolute lg:-top-10 lg:-right-10 -top-4 -right-4 w-24 h-24 lg:w-32 lg:h-32 border-t-4 border-r-4 border-[#00d26a] rounded-tr-3xl"></div>
            <div className="absolute lg:-bottom-10 lg:-left-10 -bottom-4 -left-4 w-24 h-24 lg:w-32 lg:h-32 border-b-4 border-l-4 border-[#5d3077] rounded-bl-3xl"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" 
              alt="Débarras moderne" 
              className="rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] w-full max-h-[480px] object-cover relative z-10 border border-white/10"
            />
            
            {/* Green bounding box overlay enhanced */}
            <div className="absolute top-12 left-12 right-12 bottom-12 border-2 border-[#00d26a]/50 rounded-lg pointer-events-none z-20">
              <div className="absolute top-0 left-0 -translate-y-full bg-[#00d26a] text-white px-4 py-2 text-sm font-black rounded-t-lg shadow-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Service Certifié ★ 5/5
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#00d26a]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#00d26a]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
