import React, { useState } from 'react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const articles = [
    {
      title: "Comment bien trier ses meubles avant un débarras ?",
      category: "Astuces",
      date: "28 Mai 2026",
      desc: "Découvrez notre guide pratique pour identifier rapidement ce qui peut être vendu, donné ou recyclé avant le passage de l'équipe de débarras.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Le guide complet du recyclage des DEEE en France",
      category: "Recyclage",
      date: "14 Mai 2026",
      desc: "Ordinateurs, frigos, télévisions: où vont vos anciens appareils électriques ? Zoom sur la filière de revalorisation de ces déchets complexes.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Success Story : Débarras d'un entrepôt de 800m² à Lyon",
      category: "Succès",
      date: "02 Mai 2026",
      desc: "Retour sur un chantier d'envergure. Comment notre équipe a évacué et recyclé 45 tonnes de matériel industriel en seulement 3 jours.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Nettoyage Diogène : comprendre pour mieux intervenir",
      category: "Conseils",
      date: "20 Avril 2026",
      desc: "Le syndrome de Diogène nécessite une prise en charge humaine et technique spécifique. Nous vous expliquons notre approche bienveillante.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Stitch ouvre une nouvelle agence à Bordeaux !",
      category: "Actualités",
      date: "10 Avril 2026",
      desc: "Afin de répondre à la demande grandissante en Gironde, Stitch ouvre son premier bureau bordelais. Découvrez nos offres locales.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Don d'objets : nos associations partenaires témoignent",
      category: "Recyclage",
      date: "29 Mars 2026",
      desc: "Grâce à vos débarras, nous avons pu faire don de plus de 1 200 meubles en bon état au Secours Populaire cette année. Merci !",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const categories = ["Tous", "Recyclage", "Astuces", "Conseils", "Succès", "Actualités"];

  const filteredArticles = selectedCategory === 'Tous' 
    ? articles 
    : articles.filter(art => art.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20">
      <div className="max-w-[1280px] mx-auto px-gutter space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00d26a] text-sm font-bold uppercase tracking-wider">
            📚 Le Mag de l'Espace
          </div>
          <h1 className="text-4xl lg:text-6xl font-black font-h1 tracking-tight leading-tight">
            Conseils, Recyclage & <span className="text-[#00d26a]">Actualités</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Retrouvez tous nos guides pratiques pour trier vos encombrants, comprendre les circuits de recyclage et suivre la vie de Stitch.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-3 border-b border-white/10 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${selectedCategory === cat ? 'bg-[#00d26a] text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art, idx) => (
            <article 
              key={idx} 
              className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden glass hover:border-[#00d26a]/30 transition-all duration-300 flex flex-col h-full group"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={art.image} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#1e0a2d]/80 backdrop-blur-sm text-[#00d26a] px-3 py-1 rounded-full text-xs font-black uppercase">
                  {art.category}
                </span>
              </div>
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs text-gray-400 font-bold">{art.date}</span>
                  <h3 className="text-xl font-bold font-h2 leading-snug group-hover:text-[#00d26a] transition-colors">{art.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{art.desc}</p>
                </div>
                <button className="text-sm font-black text-[#00d26a] flex items-center gap-1 hover:underline pt-4 mt-auto">
                  Lire la suite <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;
