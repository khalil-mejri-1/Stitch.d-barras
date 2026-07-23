import React from 'react';

const HowItWorks = ({ data, isAdmin, onEdit }) => {
  const steps = data?.steps || [
    {
      title: "Décrivez votre projet",
      description: "Quelques clics suffisent ! Répondez à nos questions pour nous dire exactement ce dont vous avez besoin.",
      icon: "📝"
    },
    {
      title: "Recevez des devis",
      description: "On s'occupe de tout ! Les meilleurs artisans de votre ville vous contactent avec leurs meilleures offres.",
      icon: "🔍"
    },
    {
      title: "Choisissez le meilleur",
      description: "Comparez sereinement les profils et les avis, puis engagez l'artisan qui vous inspire confiance.",
      icon: "✨"
    }
  ];

  const colors = [
    { color: "bg-blue-500", lightColor: "bg-blue-50" },
    { color: "bg-[#00d26a]", lightColor: "bg-green-50" },
    { color: "bg-[#5d3077]", lightColor: "bg-purple-50" }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Admin Edit Button */}
      {isAdmin && (
        <div className="absolute top-4 right-6 z-50">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-xl shadow-[0_0_15px_rgba(0,210,106,0.2)] transition-all flex items-center gap-2 text-sm group"
          >
            <span>✏️</span> Modifier Section Étapes
          </button>
        </div>
      )}

      {/* Playful Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 opacity-50"></div>

      <div className="max-w-[1280px] mx-auto px-gutter relative z-10">
        <div className="text-center mb-24 space-y-6">
          <div className="inline-block px-4 py-1.5 bg-[#00d26a]/10 text-[#00d26a] rounded-full text-sm font-black uppercase tracking-widest animate-pulse">
            Simple & Gratuit
          </div>
          <h2 className="text-3xl lg:text-6xl font-black font-h2 text-[#1e0a2d] tracking-tight">
            {data?.title || "Votre projet en 3 étapes faciles"}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            {data?.subtitle || "On a simplifié tout le processus pour que vous puissiez vous concentrer sur ce qui compte vraiment : votre maison."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 relative">
          {/* Curvy Connecting Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/3 left-[25%] right-[25%] h-12 z-0">
            <svg className="w-full h-full text-gray-200" viewBox="0 0 400 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8">
              <path d="M0 25 C 100 0, 300 50, 400 25" />
            </svg>
          </div>

          {steps.map((step, idx) => {
            const style = colors[idx % colors.length];
            return (
              <div key={idx} className="relative group">
                <div className="flex flex-col items-center text-center space-y-8">
                  {/* Creative Icon Container */}
                  <div className="relative">
                    <div className={`absolute inset-0 ${style.color} opacity-20 blur-2xl rounded-full scale-150 group-hover:scale-[2] transition-transform duration-500`}></div>
                    <div className={`relative w-28 h-28 ${style.lightColor} rounded-[2rem] rotate-6 group-hover:rotate-12 transition-all duration-500 flex items-center justify-center shadow-inner border-2 border-white`}>
                      <div className={`${style.color} text-white w-20 h-20 rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:-rotate-12 transition-all duration-500 shadow-xl`}>
                        {typeof step.icon === 'string' ? (
                          <span className="text-3xl">{step.icon}</span>
                        ) : (
                          step.icon
                        )}
                      </div>
                      {/* Step Number Badge */}
                      <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#1e0a2d] text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg border-4 border-white">
                        {step.number || (idx + 1)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 max-w-sm">
                    <h3 className="text-xl lg:text-2xl font-black font-h2 text-[#1e0a2d] group-hover:text-[#00d26a] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed font-medium">
                      {step.description || step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
