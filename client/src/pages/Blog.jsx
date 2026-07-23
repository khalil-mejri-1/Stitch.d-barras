import React, { useState, useEffect } from 'react';
import PageEditModal from '../components/PageEditModal';
import { API_BASE_URL } from '../config';

const Blog = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const defaultContent = {
    header: {
      badge: "📚 Le Mag de l'Espace",
      title: "Conseils, Recyclage & Actualités",
      subtitle: "Retrouvez tous nos guides pratiques pour trier vos encombrants, comprendre les circuits de recyclage et suivre la vie de Stitch."
    },
    articlesSection: {
      articlesList: [
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
      ]
    }
  };

  useEffect(() => {
    try {
      const userObj = localStorage.getItem('user');
      if (userObj) {
        const user = JSON.parse(userObj);
        setIsAdmin(user.role === 'admin');
      }
    } catch (e) {
      console.error(e);
    }

    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/pages/blog`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.content && Object.keys(data.content).length > 0) {
            setPageData(data.content);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchContent();
  }, []);

  const handleEditClick = (section) => {
    setActiveSection(section);
    setIsEditOpen(true);
  };

  const handleSave = async (updatedSectionContent) => {
    const currentFullContent = pageData || defaultContent;
    const updatedFullContent = {
      ...currentFullContent,
      [activeSection]: updatedSectionContent
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/pages/blog`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: updatedFullContent })
      });
      if (res.ok) {
        const data = await res.json();
        setPageData(data.content);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const content = pageData || defaultContent;
  const header = content.header || defaultContent.header;
  const articlesSection = content.articlesSection || defaultContent.articlesSection;

  const categories = ["Tous", "Recyclage", "Astuces", "Conseils", "Succès", "Actualités"];

  const filteredArticles = selectedCategory === 'Tous' 
    ? (articlesSection.articlesList || []) 
    : (articlesSection.articlesList || []).filter(art => art.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20 relative">
      <div className="max-w-[1280px] mx-auto px-gutter space-y-16">
        
        {/* Header */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-3xl p-6 transition-all duration-300 text-center space-y-6 max-w-3xl mx-auto">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('header')}
              className="absolute top-2 right-2 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5"
            >
              <span>✏️</span> Modifier En-tête
            </button>
          )}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00d26a] text-sm font-bold uppercase tracking-wider">
            {header.badge}
          </div>
          <h1 className="text-4xl lg:text-6xl font-black font-h1 tracking-tight leading-tight">
            {header.title ? (
              <span dangerouslySetInnerHTML={{
                __html: header.title.replace(/Actualités/g, '<span class="text-[#00d26a]">Actualités</span>')
              }} />
            ) : (
              <>
                Conseils, Recyclage & <span className="text-[#00d26a]">Actualités</span>
              </>
            )}
          </h1>
          <p className="text-gray-400 text-lg">
            {header.subtitle}
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
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-[3rem] p-6 transition-all duration-300">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('articlesSection')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5"
            >
              <span>✏️</span> Modifier Articles
            </button>
          )}
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

      <PageEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        pageId={`blog.${activeSection}`}
        initialContent={content[activeSection]}
        onSave={handleSave}
      />
    </div>
  );
};

export default Blog;
