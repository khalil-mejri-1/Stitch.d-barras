import React from 'react';

const B2B = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-gutter relative z-10">

        {/* Main Super Friendly Container */}
        <div className="relative bg-[#1e0a2d] rounded-[3rem] p-10 lg:p-20 overflow-hidden shadow-[0_30px_60px_rgba(30,10,45,0.2)]">

          {/* Playful Background Blobs inside the container */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00d26a] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#5d3077] rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>

          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">

            {/* Left Content Area */}
            <div className="flex-1 space-y-10">
              {/* <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#00d26a]/10 border border-[#00d26a]/20 text-[#00d26a] rounded-full text-sm font-black tracking-widest uppercase">
                <span className="text-lg">🤝</span> Pour les pros
              </div> */}

              <h2 className="text-3xl lg:text-7xl font-black font-h2 text-white leading-[1.1] tracking-tight">
                Développez <br /> votre activité <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#00d26a]">avec le sourire.</span>
                  <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#00d26a] opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                  </svg>
                </span>
              </h2>

              <p className="text-gray-300 text-xl font-body-md max-w-lg leading-relaxed">
                Fini le démarchage ! Rejoignez le réseau d'artisans le plus sympa de France. On vous apporte les chantiers, vous apportez votre talent. 🛠️
              </p>

              <div className="flex flex-wrap gap-5 pt-4">
                <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg border border-white/10 backdrop-blur-md transition-all duration-300">
                  Comment ça marche ?
                </button>
              </div>
            </div>

            {/* Right Grid Area - Playful and Bouncy */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Card 1: 100% */}
                <div className="lg:mt-12 p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] transform hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group cursor-default">
                  <div className="text-[#00d26a] font-black text-3xl lg:text-5xl mb-3 group-hover:scale-110 origin-left transition-transform">100%</div>
                  <div className="text-gray-300 font-medium">Chantiers qualifiés</div>
                  <div className="mt-6 relative w-16 h-16 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#00d26a] opacity-20 blur-xl rounded-full animate-pulse"></div>
                    <div className="relative w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-[#00d26a]/10 rounded-full -mr-4 -mt-4 blur-md"></div>
                      <svg className="w-8 h-8 text-[#00d26a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card 2: Simple */}
                <div className="p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] transform hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group cursor-default">
                  <div className="text-[#00d26a] font-black text-2xl lg:text-4xl mb-3 group-hover:scale-110 origin-left transition-transform">Simple</div>
                  <div className="text-gray-300 font-medium">Gestion de profil</div>
                  <div className="mt-6 relative w-16 h-16 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#00d26a] opacity-20 blur-xl rounded-full animate-pulse"></div>
                    <div className="relative w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-8 h-8 bg-[#00d26a]/10 rounded-full -ml-4 -mb-4 blur-md"></div>
                      <svg className="w-8 h-8 text-[#00d26a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card 3: Sans */}
                <div className="lg:mt-12 p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] transform hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group cursor-default">
                  <div className="text-[#00d26a] font-black text-2xl lg:text-4xl mb-3 group-hover:scale-110 origin-left transition-transform">Sans</div>
                  <div className="text-gray-300 font-medium">Abonnement forcé</div>
                  <div className="mt-6 relative w-16 h-16 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#00d26a] opacity-20 blur-xl rounded-full animate-pulse"></div>
                    <div className="relative w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                      <div className="absolute top-0 left-0 w-10 h-10 bg-[#00d26a]/5 rounded-full -ml-5 -mt-5 blur-md"></div>
                      <svg className="w-8 h-8 text-[#00d26a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card 4: Rejoindre */}
                <div className="p-8 bg-gradient-to-br from-[#00d26a] to-emerald-500 rounded-[2rem] transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,210,106,0.4)] transition-all duration-300 flex flex-col justify-between group cursor-pointer">
                  <div>
                    <div className="text-[#1e0a2d] font-black text-2xl lg:text-4xl mb-1">Rejoindre</div>
                    <div className="text-[#1e0a2d]/80 font-bold">le réseau</div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <div className="w-12 h-12 bg-[#1e0a2d] rounded-full flex items-center justify-center transform group-hover:translate-x-2 transition-transform">
                      <svg className="w-6 h-6 text-[#00d26a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
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
