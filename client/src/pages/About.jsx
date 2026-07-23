import React, { useState, useEffect } from 'react';
import PageEditModal from '../components/PageEditModal';
import { API_BASE_URL } from '../config';

const About = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const defaultContent = {
    story: {
      badge: "🌱 Notre Histoire",
      title: "Pour un débarras éco-responsable",
      desc1: "Fondée en 2021, Stitch est née d'un constat simple : le secteur du débarras traditionnel manquait de transparence et de conscience écologique. Trop d'objets encore utilisables finissaient enfouis ou incinérés.",
      desc2: "Nous avons repensé le métier en plaçant le tri sélectif, le don aux associations et la valorisation des matières au cœur de notre processus d'intervention. Notre mission est de vous libérer de l'espace tout en faisant du bien à la planète.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800"
    },
    valuesSection: {
      title: "Nos engagements fondamentaux",
      subtitle: "Ce qui nous distingue des entreprises de débarras classiques.",
      valuesList: [
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
      ]
    },
    partners: {
      title: "Nos Partenaires Solidaires",
      desc: "Nous travaillons main dans la main avec des réseaux de recyclage agréés (Eco-systèmes, Veolia) et des associations caritatives locales pour maximiser la réutilisation des objets."
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
        const res = await fetch(`${API_BASE_URL}/api/pages/about`);
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
      const res = await fetch(`${API_BASE_URL}/api/pages/about`, {
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
  const story = content.story || defaultContent.story;
  const valuesSection = content.valuesSection || defaultContent.valuesSection;
  const partners = content.partners || defaultContent.partners;

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20 relative">
      <div className="max-w-[1280px] mx-auto px-gutter space-y-24">
        
        {/* Story Section */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-[3rem] p-6 transition-all duration-300">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('story')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5"
            >
              <span>✏️</span> Modifier Story
            </button>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d26a]/15 text-[#00d26a] text-sm font-bold uppercase tracking-wider">
                {story.badge}
              </div>
              <h1 className="text-4xl lg:text-6xl font-black font-h1 tracking-tight">
                {story.title ? (
                  <span dangerouslySetInnerHTML={{
                    __html: story.title.replace(/éco-responsable/g, '<span class="text-[#00d26a]">éco-responsable</span>')
                  }} />
                ) : (
                  <>
                    Pour un débarras <span className="text-[#00d26a]">éco-responsable</span>
                  </>
                )}
              </h1>
              <p className="text-gray-300 leading-relaxed font-body-md text-base">
                {story.desc1}
              </p>
              <p className="text-gray-300 leading-relaxed font-body-md text-base">
                {story.desc2}
              </p>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00d26a] to-[#5d3077] rounded-[2.5rem] blur-2xl opacity-20"></div>
              <img 
                src={story.image} 
                alt="Tri sélectif recyclage" 
                className="rounded-[2rem] shadow-2xl w-full h-[400px] object-cover relative z-10 border border-white/10"
              />
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-[3rem] p-6 transition-all duration-300 space-y-12">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('valuesSection')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5"
            >
              <span>✏️</span> Modifier Engagements
            </button>
          )}
          <div className="text-center space-y-2">
            <h2 className="text-3xl lg:text-4xl font-black font-h2">{valuesSection.title}</h2>
            <p className="text-gray-400">{valuesSection.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuesSection.valuesList?.map((val, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 text-center glass space-y-4 hover:border-[#00d26a]/30 transition-all duration-300">
                <div className="text-5xl">{val.icon}</div>
                <h3 className="text-xl font-bold font-h2">{val.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnerships Section */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-[3.5rem] p-4 transition-all duration-300">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('partners')}
              className="absolute top-8 right-8 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5"
            >
              <span>✏️</span> Modifier Partenaires
            </button>
          )}
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 glass text-center space-y-8">
            <h3 className="text-2xl lg:text-3xl font-black font-h2">{partners.title}</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {partners.desc}
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

      <PageEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        pageId={`about.${activeSection}`}
        initialContent={content[activeSection]}
        onSave={handleSave}
      />
    </div>
  );
};

export default About;
