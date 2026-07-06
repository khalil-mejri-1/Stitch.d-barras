import React from 'react';

const About = () => {
  const team = [
    {
      name: "Thomas Laroche",
      role: "Fondateur & Directeur Général",
      bio: "Passionné par l'économie circulaire et le recyclage, Thomas a créé Stitch en 2021 pour dépoussiérer le secteur du débarras avec une approche moderne et écologique.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Sabrina Benali",
      role: "Responsable des Partenariats Associatifs",
      bio: "Sabrina coordonne la redistribution des objets valorisables aux associations caritatives françaises. Elle veille à ce que rien ne soit jeté inutilement.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Marc Dubreuil",
      role: "Chef d'Équipe Logistique Paris",
      bio: "Marc gère les interventions sur le terrain. Expert en manutention complexe, il garantit la sécurité des biens et le respect des délais des chantiers.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const values = [
    {
      title: "Recyclage à 90%",
      desc: "Nous trions minutieusement chaque encombrant pour le diriger vers les filières de revalorisation adaptées (bois, métaux, DEEE, gravats).",
      icon: "♻️"
    },
    {
      title: "Engagement Solidaire",
      desc: "Les vêtements, livres, vaisselles et meubles en bon état sont donnés à nos associations partenaires (Emmaüs, Secours Populaire).",
      icon: "🤝"
    },
    {
      title: "Transparence Totale",
      desc: "Pas de frais surprises. Nos devis sont fermes et calculés au plus juste, avec une assurance responsabilité civile incluse.",
      icon: "📋"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20">
      <div className="max-w-[1280px] mx-auto px-gutter space-y-24">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d26a]/15 text-[#00d26a] text-sm font-bold uppercase tracking-wider">
              🌱 Notre Histoire
            </div>
            <h1 className="text-4xl lg:text-6xl font-black font-h1 tracking-tight">
              Pour un débarras <br />
              <span className="text-[#00d26a]">éco-responsable</span>
            </h1>
            <p className="text-gray-300 leading-relaxed font-body-md text-base">
              Fondée en 2021, Stitch est née d'un constat simple : le secteur du débarras traditionnel manquait de transparence et de conscience écologique. Trop d'objets encore utilisables finissaient enfouis ou incinérés.
            </p>
            <p className="text-gray-300 leading-relaxed font-body-md text-base">
              Nous avons repensé le métier en plaçant le tri sélectif, le don aux associations et la valorisation des matières au cœur de notre processus d'intervention. Notre mission est de vous libérer de l'espace tout en faisant du bien à la planète.
            </p>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00d26a] to-[#5d3077] rounded-[2.5rem] blur-2xl opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800" 
              alt="Tri sélectif recyclage" 
              className="rounded-[2rem] shadow-2xl w-full h-[400px] object-cover relative z-10 border border-white/10"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl lg:text-4xl font-black font-h2">Nos engagements fondamentaux</h2>
            <p className="text-gray-400">Ce qui nous distingue des entreprises de débarras classiques.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 text-center glass space-y-4 hover:border-[#00d26a]/30 transition-all duration-300">
                <div className="text-5xl">{val.icon}</div>
                <h3 className="text-xl font-bold font-h2">{val.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl lg:text-4xl font-black font-h2">L'équipe Stitch</h2>
            <p className="text-gray-400">Des professionnels du débarras et de la valorisation à votre écoute.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((person, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden glass hover:border-[#00d26a]/30 transition-all duration-300 flex flex-col h-full">
                <img 
                  src={person.image} 
                  alt={person.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 space-y-3 flex-grow flex flex-col">
                  <div>
                    <h3 className="text-xl font-bold text-white font-h2">{person.name}</h3>
                    <p className="text-[#00d26a] text-xs font-bold uppercase tracking-wider">{person.role}</p>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnerships Section */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 glass text-center space-y-8">
          <h3 className="text-2xl lg:text-3xl font-black font-h2">Nos Partenaires Solidaires</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Nous travaillons main dans la main avec des réseaux de recyclage agréés (Eco-systèmes, Veolia) et des associations caritatives locales pour maximiser la réutilisation des objets.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-xl font-black italic tracking-wide text-white">EMMAÜS FRANCE</span>
            <span className="text-xl font-black italic tracking-wide text-white">SECOURS POPULAIRE</span>
            <span className="text-xl font-black italic tracking-wide text-white">ECO-MOBILIER</span>
            <span className="text-xl font-black italic tracking-wide text-white">VALDELIA</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
