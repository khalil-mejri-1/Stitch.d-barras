import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import PageEditModal from '../components/PageEditModal';
import { API_BASE_URL } from '../config';

const Diogene = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const defaultContent = {
    header: {
      badge: "🛡️ Intervention Spécialisée & Nettoyage Extrême",
      title: "Débarras après syndrome de Diogène",
      subtitle: "Évacuation d'encombrants, tri sélectif, désinfection virucide et remise en état complète de logements insalubres à Paris et en Île-de-France."
    },
    definition: {
      title: "Qu’est-ce que le syndrome de Diogène ?",
      text1: "Le syndrome de Diogène est un trouble du comportement qui pousse une personne à accumuler de manière compulsive des objets, déchets, emballages, journaux ou encore des aliments périmés. Cette accumulation entraîne rapidement une situation de logement insalubre, rendant la vie quotidienne difficile et dangereuse.",
      text2: "À Paris et partout en Île-de-France, ce type de situation est malheureusement fréquent, nécessitant une intervention spécialisée en débarras et nettoyage extrême."
    },
    reasons: {
      title: "Pourquoi faire appel à Stitch Débarras ?",
      intro: "Chez Stitch Débarras, nous sommes experts dans le débarras de logements encombrés par le syndrome de Diogène. Nos équipes interviennent avec professionnalisme, discrétion et efficacité pour :",
      points: [
        {
          icon: "📦",
          title: "Vider totalement le logement",
          desc: "Meubles vétustes, objets hétéroclites, détritus, électroménagers hors d'usage."
        },
        {
          icon: "♻️",
          title: "Trier et évacuer les déchets",
          desc: "Acheminement vers des filières agréées (déchetterie professionnelle, recyclage certifié, éco-organismes)."
        },
        {
          icon: "🧼",
          title: "Nettoyer et désinfecter les lieux",
          desc: "Désinfection virucide et bactéricide pour retrouver un espace parfaitement sain, hygiénique et habitable."
        },
        {
          icon: "🌸",
          title: "Désodoriser le logement",
          desc: "Traitement à l'ozone et nébulisation pour éliminer durablement les mauvaises odeurs persistantes."
        },
        {
          icon: "🏠",
          title: "Remettre en état",
          desc: "Préparation intégrale de l'appartement ou de la maison pour une nouvelle occupation sereine ou une mise en location."
        }
      ]
    },
    coverage: {
      title: "Une intervention rapide à Paris et en Île-de-France",
      intro: "Notre équipe est disponible pour intervenir dans les délais les plus courts, que ce soit :",
      locations: [
        {
          icon: "🏙️",
          title: "Appartements à Paris intra-muros",
          desc: "Tous les arrondissements (75). Gestion des accès complexes, étages élevés sans ascenseur, cours intérieures et respect strict de la copropriété."
        },
        {
          icon: "🏡",
          title: "Maisons individuelles en banlieue",
          desc: "Pavillons, villas, dépendances, garages, granges et jardins envahis par l'accumulation d'objets."
        },
        {
          icon: "📍",
          title: "Tout logement en Île-de-France",
          desc: "Départements 77 (Seine-et-Marne), 78 (Yvelines), 91 (Essonne), 92 (Hauts-de-Seine), 93 (Seine-Saint-Denis), 94 (Val-de-Marne) et 95 (Val-d’Oise)."
        }
      ],
      note: "Chaque situation est unique. Nous réalisons un devis gratuit et personnalisé après visite des lieux pour évaluer la quantité d’objets à évacuer et le niveau d’insalubrité."
    },
    stepsSection: {
      title: "Débarras et nettoyage après syndrome de Diogène : étapes de notre intervention",
      subtitle: "Un protocole sanitaire rigoureux en 5 étapes pour une remise en état sans faille.",
      steps: [
        {
          num: "01",
          title: "Diagnostic et devis gratuit",
          desc: "Visite sur place en toute confidentialité pour comprendre l’ampleur du désencombrement et évaluer précisément le cubage."
        },
        {
          num: "02",
          title: "Mise en sécurité",
          desc: "Utilisation d'équipements de protection individuelle (combinaisons étanches, masques respiratoires FFP3, gants renforcés) pour garantir une intervention sans risque."
        },
        {
          num: "03",
          title: "Évacuation complète",
          desc: "Enlèvement méthodique et évacuation de tous les objets, meubles dégradés et déchets accumulés vers les centres de tri."
        },
        {
          num: "04",
          title: "Nettoyage approfondi",
          desc: "Décapage et désinfection complète des sols, murs, plafonds, sanitaires et surfaces par nébulisation biocide."
        },
        {
          num: "05",
          title: "Remise en état",
          desc: "Logement assaini, dépollué, désodorisé et prêt à être réhabité ou remis en location en toute sécurité."
        }
      ]
    },
    teamSection: {
      title: "Une équipe spécialisée, discrète et bienveillante",
      desc: "Nous savons que le syndrome de Diogène peut être une situation douloureuse et délicate pour les proches. C’est pourquoi nous intervenons avec respect, discrétion et bienveillance, sans aucun jugement, afin d’aider les familles à retrouver un logement sain."
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
        const res = await fetch(`${API_BASE_URL}/api/pages/diogene`);
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
      const res = await fetch(`${API_BASE_URL}/api/pages/diogene`, {
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
  const definition = content.definition || defaultContent.definition;
  const reasons = content.reasons || defaultContent.reasons;
  const coverage = content.coverage || defaultContent.coverage;
  const stepsSection = content.stepsSection || defaultContent.stepsSection;
  const teamSection = content.teamSection || defaultContent.teamSection;

  return (
    <div className="pt-28 pb-20 bg-[#1e0a2d] text-white min-h-screen">
      <SEOHead
        title="Débarras après Syndrome de Diogène | Nettoyage Extrême Paris & IDF - Stitch"
        description="Entreprise spécialisée dans le débarras et nettoyage de logements insalubres après syndrome de Diogène à Paris et Île-de-France. Devis gratuit, désinfection totale et discrétion garantie."
        canonicalUrl="https://stitch-debarras.com/debarras-syndrome-diogene"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium">
          <Link to="/" className="hover:text-[#00d26a] transition-colors flex items-center gap-1.5">
            <span>🏠</span> Accueil
          </Link>
          <span className="text-gray-600">/</span>
          <Link to="/services" className="hover:text-[#00d26a] transition-colors">
            Débarras Particuliers
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-[#00d26a] font-bold truncate">Débarras après syndrome de Diogène</span>
        </nav>

        {/* Page Header */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-3xl p-6 transition-all">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('header')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>✏️</span> Modifier En-tête
            </button>
          )}

          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#00d26a]/15 text-[#00d26a] border border-[#00d26a]/30 shadow-[0_0_15px_rgba(0,210,106,0.15)]">
              {header.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-h1 tracking-tight leading-tight">
              {header.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {header.subtitle}
            </p>
          </div>
        </div>

        {/* Main Featured Photo & Quick Badges */}
        <div className="space-y-6">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 group">
            <img 
              src="/diogene.png" 
              alt="Débarras et désencombrement logement insalubre syndrome de Diogène" 
              className="w-full max-h-[520px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a2d] via-transparent to-black/30 pointer-events-none"></div>
            
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-red-500/80 text-white backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                Cas Réel d'Accumulation Compulsive
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-[#1e0a2d]/80 text-[#00d26a] border border-[#00d26a]/40 backdrop-blur-md shadow-lg">
                Paris & Île-de-France 7j/7
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e0a2d]/85 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">Chantier sécurisé & Protocoles sanitaires certifiés</p>
                  <p className="text-[11px] text-gray-400">Évacuation complète des déchets et désinfection virucide par nébulisation</p>
                </div>
              </div>
              <Link
                to="/booking?service=Nettoyage%20Sp%C3%A9cialis%C3%A9%20%26%20Diog%C3%A8ne"
                className="px-5 py-2.5 bg-[#00d26a] hover:bg-[#00b058] text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-[#00d26a]/20 text-center whitespace-nowrap active:scale-95 cursor-pointer"
              >
                Demander un diagnostic urgent
              </Link>
            </div>
          </div>
        </div>

        {/* Section 1: Qu’est-ce que le syndrome de Diogène ? */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border-white/5 space-y-6">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('definition')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>✏️</span> Modifier Définition
            </button>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center text-xl shrink-0">
                ❓
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-h2 text-white">
                {definition.title}
              </h2>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg">
              <p>
                Le <strong className="text-white">syndrome de Diogène</strong> est un trouble du comportement qui pousse une personne à <strong className="text-[#00d26a]">accumuler de manière compulsive des objets, déchets, emballages, journaux</strong> ou encore des <strong className="text-white">aliments périmés</strong>. Cette accumulation entraîne rapidement une situation de <strong className="text-red-400">logement insalubre</strong>, rendant la vie quotidienne difficile et dangereuse.
              </p>
              <p>
                À Paris et partout en Île-de-France, ce type de situation est malheureusement fréquent, nécessitant une <strong className="text-white">intervention spécialisée en débarras et nettoyage extrême</strong>.
              </p>
            </div>

            {/* Warning Callout Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <p className="text-sm font-bold text-red-400 flex items-center gap-2">
                  <span>⚠️</span> Risques Sanitaires
                </p>
                <p className="text-xs text-gray-400">
                  Prolifération bactérienne, moisissures, parasites et odeurs persistantes menaçant la santé des occupants et du voisinage.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <p className="text-sm font-bold text-yellow-400 flex items-center gap-2">
                  <span>🔥</span> Danger d'Incendie
                </p>
                <p className="text-xs text-gray-400">
                  L'entassement massif de cartons, papiers et tissus bloque les accès et multiplie les risques de départ de feu accidentel.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <p className="text-sm font-bold text-blue-400 flex items-center gap-2">
                  <span>🚪</span> Perte de Mobilité
                </p>
                <p className="text-xs text-gray-400">
                  Impossibilité d'accéder aux sanitaires, à la cuisine ou au lit, créant un isolement physique et psychologique critique.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Pourquoi faire appel à Stitch Débarras ? */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border-white/5 space-y-8">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('reasons')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>✏️</span> Modifier Points Forts
            </button>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#00d26a]/20 border border-[#00d26a]/40 text-[#00d26a] flex items-center justify-center text-xl shrink-0">
                ✨
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-h2 text-white">
                {reasons.title}
              </h2>
            </div>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {reasons.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.points?.map((point, idx) => (
              <div 
                key={idx}
                className="bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-[#00d26a]/40 rounded-2xl p-6 transition-all duration-300 space-y-3 group/item shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d26a]/20 to-[#00d26a]/5 border border-[#00d26a]/30 flex items-center justify-center text-2xl group-hover/item:scale-110 transition-transform">
                  {point.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover/item:text-[#00d26a] transition-colors">
                  {point.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Une intervention rapide à Paris et en Île-de-France */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white/[0.03] to-[#00d26a]/5 border-white/10 space-y-8">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('coverage')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>✏️</span> Modifier Zone d'Intervention
            </button>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 flex items-center justify-center text-xl shrink-0">
                🚀
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-h2 text-white">
                {coverage.title}
              </h2>
            </div>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {coverage.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coverage.locations?.map((loc, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 relative overflow-hidden"
              >
                <div className="text-3xl">{loc.icon}</div>
                <h3 className="text-lg font-bold text-[#00d26a]">{loc.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{loc.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#00d26a]/10 border border-[#00d26a]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <p className="text-sm text-gray-200 font-medium leading-relaxed">
                {coverage.note}
              </p>
            </div>
            <Link
              to="/booking?service=Nettoyage%20Sp%C3%A9cialis%C3%A9%20%26%20Diog%C3%A8ne"
              className="px-6 py-3 bg-[#00d26a] hover:bg-[#00b058] text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#00d26a]/20 shrink-0 whitespace-nowrap cursor-pointer"
            >
              Visite technique & Devis gratuit
            </Link>
          </div>
        </div>

        {/* Section 4: Étapes de notre intervention */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border-white/5 space-y-10">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('stepsSection')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>✏️</span> Modifier Étapes
            </button>
          )}

          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-h2 text-white">
              {stepsSection.title}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {stepsSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {stepsSection.steps?.map((st, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 hover:border-[#00d26a]/40 rounded-2xl p-5 space-y-3 transition-all relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00d26a]/15 text-[#00d26a] border border-[#00d26a]/30 flex items-center justify-center font-black text-sm">
                    {st.num}
                  </div>
                  <h3 className="font-bold text-base text-white">
                    {st.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Une équipe spécialisée et discrète */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-purple-900/30 via-[#1e0a2d] to-[#00d26a]/10 border-white/10 space-y-6">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('teamSection')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>✏️</span> Modifier Section Équipe
            </button>
          )}

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤝</span>
              <h2 className="text-2xl sm:text-3xl font-black font-h2 text-white">
                {teamSection.title}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              {teamSection.desc}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#00d26a] bg-[#00d26a]/10 border border-[#00d26a]/20 px-3.5 py-1.5 rounded-full font-bold">
                <span>✓</span> Véhicules d'intervention neutres & discrets
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#00d26a] bg-[#00d26a]/10 border border-[#00d26a]/20 px-3.5 py-1.5 rounded-full font-bold">
                <span>✓</span> Secret professionnel & respect strict de la vie privée
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#00d26a] bg-[#00d26a]/10 border border-[#00d26a]/20 px-3.5 py-1.5 rounded-full font-bold">
                <span>✓</span> Restitution immédiate des souvenirs & documents trouvés
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Bar */}
        <div className="bg-gradient-to-r from-[#00d26a]/20 via-[#00d26a]/10 to-purple-900/30 border border-[#00d26a]/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black font-h2 text-white">
              Besoin d'une intervention urgente pour un logement insalubre ?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Nos conseillers sont disponibles 7j/7 pour vous apporter une écoute bienveillante, évaluer votre situation et programmer une visite technique sous 24h.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/booking?service=Nettoyage%20Sp%C3%A9cialis%C3%A9%20%26%20Diog%C3%A8ne"
              className="px-8 py-4 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-2xl transition-all shadow-xl shadow-[#00d26a]/25 text-sm sm:text-base hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Demander un devis gratuit en ligne
            </Link>
            <a
              href="tel:0188990011"
              className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-black rounded-2xl transition-all text-sm sm:text-base flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-5 h-5 text-[#00d26a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              01 88 99 00 11 (Appel direct 7j/7)
            </a>
          </div>
        </div>

      </div>

      {/* Admin Edit Modal */}
      {isAdmin && (
        <PageEditModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          pageId="diogene"
          initialContent={content[activeSection]}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Diogene;
