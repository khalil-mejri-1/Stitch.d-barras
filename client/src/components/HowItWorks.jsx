import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      title: "Décrivez votre projet",
      desc: "Quelques clics suffisent ! Répondez à nos questions pour nous dire exactement ce dont vous avez besoin.",
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: "Recevez des devis",
      desc: "On s'occupe de tout ! Les meilleurs artisans de votre ville vous contactent avec leurs meilleures offres.",
      color: "bg-[#00d26a]",
      lightColor: "bg-green-50",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Choisissez le meilleur",
      desc: "Comparez sereinement les profils et les avis, puis engagez l'artisan qui vous inspire confiance.",
      color: "bg-[#5d3077]",
      lightColor: "bg-purple-50",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Playful Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 opacity-50"></div>

      <div className="max-w-[1280px] mx-auto px-gutter relative z-10">
        <div className="text-center mb-24 space-y-6">
          <div className="inline-block px-4 py-1.5 bg-[#00d26a]/10 text-[#00d26a] rounded-full text-sm font-black uppercase tracking-widest animate-pulse">
            Simple & Gratuit
          </div>
          <h2 className="text-3xl lg:text-6xl font-black font-h2 text-[#1e0a2d] tracking-tight">
            Votre projet en <span className="text-[#00d26a]">3 étapes</span> faciles
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            On a simplifié tout le processus pour que vous puissiez vous concentrer sur ce qui compte vraiment : <span className="text-[#1e0a2d] font-bold">votre maison.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 relative">
          {/* Curvy Connecting Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/3 left-[25%] right-[25%] h-12 z-0">
            <svg className="w-full h-full text-gray-200" viewBox="0 0 400 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8">
              <path d="M0 25 C 100 0, 300 50, 400 25" />
            </svg>
          </div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="flex flex-col items-center text-center space-y-8">
                {/* Creative Icon Container */}
                <div className="relative">
                  <div className={`absolute inset-0 ${step.color} opacity-20 blur-2xl rounded-full scale-150 group-hover:scale-[2] transition-transform duration-500`}></div>
                  <div className={`relative w-28 h-28 ${step.lightColor} rounded-[2rem] rotate-6 group-hover:rotate-12 transition-all duration-500 flex items-center justify-center shadow-inner border-2 border-white`}>
                    <div className={`${step.color} text-white w-20 h-20 rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:-rotate-12 transition-all duration-500 shadow-xl`}>
                      {step.icon}
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#1e0a2d] text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg border-4 border-white">
                      {idx + 1}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 max-w-sm">
                  <h3 className="text-xl lg:text-2xl font-black font-h2 text-[#1e0a2d] group-hover:text-[#00d26a] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                {/* Fun Badge for the first step */}
                {/* {idx === 0 && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-400 text-[#1e0a2d] px-3 py-1 rounded-lg text-xs font-black shadow-lg animate-bounce uppercase">
                    C'est parti ! 
                    <svg className="w-5 h-5 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 p-2 pl-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-gray-600 font-bold">Prêt à transformer votre habitat ?</span>
            <button className="bg-[#00d26a] text-white px-6 py-3 rounded-xl font-black hover:scale-105 transition-transform shadow-lg">
              Commencer ici
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
