import React from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const servicesList = [
    {
      title: "Débarras de Maisons & Villas",
      description: "Vidage complet ou partiel de maisons de la cave au grenier. Idéal pour les successions, ventes immobilières ou déménagements. Tri rigoureux des dons et recyclage.",
      stats: "Service clé en main sous 24-48h",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      popular: true
    },
    {
      title: "Débarras d'Appartements & Caves",
      description: "Intervention rapide en milieu urbain avec contraintes d'accès (ascenseurs, passages étroits). Nous évacuons meubles, électroménager encombrant et cartons.",
      stats: "Idéal pour copropriétés et syndics",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
      popular: false
    },
    {
      title: "Débarras de Bureaux & Locaux",
      description: "Service B2B de désencombrement de locaux professionnels, entrepôts, archives et commerces. Traitement certifié des déchets DEEE et recyclage sécurisé.",
      stats: "Destruction sécurisée de documents incluse",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      popular: true
    }
  ];

  return (
    <section className="py-32 relative bg-gradient-to-b from-[#F3F6F9] to-white overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#5d3077]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#00d26a]/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-[1280px] mx-auto px-gutter">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5d3077]/10 text-[#5d3077] rounded-full text-sm font-black uppercase tracking-widest">
            🛡️ Solutions Professionnelles
          </div>
          <h2 className="text-3xl lg:text-5xl font-black font-h2 text-[#1e0a2d] tracking-tight">
            Nos prestations <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5d3077] to-[#00d26a]">populaires</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Découvrez nos principaux types d'interventions de débarras en France. Nous nous adaptons à toutes les situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {servicesList.map((work, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-[2.5rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(93,48,119,0.1)] transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden rounded-[2rem] rounded-bl-none">
                <div className="absolute inset-0 bg-[#1e0a2d]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {work.popular && (
                  <div className="absolute top-4 right-4 z-20 bg-[#00d26a] text-white px-3 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
                    🔥 Recommandé
                  </div>
                )}
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-black font-h2 text-[#1e0a2d] mb-4 group-hover:text-[#5d3077] transition-colors">
                  {work.title}
                </h3>
                <p className="text-gray-500 font-body-md text-sm leading-relaxed flex-grow">
                  {work.description}
                </p>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-gray-50 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-[#00d26a]/20 flex items-center justify-center text-[#00d26a]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-xs font-bold text-[#1e0a2d] uppercase tracking-wider">
                    {work.stats}
                  </p>
                </div>

                <button 
                  onClick={() => navigate('/services')}
                  className="relative overflow-hidden w-full bg-gray-100 hover:bg-[#5d3077] text-[#1e0a2d] hover:text-white py-4 rounded-2xl font-black transition-all duration-300 group/btn shadow-sm hover:shadow-xl hover:shadow-[#5d3077]/30 flex justify-center items-center gap-2"
                >
                  <span className="relative z-10">En savoir plus</span>
                  <svg className="w-5 h-5 relative z-10 transform translate-x-[-10px] opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
