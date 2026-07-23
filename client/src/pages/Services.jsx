import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import PageEditModal from '../components/PageEditModal';
import { API_BASE_URL } from '../config';

const Services = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const defaultContent = {
    header: {
      badge: "🧹 Nos Solutions Propres",
      title: "Des services de débarras adaptés à tous vos besoins",
      subtitle: "Que vous soyez un particulier ou un professionnel, Stitch s'occupe de tout. Découvrez le détail de nos prestations et réservez en ligne ou demandez un devis personnalisé."
    },
    servicesSection: {
      servicesList: [
        {
          id: "maison",
          title: "Débarras de Maisons",
          subtitle: "Solution intégrale de la cave au grenier",
          description: "Notre équipe se charge de vider entièrement votre maison. Que ce soit après un déménagement, une vente immobilière ou pour libérer une pièce encombrée, nous trions, chargeons et trions vos affaires de façon écologique.",
          featuresList: "Tri et valorisation des objets, Dons aux associations partenaires, Balayage de fin de chantier, Recyclage écoresponsable",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
          badge: "Populaire"
        },
        {
          id: "appartement",
          title: "Débarras d'Appartements & Caves",
          subtitle: "Intervention en milieu urbain avec contraintes",
          description: "Spécialisés dans le vidage d'appartements en centre-ville, nous maîtrisons les contraintes d'accès (passages étroits, étages élevés sans ascenseur, parkings limités). Nous gérons également le vidage de caves humides et de boxes.",
          featuresList: "Manutention délicate, Respect des parties communes, Évacuation rapide des encombrants, Nettoyage sommaire inclus",
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
          badge: "Urbain"
        },
        {
          id: "bureau",
          title: "Débarras de Bureaux & Commerces",
          subtitle: "Désencombrement B2B et traitement des DEEE",
          description: "Pour les professionnels, nous proposons un service sur-mesure d'enlèvement de mobilier de bureau obsolète, de matériel informatique hors d'usage (DEEE), de destruction d'archives confidentielles avec certificat de broyage.",
          featuresList: "Traitement conforme des DEEE, Certificat de destruction d'archives, Planning flexible hors heures de travail, Facturation détaillée",
          image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
          badge: "Professionnels"
        },
        {
          id: "jardin",
          title: "Débarras de Jardins & Espaces Extérieurs",
          subtitle: "Enlèvement de déchets verts et structures",
          description: "Nettoyage de vos terrains, jardins, terrasses et balcons. Nous enlevons les branches, la tonte, mais aussi les vieux abris de jardin en bois ou métal, les dalles en béton cassées, et le mobilier extérieur usagé.",
          featuresList: "Valorisation des déchets verts en compost, Démantèlement de cabanons et serres, Remise en état esthétique, Matériel de coupe professionnel",
          image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
          badge: "Extérieurs"
        },
        {
          id: "nettoyage",
          title: "Nettoyage Spécialisé & Diogène",
          subtitle: "Nettoyage extrême et désinfection complète",
          description: "Intervention dans les cas de logements insalubres (Syndrome de Diogène, accumulation compulsive, après décès). Nous procédons au débarras complet suivi d'une désinfection par nébulisation et d'un nettoyage approfondi.",
          featuresList: "Protocoles sanitaires stricts, Désinfection virucide/bactéricide, Traitement des odeurs tenaces, Discrétion totale garantie",
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800",
          badge: "Spécialisé"
        }
      ]
    },
    cta: {
      title: "Un projet particulier ou hors norme ?",
      desc: "Notre équipe d'experts répond à toutes vos questions et vous propose une solution sur-mesure sous 2h. N'hésitez pas à nous téléphoner ou à remplir le formulaire de contact."
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
        const res = await fetch(`${API_BASE_URL}/api/pages/services`);
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
      const res = await fetch(`${API_BASE_URL}/api/pages/services`, {
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
  const servicesSection = content.servicesSection || defaultContent.servicesSection;
  const cta = content.cta || defaultContent.cta;

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20 relative">
      <SEOHead 
        title="Nos Services de Débarras Maison, Cave & Bureau | Stitch Débarras"
        description="Découvrez nos prestations de débarras complet : vide-maison, appartement, débarras de cave, bureaux professionnels et nettoyage spécialisé. Tri et recyclage éco-responsables."
        keywords="services débarras, vide maison paris, débarras cave, débarras professionnel b2b, nettoyage diogene, recyclage mobilier"
      />

      <div className="max-w-[1280px] mx-auto px-gutter space-y-24">
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
                __html: header.title.replace(/tous vos besoins/g, '<span class="text-[#00d26a]">tous vos besoins</span>')
              }} />
            ) : (
              <>
                Des services de débarras <br />
                adaptés à <span className="text-[#00d26a]">tous vos besoins</span>
              </>
            )}
          </h1>
          <p className="text-gray-400 text-lg">
            {header.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-[3rem] p-4 transition-all duration-300 space-y-16">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('servicesSection')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5"
            >
              <span>✏️</span> Modifier Services
            </button>
          )}
          {servicesSection.servicesList?.map((service, index) => {
            const features = service.featuresList ? service.featuresList.split(',').map(f => f.trim()) : [];
            return (
              <div 
                key={service.id || index} 
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 hover:border-[#00d26a]/30 transition-all duration-500 glass`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute inset-0 bg-[#00d26a]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-80 lg:h-[400px] object-cover rounded-2xl shadow-2xl relative z-0" 
                  />
                  <span className="absolute top-4 left-4 z-20 bg-[#00d26a] text-white px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase">
                    {service.badge}
                  </span>
                </div>

                {/* Text Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl lg:text-4xl font-black font-h2 tracking-tight">{service.title}</h2>
                    <p className="text-[#00d26a] font-bold text-lg">{service.subtitle}</p>
                  </div>

                  <p className="text-gray-300 leading-relaxed font-body-md text-base">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#00d26a] font-bold">✓</span>
                        <span className="text-gray-300 text-sm font-semibold">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 flex flex-wrap gap-4">
                    <Link 
                      to={`/booking?service=${encodeURIComponent(service.title)}`}
                      className="px-6 py-3 bg-[#00d26a] hover:bg-[#00b058] text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(0,210,106,0.2)]"
                    >
                      Réserver ce service
                    </Link>
                    <Link 
                      to="/quote-request"
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold border border-white/10 transition-all"
                    >
                      Demander un devis
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic CTA */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-[3.5rem] p-4 transition-all duration-300">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('cta')}
              className="absolute top-8 right-8 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5"
            >
              <span>✏️</span> Modifier CTA
            </button>
          )}
          <div className="bg-gradient-to-r from-[#00d26a]/20 to-[#5d3077]/20 border border-white/10 rounded-[3rem] p-12 text-center space-y-6 relative overflow-hidden glass">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00d26a] rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#5d3077] rounded-full blur-[100px] opacity-20"></div>
            
            <h2 className="text-3xl lg:text-5xl font-black font-h2 tracking-tight">{cta.title}</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {cta.desc}
            </p>
            <div className="flex justify-center gap-4 flex-wrap pt-4">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#1e0a2d] hover:bg-[#2e1a3d] text-white rounded-2xl font-black border border-white/10 transition-all"
              >
                Nous Contacter
              </Link>
              <Link 
                to="/quote-request" 
                className="px-8 py-4 bg-[#00d26a] hover:bg-[#00b058] text-white rounded-2xl font-black transition-all shadow-xl shadow-[#00d26a]/20"
              >
                Demander un devis gratuit
              </Link>
            </div>
          </div>
        </div>
      </div>

      <PageEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        pageId={`services.${activeSection}`}
        initialContent={content[activeSection]}
        onSave={handleSave}
      />
    </div>
  );
};

export default Services;
