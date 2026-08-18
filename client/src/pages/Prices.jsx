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

  // Admin rates modal
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);
  const [tempRates, setTempRates] = useState({ small: 55, medium: 45, large: 38 });
  const [ratesSuccessMsg, setRatesSuccessMsg] = useState(false);

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
    },
    simulatorRates: {
      small: 55,
      medium: 45,
      large: 38,
      smallLabel: "Petits volumes (< 10 m³)",
      mediumLabel: "Volume standard (10 – 30 m³)",
      largeLabel: "Grand volume (> 30 m³)"
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
            if (data.content.simulatorRates) {
              setTempRates({
                small: data.content.simulatorRates.small || 55,
                medium: data.content.simulatorRates.medium || 45,
                large: data.content.simulatorRates.large || 38
              });
            }
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
        headers: { 'Content-Type': 'application/json' },
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

  const handleSaveRates = async (e) => {
    if (e) e.preventDefault();
    const currentFullContent = pageData || defaultContent;
    const updatedFullContent = {
      ...currentFullContent,
      simulatorRates: {
        ...((pageData?.simulatorRates) || defaultContent.simulatorRates),
        small: tempRates.small,
        medium: tempRates.medium,
        large: tempRates.large
      }
    };
    try {
      const res = await fetch(`${API_BASE_URL}/api/pages/prices`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updatedFullContent })
      });
      if (res.ok) {
        const data = await res.json();
        setPageData(data.content);
        setIsRatesModalOpen(false);
        setRatesSuccessMsg(true);
        setTimeout(() => setRatesSuccessMsg(false), 4000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const content = pageData || defaultContent;
  const header = content.header || defaultContent.header;
  const pricingTable = content.pricingTable || defaultContent.pricingTable;
  const compareTable = content.compareTable || defaultContent.compareTable;
  const simRates = content.simulatorRates || defaultContent.simulatorRates;

  const getRate = () => {
    const vol = Math.max(1, Number(volume) || 1);
    if (vol < 10) return simRates.small || 55;
    if (vol > 30) return simRates.large || 38;
    return simRates.medium || 45;
  };

  const getEstimatedCost = () => {
    const vol = Math.max(1, Number(volume) || 1);
    return vol * getRate();
  };

  const getRateLabel = () => {
    const vol = Math.max(1, Number(volume) || 1);
    if (vol < 10) return `${simRates.small || 55} €/m³ — ${simRates.smallLabel || 'Petits volumes'}`;
    if (vol > 30) return `${simRates.large || 38} €/m³ — ${simRates.largeLabel || 'Grand volume'}`;
    return `${simRates.medium || 45} €/m³ — ${simRates.mediumLabel || 'Volume standard'}`;
  };

  const getTier = () => {
    const vol = Math.max(1, Number(volume) || 1);
    if (vol < 10) return 'small';
    if (vol > 30) return 'large';
    return 'medium';
  };

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
              <>Combien coûte un <span className="text-[#00d26a]">débarras ?</span></>
            )}
          </h1>
          <p className="text-gray-400 text-lg">{header.subtitle}</p>
        </div>

        {/* Interactive Volume Simulator */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 glass max-w-4xl mx-auto space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d26a] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

          {/* Header with admin button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-2xl lg:text-3xl font-black font-h2">Simulateur de Tarif au Volume</h3>
              <p className="text-gray-400 text-sm">Faites glisser le curseur ou saisissez votre volume pour estimer le coût.</p>
            </div>
            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  setTempRates({
                    small: simRates.small || 55,
                    medium: simRates.medium || 45,
                    large: simRates.large || 38
                  });
                  setIsRatesModalOpen(true);
                }}
                className="px-4 py-2 bg-[#00d26a]/15 hover:bg-[#00d26a] border border-[#00d26a]/40 hover:border-[#00d26a] text-[#00d26a] hover:text-white rounded-xl text-xs font-black transition-all shadow-md active:scale-95 flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <span>⚙️</span> Modifier les tarifs /m³
              </button>
            )}
          </div>

          {ratesSuccessMsg && (
            <div className="p-3 bg-[#00d26a]/20 border border-[#00d26a]/50 rounded-xl text-[#00d26a] text-xs font-bold flex items-center gap-2">
              <span>✓</span> Tarifs au m³ mis à jour avec succès et appliqués immédiatement !
            </div>
          )}

          {/* Volume control */}
          <div className="space-y-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm font-bold text-gray-300">Volume estimé</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-medium">Saisie directe :</span>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={volume}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1);
                      setVolume(val);
                    }}
                    className="w-28 text-right pr-9 pl-3 py-1.5 bg-[#00d26a]/15 border border-[#00d26a]/40 focus:border-[#00d26a] focus:ring-2 focus:ring-[#00d26a]/30 text-[#00d26a] rounded-xl font-black text-sm md:text-base outline-none transition-all"
                    placeholder="ex: 25"
                  />
                  <span className="absolute right-3 text-[#00d26a] font-bold text-xs pointer-events-none">m³</span>
                </div>
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="80"
              step="1"
              value={typeof volume === 'number' ? Math.min(80, Math.max(1, volume)) : 1}
              onChange={(e) => setVolume(parseInt(e.target.value) || 1)}
              className="w-full accent-[#00d26a] h-2"
            />

            {/* Volume tier indicators */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: '< 10 m³', sub: 'Quelques meubles', tier: 'small', rate: simRates.small || 55 },
                { label: '10 – 30 m³', sub: 'Appartement', tier: 'medium', rate: simRates.medium || 45 },
                { label: '> 30 m³', sub: 'Grande maison', tier: 'large', rate: simRates.large || 38 }
              ].map(({ label, sub, tier, rate }) => (
                <div
                  key={tier}
                  className={`rounded-xl p-2.5 border text-xs transition-all ${
                    getTier() === tier
                      ? 'bg-[#00d26a]/15 border-[#00d26a]/50 text-[#00d26a]'
                      : 'bg-white/5 border-white/5 text-gray-400'
                  }`}
                >
                  <p className="font-black">{label}</p>
                  <p className="text-[10px] opacity-70 mt-0.5">{sub}</p>
                  <p className={`font-black mt-1 ${getTier() === tier ? 'text-[#00d26a]' : 'text-gray-500'}`}>{rate} €/m³</p>
                </div>
              ))}
            </div>

            {/* Quick presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
              <span className="text-[11px] text-gray-400 font-medium">Raccourcis :</span>
              {[2, 5, 10, 20, 35, 50, 80].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setVolume(val)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-bold border transition-all ${
                    volume === val
                      ? 'bg-[#00d26a]/20 border-[#00d26a] text-[#00d26a] shadow-[0_0_10px_rgba(0,210,106,0.2)]'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {val} m³
                </button>
              ))}
            </div>
          </div>

          {/* Estimation result */}
          <div className="bg-[#1e0a2d]/50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 border border-white/5">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estimation du coût</p>
              <p className="text-4xl md:text-5xl font-black text-[#00d26a]">
                {getEstimatedCost().toLocaleString()} €{' '}
                <span className="text-xs text-gray-400 font-normal">TTC</span>
              </p>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                  getTier() === 'small'
                    ? 'bg-blue-500/15 text-blue-300'
                    : getTier() === 'large'
                      ? 'bg-yellow-400/15 text-yellow-300'
                      : 'bg-[#00d26a]/15 text-[#00d26a]'
                }`}>
                  {getRateLabel()}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">Estimation non-contractuelle. Devis gratuit sous 24h.</p>
            </div>
            <Link
              to={`/booking?service=Débarras&volume=${volume}`}
              className="w-full md:w-auto px-8 py-4 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-xl text-center shadow-xl shadow-[#00d26a]/20 transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap"
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

      {/* Admin Rates Configuration Modal */}
      {isRatesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#1e0a2d] border border-white/20 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6 text-white">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2">
                  <span className="text-[#00d26a]">⚙️</span> Configuration des Tarifs au m³
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Définissez le prix par mètre cube selon le volume du client.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsRatesModalOpen(false)}
                className="text-gray-400 hover:text-white text-xl p-1 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRates} className="space-y-4">

              {/* Small rate */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="font-bold text-sm text-blue-300">Petits volumes — moins de 10 m³</p>
                    <p className="text-[11px] text-gray-400">Quelques meubles, studio, cave…</p>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="1"
                    required
                    value={tempRates.small}
                    onChange={(e) => setTempRates(prev => ({ ...prev, small: Math.max(1, parseInt(e.target.value) || 1) }))}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#00d26a] rounded-xl p-3 pr-16 text-white font-black text-lg outline-none transition-all"
                  />
                  <span className="absolute right-3 text-xs font-bold text-gray-400 pointer-events-none">€ / m³</span>
                </div>
              </div>

              {/* Medium rate */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <p className="font-bold text-sm text-[#00d26a]">Volume standard — 10 à 30 m³</p>
                    <p className="text-[11px] text-gray-400">Appartement T2/T3, débarras classique</p>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="1"
                    required
                    value={tempRates.medium}
                    onChange={(e) => setTempRates(prev => ({ ...prev, medium: Math.max(1, parseInt(e.target.value) || 1) }))}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#00d26a] rounded-xl p-3 pr-16 text-white font-black text-lg outline-none transition-all"
                  />
                  <span className="absolute right-3 text-xs font-bold text-gray-400 pointer-events-none">€ / m³</span>
                </div>
              </div>

              {/* Large rate */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏡</span>
                  <div>
                    <p className="font-bold text-sm text-yellow-300">Grand volume — plus de 30 m³</p>
                    <p className="text-[11px] text-gray-400">Maison, pavillon, grande villa</p>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="1"
                    required
                    value={tempRates.large}
                    onChange={(e) => setTempRates(prev => ({ ...prev, large: Math.max(1, parseInt(e.target.value) || 1) }))}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#00d26a] rounded-xl p-3 pr-16 text-white font-black text-lg outline-none transition-all"
                  />
                  <span className="absolute right-3 text-xs font-bold text-gray-400 pointer-events-none">€ / m³</span>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-[#00d26a]/5 border border-[#00d26a]/20 rounded-xl p-3 text-xs text-gray-300 space-y-1">
                <p className="font-bold text-[#00d26a] mb-1.5">Aperçu des paliers tarifaires :</p>
                <p>📦 &lt; 10 m³ → <strong>{tempRates.small} €/m³</strong> (ex: 5 m³ = <strong>{(5 * tempRates.small).toLocaleString()} €</strong>)</p>
                <p>🏠 10–30 m³ → <strong>{tempRates.medium} €/m³</strong> (ex: 20 m³ = <strong>{(20 * tempRates.medium).toLocaleString()} €</strong>)</p>
                <p>🏡 &gt; 30 m³ → <strong>{tempRates.large} €/m³</strong> (ex: 50 m³ = <strong>{(50 * tempRates.large).toLocaleString()} €</strong>)</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsRatesModalOpen(false)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-gray-300 font-bold rounded-xl text-sm transition-all cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#00d26a] hover:bg-[#00b058] text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-[#00d26a]/25 flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>💾</span> Enregistrer les tarifs
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
