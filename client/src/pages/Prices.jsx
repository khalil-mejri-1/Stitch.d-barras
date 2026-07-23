import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageEditModal from '../components/PageEditModal';
import { API_BASE_URL } from '../config';

const Prices = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [volume, setVolume] = useState(15);

  const defaultContent = {
    header: {
      badge: "🏷️ Tarifs Clairs et Transparents",
      title: "Combien coûte un débarras ?",
      subtitle: "Pas de frais cachés. Nos tarifs sont calculés au mètre cube (m³) réel ou via des forfaits simplifiés selon la taille de votre logement."
    },
    pricingTable: {
      title: "Forfaits de débarras par logement",
      subtitle: "Nos formules standards basées sur la surface habitable (inclut déplacement, tri et recyclage).",
      packages: [
        {
          title: "Formule Studio / Cave",
          size: "Moins de 25 m²",
          volume: "Jusqu'à 8 m³",
          price: "390 €",
          featuresList: "1 à 2 intervenants, Déplacement inclus, Tri sélectif & Recyclage, Nettoyage balayé rapide, Donations associations"
        },
        {
          title: "Formule Appartement T2 / T3",
          size: "De 25 à 65 m²",
          volume: "Jusqu'à 20 m³",
          price: "850 €",
          featuresList: "2 à 3 intervenants, 1 camionnette de 20m³, Gestion des objets lourds, Nettoyage balayé complet, Donations associations, Garantie protection parties communes",
          popular: true
        },
        {
          title: "Formule Maison / Pavillon",
          size: "Plus de 70 m²",
          volume: "Jusqu'à 45 m³",
          price: "1 790 €",
          featuresList: "3 à 4 intervenants, 2 camions ou rotations, Vidage grenier & garage, Nettoyage balayé complet, Dons & Recyclage de métaux, Assurance sinistre incluse"
        }
      ]
    },
    compareTable: {
      title: "Comparatif des niveaux de service",
      subtitle: "Comparez nos formules d'intervention pour trouver celle qui correspond à votre projet."
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
        const res = await fetch(`${API_BASE_URL}/api/pages/prices`);
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
      const res = await fetch(`${API_BASE_URL}/api/pages/prices`, {
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

  const getEstimatedCost = () => {
    let rate = 45;
    if (volume < 10) rate = 55;
    else if (volume > 30) rate = 38;
    return volume * rate;
  };

  const formulaExplanation = () => {
    if (volume < 10) return "55€/m³ (Petits volumes, frais fixes d'acheminement inclus)";
    if (volume > 30) return "38€/m³ (Tarif dégressif grand volume avantageux)";
    return "45€/m³ (Tarif standard moyen volume)";
  };

  const content = pageData || defaultContent;
  const header = content.header || defaultContent.header;
  const pricingTable = content.pricingTable || defaultContent.pricingTable;
  const compareTable = content.compareTable || defaultContent.compareTable;

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20 relative">
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
                __html: header.title.replace(/débarras \?/g, '<span class="text-[#00d26a]">débarras ?</span>')
              }} />
            ) : (
              <>
                Combien coûte un <span className="text-[#00d26a]">débarras ?</span>
              </>
            )}
          </h1>
          <p className="text-gray-400 text-lg">
            {header.subtitle}
          </p>
        </div>

        {/* Interactive Calculator Slider */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 glass max-w-4xl mx-auto space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d26a] rounded-full blur-[100px] opacity-10"></div>
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl lg:text-3xl font-black font-h2">Simulateur de Tarif au Volume</h3>
            <p className="text-gray-400 text-sm">Faites glisser le curseur pour estimer le coût selon le volume d'encombrants.</p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-400">Volume estimé</span>
              <span className="text-3xl font-black text-[#00d26a] bg-[#00d26a]/10 px-4 py-2 rounded-2xl">{volume} m³</span>
            </div>
            <input 
              type="range"
              min="2"
              max="80"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full accent-[#00d26a]"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>2 m³ (Quelques meubles)</span>
              <span>20 m³ (Appartement T2)</span>
              <span>50 m³ (Pavillon complet)</span>
              <span>80 m³ (Très grande maison)</span>
            </div>
          </div>

          <div className="bg-[#1e0a2d]/50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 border border-white/5">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estimation du coût</p>
              <p className="text-4xl font-black text-[#00d26a]">{getEstimatedCost()} € <span className="text-xs text-gray-400 font-normal">TTC</span></p>
              <p className="text-xs text-purple-300 font-semibold">{formulaExplanation()}</p>
            </div>
            <Link 
              to={`/booking?service=Débarras&volume=${volume}`}
              className="w-full md:w-auto px-8 py-4 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-xl text-center shadow-xl shadow-[#00d26a]/20 transition-all"
            >
              Réserver cette estimation
            </Link>
          </div>
        </div>

        {/* Pricing Tables */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-[3rem] p-6 transition-all duration-300 space-y-8">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('pricingTable')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5"
            >
              <span>✏️</span> Modifier Forfaits
            </button>
          )}
          <div className="text-center space-y-2">
            <h2 className="text-3xl lg:text-4xl font-black font-h2">{pricingTable.title}</h2>
            <p className="text-gray-400">{pricingTable.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTable.packages?.map((pack, idx) => {
              const features = pack.featuresList ? pack.featuresList.split(',').map(f => f.trim()) : [];
              return (
                <div 
                  key={idx}
                  className={`bg-white/5 border rounded-[2.5rem] p-8 flex flex-col h-full glass transition-all ${pack.popular ? 'border-[#00d26a] relative' : 'border-white/10'}`}
                >
                  {pack.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00d26a] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wide">
                      Le plus choisi
                    </span>
                  )}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-2xl font-black font-h2">{pack.title}</h3>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{pack.size}</span>
                      <span>{pack.volume}</span>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                      <span className="text-4xl font-black text-white">{pack.price}</span>
                      <span className="text-xs text-gray-400 font-semibold ml-1">TTC</span>
                    </div>
                  </div>

                  <ul className="space-y-3 flex-grow mb-8 text-sm">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <span className="text-[#00d26a] font-bold">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    to={`/booking?service=${encodeURIComponent(pack.title)}`}
                    className={`w-full py-4 text-center rounded-2xl font-black transition-all ${pack.popular ? 'bg-[#00d26a] hover:bg-[#00b058] text-white shadow-lg shadow-[#00d26a]/20' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                  >
                    Choisir ce forfait
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Matrix Comparison */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-[3rem] p-6 transition-all duration-300 space-y-8">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('compareTable')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5"
            >
              <span>✏️</span> Modifier Comparatif
            </button>
          )}
          <div className="text-center space-y-2">
            <h2 className="text-3xl lg:text-4xl font-black font-h2">{compareTable.title}</h2>
            <p className="text-gray-400">{compareTable.subtitle}</p>
          </div>

          <div className="overflow-x-auto no-scrollbar rounded-3xl border border-white/10 bg-white/5 glass">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#1e0a2d]">
                  <th className="p-6 font-bold text-gray-400 uppercase">Prestations / Services</th>
                  <th className="p-6 font-bold text-[#00d26a] uppercase text-center">Débarras Simple</th>
                  <th className="p-6 font-bold text-purple-300 uppercase text-center">Débarras & Ménage</th>
                  <th className="p-6 font-bold text-yellow-400 uppercase text-center">Formule Éco-Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: "Manutention & Évacuation des meubles", simple: true, clean: true, premium: true },
                  { name: "Tri éco-solidaire (Emmaüs, Secours Populaire)", simple: true, clean: true, premium: true },
                  { name: "Acheminement en déchetterie agréée (Recyclage)", simple: true, clean: true, premium: true },
                  { name: "Balayage soigné de fin de chantier", simple: true, clean: true, premium: true },
                  { name: "Lavage des sols et dépoussiérage humide", simple: false, clean: true, premium: true },
                  { name: "Désinfection virucide par nébulisation", simple: false, clean: "Option", premium: true },
                  { name: "Tri et restitution de documents importants/souvenirs", simple: "Option", clean: true, premium: true },
                  { name: "Destruction d'archives confidentielles certifiée", simple: false, clean: "Option", premium: true }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-semibold text-gray-300">{row.name}</td>
                    <td className="p-6 text-center">
                      {row.simple === true ? "✅" : row.simple === false ? "❌" : row.simple}
                    </td>
                    <td className="p-6 text-center">
                      {row.clean === true ? "✅" : row.clean === false ? "❌" : row.clean}
                    </td>
                    <td className="p-6 text-center">
                      {row.premium === true ? "✅" : row.premium === false ? "❌" : row.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <PageEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        pageId={`prices.${activeSection}`}
        initialContent={content[activeSection]}
        onSave={handleSave}
      />
    </div>
  );
};

export default Prices;
