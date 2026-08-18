import React, { useState, useEffect, useRef } from 'react';
import PageEditModal from '../components/PageEditModal';
import { API_BASE_URL } from '../config';

const ProSpace = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef(null);

  const defaultContent = {
    header: {
      badge: "🏭 Espace Professionnel & Industriel",
      title: "Débarras de grands volumes Simple, rapide & écoresponsable",
      subtitle: "Usines, entrepôts logistiques, châteaux ou grandes demeures : nous mettons à disposition nos experts de l'économie circulaire pour vider, trier et valoriser vos structures de grande taille."
    },
    cardsSection: {
      cardsList: [
        {
          icon: "🏭",
          title: "Usines & Industries",
          desc: "Démantèlement de machines, enlèvement de déchets industriels banals, tri de métaux, et nettoyage complet des sites de production."
        },
        {
          icon: "📦",
          title: "Entrepôts & Dépôts",
          desc: "Destockage massif, gestion des invendus, évacuation de racks métalliques, cartons, palettes de stockage et nettoyage de dalles béton."
        },
        {
          icon: "🏰",
          title: "Grands Domaines",
          desc: "Manoirs, châteaux, domaines agricoles ou grandes villas. Inventaire précis, débarras de meubles anciens, archivage et nettoyage après sinistre."
        }
      ]
    },
    rates: {
      usine: 9,
      entrepot: 5,
      grandDomaine: 8,
      autre: 6
    }
  };

  const [formData, setFormData] = useState({
    spaceType: 'Usine',
    area: 100,
    hasHazardous: false,
    accessConstraint: 'easy',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: '',
    photoCount: 0
  });

  const [estimate, setEstimate] = useState({
    minPrice: 0,
    maxPrice: 0,
    durationDays: 1,
    teamSize: 2,
    baseRate: 9
  });

  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);
  const [tempRates, setTempRates] = useState({
    usine: 9,
    entrepot: 5,
    grandDomaine: 8,
    autre: 6
  });
  const [ratesSuccessMsg, setRatesSuccessMsg] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
        const res = await fetch(`${API_BASE_URL}/api/pages/pro-space`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.content && Object.keys(data.content).length > 0) {
            setPageData(data.content);
            if (data.content.rates) {
              setTempRates(data.content.rates);
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
      const res = await fetch(`${API_BASE_URL}/api/pages/pro-space`, {
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

  const handleSaveRates = async (e) => {
    if (e) e.preventDefault();
    const currentFullContent = pageData || defaultContent;
    const updatedFullContent = {
      ...currentFullContent,
      rates: tempRates
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/pages/pro-space`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
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
      console.error("Error saving rates:", e);
    }
  };

  // Dynamic pricing and logistics estimation
  useEffect(() => {
    const currentRates = pageData?.rates || defaultContent.rates;
    const areaNum = Math.max(1, Number(formData.area) || 1);

    let pricePerSqm = Number(currentRates.autre) || 6;
    let baseDays = 1;
    let baseTeam = 3;

    if (formData.spaceType === 'Usine') {
      pricePerSqm = Number(currentRates.usine) || 9;
      baseDays = Math.ceil(areaNum / 400);
      baseTeam = Math.ceil(areaNum / 300) + 3;
    } else if (formData.spaceType === 'Entrepôt') {
      pricePerSqm = Number(currentRates.entrepot) || 5;
      baseDays = Math.ceil(areaNum / 600);
      baseTeam = Math.ceil(areaNum / 400) + 2;
    } else if (formData.spaceType === 'Grand Domaine') {
      pricePerSqm = Number(currentRates.grandDomaine) || 8;
      baseDays = Math.ceil(areaNum / 200);
      baseTeam = Math.ceil(areaNum / 150) + 2;
    } else if (formData.spaceType === 'Autre') {
      pricePerSqm = Number(currentRates.autre) || 6;
      baseDays = Math.ceil(areaNum / 300);
      baseTeam = Math.ceil(areaNum / 250) + 2;
    }

    if (formData.hasHazardous) {
      pricePerSqm += 3;
      baseTeam += 1;
    }

    if (formData.accessConstraint === 'difficult') {
      pricePerSqm *= 1.25;
      baseDays += 1;
    }

    const calculatedPrice = areaNum * pricePerSqm;
    setEstimate({
      minPrice: Math.round(calculatedPrice * 0.9),
      maxPrice: Math.round(calculatedPrice * 1.15),
      durationDays: Math.max(1, baseDays),
      teamSize: Math.max(2, baseTeam),
      baseRate: pricePerSqm
    });
  }, [formData.spaceType, formData.area, formData.hasHazardous, formData.accessConstraint, pageData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const averagePrice = Math.round((estimate.minPrice + estimate.maxPrice) / 2);
    
    const bookingPayload = {
      customer: `${formData.companyName} (${formData.contactName})`,
      email: formData.email,
      tel: formData.phone,
      service: `Espace Pro - Débarras ${formData.spaceType} (${formData.area} m²)`,
      volume: `${formData.area} m²`,
      cleaningExtra: false,
      donationSorting: true,
      date: new Date().toLocaleDateString('fr-FR'),
      time: "À planifier",
      address: `Contrainte d'accès: ${formData.accessConstraint === 'easy' ? 'Facile' : 'Difficile'} | Notes: ${formData.notes || 'Aucune'}`,
      paymentMethod: "Facture B2B / Virement",
      price: averagePrice,
      status: "Planifié",
      team: "Non assignée",
      isPro: true,
      photos: photos.map(p => p.dataUrl)
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload)
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Une erreur s'est produite lors de la soumission du formulaire.");
      }
    } catch (err) {
      console.error(err);
      alert("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  const processFiles = (files) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' Mo',
          dataUrl: e.target.result
        };
        setPhotos(prev => [...prev, newPhoto]);
        setFormData(prev => ({ ...prev, photoCount: prev.photoCount + 1 }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removePhoto = (id) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
    setFormData(prev => ({ ...prev, photoCount: Math.max(0, prev.photoCount - 1) }));
  };

  const content = pageData || defaultContent;
  const header = content.header || defaultContent.header;
  const cardsSection = content.cardsSection || defaultContent.cardsSection;
  const rates = content.rates || defaultContent.rates;

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-28 pb-16 relative overflow-hidden">
      {/* Premium Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/10 w-[600px] h-[600px] bg-[#00d26a]/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-[#5d3077]/20 rounded-full blur-[130px]"></div>
      </div>

      <div className="max-w-[1280px] mx-auto px-gutter relative z-10 space-y-10">
        
        {/* Header Hero Area */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-3xl p-6 transition-all duration-300 text-center space-y-4 max-w-2xl mx-auto">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('header')}
              className="absolute top-2 right-2 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5"
            >
              <span>✏️</span> Modifier En-tête
            </button>
          )}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d26a]/10 border border-[#00d26a]/30 text-[#00d26a] text-xs font-black tracking-widest uppercase">
            {header.badge}
          </div>
          <h1 className="text-2xl lg:text-4xl font-black font-h1 leading-tight tracking-tight">
            {header.title ? (
              <span dangerouslySetInnerHTML={{
                __html: header.title.replace(/Simple, rapide & écoresponsable/g, '<span class="text-[#00d26a]">Simple, rapide & écoresponsable</span>')
              }} />
            ) : (
              <>
                Débarras de grands volumes <br />
                <span className="text-[#00d26a]">Simple, rapide & écoresponsable</span>
              </>
            )}
          </h1>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            {header.subtitle}
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="relative group/sec border border-transparent hover:border-[#00d26a]/20 rounded-[3rem] p-6 transition-all duration-300">
          {isAdmin && (
            <button
              onClick={() => handleEditClick('cardsSection')}
              className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-all text-xs flex items-center gap-1.5"
            >
              <span>✏️</span> Modifier Secteurs
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cardsSection.cardsList?.map((card, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-[#00d26a]/30 transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#00d26a]/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {submitted ? (
          /* SUCCESS STATE PANEL */
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 max-w-4xl mx-auto space-y-8 shadow-[0_30px_60px_rgba(0,210,106,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d26a]/5 rounded-full blur-[80px]"></div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-[#00d26a]/20 text-[#00d26a] border border-[#00d26a]/30 rounded-full flex items-center justify-center text-4xl mx-auto animate-bounce">
                ✓
              </div>
              <h2 className="text-3xl md:text-4xl font-black">Demande enregistrée !</h2>
              <p className="text-gray-300 max-w-lg mx-auto">
                Merci pour votre demande. Un chef de projet industriel **Stitch Pro** a été assigné à votre dossier.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
              <h4 className="text-lg font-bold text-[#00d26a] flex items-center gap-2">
                <span>📋</span> Récapitulatif de l'estimation
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-xs text-gray-400">Type d'espace</p>
                  <p className="text-lg font-black">{formData.spaceType}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-xs text-gray-400">Superficie</p>
                  <p className="text-lg font-black">{formData.area} m²</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-xs text-gray-400">Équipe estimée</p>
                  <p className="text-lg font-black">{estimate.teamSize} équipiers</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-xs text-gray-400">Durée estimée</p>
                  <p className="text-lg font-black">{estimate.durationDays} jour{estimate.durationDays > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* Steps tracker timeline */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold">Prochaines étapes</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                <div className="relative space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#00d26a] text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h5 className="font-bold text-sm">Analyse technique</h5>
                  <p className="text-xs text-gray-400">Nous étudions vos contraintes d'accès et photos.</p>
                </div>
                <div className="relative space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#00d26a]/30 border border-[#00d26a]/50 text-[#00d26a] flex items-center justify-center font-bold text-sm">2</div>
                  <h5 className="font-bold text-sm">Visite sur site</h5>
                  <p className="text-xs text-gray-400">Un expert se déplace gratuitement pour affiner le cubage.</p>
                </div>
                <div className="relative space-y-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 text-gray-400 flex items-center justify-center font-bold text-sm">3</div>
                  <h5 className="font-bold text-sm">Devis ferme</h5>
                  <p className="text-xs text-gray-400">Réception de l'offre finale sous 24h avec valorisation.</p>
                </div>
                <div className="relative space-y-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 text-gray-400 flex items-center justify-center font-bold text-sm">4</div>
                  <h5 className="font-bold text-sm">Intervention</h5>
                  <p className="text-xs text-gray-400">Débarras, tri sélectif et nettoyage écoresponsable.</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button 
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-[#00d26a] hover:bg-[#00b058] text-white font-bold rounded-xl transition-all duration-300"
              >
                Faire une nouvelle demande
              </button>
            </div>
          </div>
        ) : (
          /* WORKSPACE CALCULATOR & FORM */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Form Section */}
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d26a]/5 rounded-full blur-2xl"></div>
              
              <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black">Planifiez votre grand débarras</h2>
                  <p className="text-gray-400 text-sm mt-1">Configurez les paramètres ci-dessous pour obtenir une estimation immédiate.</p>
                </div>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setTempRates(pageData?.rates || defaultContent.rates);
                      setIsRatesModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#00d26a]/15 hover:bg-[#00d26a] border border-[#00d26a]/40 hover:border-[#00d26a] text-[#00d26a] hover:text-white rounded-xl text-xs font-black transition-all shadow-md active:scale-95 flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
                  >
                    <span>⚙️</span> Modifier Tarifs au m²
                  </button>
                )}
              </div>

              {ratesSuccessMsg && (
                <div className="p-3 bg-[#00d26a]/20 border border-[#00d26a]/50 rounded-xl text-[#00d26a] text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <span>✓</span> Grille tarifaire au m² mise à jour avec succès et appliquée immédiatement !
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Space Type Selector */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-300">Quel type d'espace souhaitez-vous débarrasser ?</label>
                    <span className="text-[11px] text-gray-400 font-medium">Tarifs configurables au m²</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { type: 'Usine', icon: '🏭', rate: rates.usine || 9 },
                      { type: 'Entrepôt', icon: '📦', rate: rates.entrepot || 5 },
                      { type: 'Grand Domaine', icon: '🏰', rate: rates.grandDomaine || 8 },
                      { type: 'Autre', icon: '🏢', rate: rates.autre || 6 }
                    ].map(({ type, icon, rate }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, spaceType: type }))}
                        className={`py-4 px-3 rounded-2xl font-bold border transition-all duration-300 flex flex-col items-center gap-2 
                        ${formData.spaceType === type 
                          ? 'bg-[#00d26a]/20 border-[#00d26a] text-white shadow-[0_0_15px_rgba(0,210,106,0.2)]' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                      >
                        <span className="text-2xl">{icon}</span>
                        <span className="text-xs whitespace-nowrap">{type}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                          formData.spaceType === type
                            ? 'bg-[#00d26a] text-[#1e0a2d]'
                            : 'bg-white/10 text-gray-400'
                        }`}>
                          {rate} € / m²
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area Slider & Custom Manual Input */}
                <div className="space-y-3 bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-sm font-bold text-gray-300">Superficie estimée</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-medium">Saisie personnalisée :</span>
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          min="1"
                          value={formData.area}
                          onChange={(e) => {
                            const val = e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1);
                            setFormData(prev => ({ ...prev, area: val }));
                          }}
                          className="w-28 text-right pr-9 pl-3 py-1.5 bg-[#00d26a]/15 border border-[#00d26a]/40 focus:border-[#00d26a] focus:ring-2 focus:ring-[#00d26a]/30 text-[#00d26a] rounded-xl font-black text-sm md:text-base outline-none transition-all"
                          placeholder="ex: 150"
                        />
                        <span className="absolute right-3 text-[#00d26a] font-bold text-xs pointer-events-none">m²</span>
                      </div>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="5000"
                    step="1"
                    value={typeof formData.area === 'number' ? Math.min(5000, Math.max(1, formData.area)) : 1}
                    onChange={(e) => setFormData(prev => ({ ...prev, area: parseInt(e.target.value) || 1 }))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00d26a]"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-medium">
                    <span>1 m²</span>
                    <span>2 500 m²</span>
                    <span>5 000 m²</span>
                  </div>

                  {/* Quick preset buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
                    <span className="text-[11px] text-gray-400 font-medium">Raccourcis :</span>
                    {[1, 50, 100, 500, 1000, 2500, 5000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, area: val }))}
                        className={`px-2.5 py-1 text-xs rounded-lg font-bold border transition-all ${
                          formData.area === val
                            ? 'bg-[#00d26a]/20 border-[#00d26a] text-[#00d26a] shadow-[0_0_10px_rgba(0,210,106,0.2)]'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {val === 1 ? '1 m²' : `${val.toLocaleString()} m²`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logistics options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Hazardous checkbox */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm">Déchets Spéciaux / Dangereux</h4>
                      <p className="text-xs text-gray-400">Présence de solvants, huiles, produits chimiques, amiante.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasHazardous}
                        onChange={(e) => setFormData(prev => ({ ...prev, hasHazardous: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00d26a]"></div>
                    </label>
                  </div>

                  {/* Access selector */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-sm">Difficulté d'accès logistique</h4>
                      <p className="text-xs text-gray-400">Accès pour camions semi-remorques ou bennes.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, accessConstraint: 'easy' }))}
                        className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all duration-300 
                        ${formData.accessConstraint === 'easy' 
                          ? 'bg-[#00d26a]/20 border-[#00d26a] text-white' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                      >
                        Facile (Cour/Plain-pied)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, accessConstraint: 'difficult' }))}
                        className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all duration-300 
                        ${formData.accessConstraint === 'difficult' 
                          ? 'bg-red-500/20 border-red-500 text-white' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                      >
                        Difficile (Étroit/Étages)
                      </button>
                    </div>
                  </div>

                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h3 className="text-xl font-bold">Informations de contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nom de l'entreprise"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Nom du contact responsable"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Adresse email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    />
                    <input
                      type="tel"
                      placeholder="Numéro de téléphone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    />
                  </div>
                  <textarea
                    placeholder="Description du chantier, objets ou contraintes particulières..."
                    rows="4"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  ></textarea>

                  {/* Photo Uploader Drag & Drop */}
                  <div className="space-y-3">
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      multiple
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      className="hidden"
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
                        dragActive 
                          ? 'border-[#00d26a] bg-[#00d26a]/10 scale-[1.01]' 
                          : 'border-white/10 hover:border-[#00d26a]/50 bg-white/[0.02] hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className="text-4xl block mb-2 transition-transform hover:scale-110">📸</span>
                      <p className="text-sm font-bold text-white">Glissez et déposez des photos du site</p>
                      <p className="text-xs text-gray-400 mt-1">
                        ou <span className="text-[#00d26a] underline font-semibold">cliquez pour parcourir</span> (Format JPG, PNG - Max 10Mo par fichier)
                      </p>
                      
                      {photos.length > 0 && (
                        <div className="mt-3 inline-flex items-center gap-2 bg-[#00d26a]/20 text-[#00d26a] text-xs font-bold px-3.5 py-1 rounded-full border border-[#00d26a]/30">
                          <span>✓ {photos.length} photo{photos.length > 1 ? 's' : ''} sélectionnée{photos.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>

                    {/* Photo Thumbnails Preview Grid */}
                    {photos.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                        {photos.map((photo) => (
                          <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/40 aspect-square shadow-lg">
                            <img src={photo.dataUrl} alt={photo.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                              <button 
                                type="button" 
                                onClick={(e) => { e.stopPropagation(); removePhoto(photo.id); }}
                                className="self-end bg-red-500/90 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow transition-colors"
                                title="Supprimer la photo"
                              >
                                ✕
                              </button>
                              <div className="text-[10px] text-gray-200 truncate">
                                <p className="font-bold truncate">{photo.name}</p>
                                <p className="text-gray-400">{photo.size}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,210,106,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Envoi de la demande...</span>
                    </>
                  ) : (
                    <span>Soumettre ma demande de devis Stitch Pro</span>
                  )}
                </button>

              </form>
            </div>

            {/* Immediate Interactive Estimate Panel */}
            <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-[3rem] p-8 space-y-6 sticky top-24">
              <h3 className="text-xl font-bold border-b border-white/10 pb-4">Simulation pré-technique</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Estimation tarifaire</p>
                  <p className="text-3xl md:text-4xl font-black text-[#00d26a] mt-1">
                    {estimate.minPrice.toLocaleString()}€ - {estimate.maxPrice.toLocaleString()}€
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">Valorisation de matières recyclables déduite si applicable.</p>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-300">
                    <span>⚡</span> Tarif base : <span className="font-black text-[#00d26a]">{estimate.baseRate} € / m²</span> ({formData.spaceType})
                  </div>
                </div>

                <div className="h-px bg-white/10"></div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Durée du chantier :</span>
                    <span className="text-sm font-bold flex items-center gap-1.5">
                      📅 ~{estimate.durationDays} jour{estimate.durationDays > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Équipe préconisée :</span>
                    <span className="text-sm font-bold flex items-center gap-1.5">
                      👥 {estimate.teamSize} équipiers
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Visite technique requise :</span>
                    <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                      Oui (Gratuite)
                    </span>
                  </div>
                </div>

                <div className="bg-[#00d26a]/5 border border-[#00d26a]/20 rounded-2xl p-4 space-y-2">
                  <p className="text-xs font-bold text-[#00d26a] flex items-center gap-1.5">
                    🛡️ Garantie Écoresponsable Stitch
                  </p>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    95% des matériaux collectés sont réintroduits dans le circuit de recyclage ou donnés à des associations partenaires.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Admin Rates Configuration Modal */}
      {isRatesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1e0a2d] border border-white/20 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6 relative text-white">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2">
                  <span className="text-[#00d26a]">⚙️</span> Configuration des Tarifs au m²
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Définissez le prix de base par mètre carré pour chaque type d'espace.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Usine */}
                <div className="space-y-1.5 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <label className="text-xs font-bold text-gray-300 flex items-center gap-2">
                    <span className="text-lg">🏭</span> Usine
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="1"
                      required
                      value={tempRates.usine}
                      onChange={(e) => setTempRates(prev => ({ ...prev, usine: Math.max(1, parseInt(e.target.value) || 1) }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#00d26a] rounded-xl p-3 pr-14 text-white font-black text-base outline-none transition-all"
                    />
                    <span className="absolute right-3 text-xs font-bold text-gray-400 pointer-events-none">€ / m²</span>
                  </div>
                </div>

                {/* Entrepôt */}
                <div className="space-y-1.5 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <label className="text-xs font-bold text-gray-300 flex items-center gap-2">
                    <span className="text-lg">📦</span> Entrepôt
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="1"
                      required
                      value={tempRates.entrepot}
                      onChange={(e) => setTempRates(prev => ({ ...prev, entrepot: Math.max(1, parseInt(e.target.value) || 1) }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#00d26a] rounded-xl p-3 pr-14 text-white font-black text-base outline-none transition-all"
                    />
                    <span className="absolute right-3 text-xs font-bold text-gray-400 pointer-events-none">€ / m²</span>
                  </div>
                </div>

                {/* Grand Domaine */}
                <div className="space-y-1.5 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <label className="text-xs font-bold text-gray-300 flex items-center gap-2">
                    <span className="text-lg">🏰</span> Grand Domaine
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="1"
                      required
                      value={tempRates.grandDomaine}
                      onChange={(e) => setTempRates(prev => ({ ...prev, grandDomaine: Math.max(1, parseInt(e.target.value) || 1) }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#00d26a] rounded-xl p-3 pr-14 text-white font-black text-base outline-none transition-all"
                    />
                    <span className="absolute right-3 text-xs font-bold text-gray-400 pointer-events-none">€ / m²</span>
                  </div>
                </div>

                {/* Autre */}
                <div className="space-y-1.5 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <label className="text-xs font-bold text-gray-300 flex items-center gap-2">
                    <span className="text-lg">🏢</span> Autre
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="1"
                      required
                      value={tempRates.autre}
                      onChange={(e) => setTempRates(prev => ({ ...prev, autre: Math.max(1, parseInt(e.target.value) || 1) }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#00d26a] rounded-xl p-3 pr-14 text-white font-black text-base outline-none transition-all"
                    />
                    <span className="absolute right-3 text-xs font-bold text-gray-400 pointer-events-none">€ / m²</span>
                  </div>
                </div>

              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
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
        pageId={`pro-space.${activeSection}`}
        initialContent={content[activeSection]}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProSpace;
