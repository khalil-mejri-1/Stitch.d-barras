import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || 'Débarras de Maisons & Villas';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: initialService,
    volume: 15,
    cleaningExtra: false,
    donationSorting: true,
    date: '',
    time: '08:00',
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'card'
  });

  const [price, setPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState(null); // { type: 'success' | 'info' | 'error', title: '', message: '' }

  // Instant Price Calculation
  useEffect(() => {
    let ratePerCube = 45; // default rate
    if (formData.service.includes('Appartement') || formData.service.includes('Cave')) {
      ratePerCube = 50;
    } else if (formData.service.includes('Bureaux') || formData.service.includes('Locaux')) {
      ratePerCube = 40;
    } else if (formData.service.includes('Spécialisé') || formData.service.includes('Diogène') || formData.service.includes('Nettoyage')) {
      ratePerCube = 90;
    } else if (formData.service.includes('Jardin')) {
      ratePerCube = 35;
    }

    let total = formData.volume * ratePerCube;

    if (formData.cleaningExtra) {
      total += formData.volume * 15; // Extra cleaning adds 15€ per m3
    }

    setPrice(total);
  }, [formData.service, formData.volume, formData.cleaningExtra]);

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      customer: formData.name,
      email: formData.email,
      tel: formData.phone,
      service: formData.service,
      volume: `${formData.volume} m³`,
      cleaningExtra: formData.cleaningExtra,
      donationSorting: formData.donationSorting,
      date: formData.date,
      time: formData.time,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      price: price
    };

    try {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la réservation.");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setModal({ type: 'error', title: 'Erreur de connexion', message: 'Impossible de se connecter au serveur. Veuillez réessayer plus tard.' });
    }
  };

  const services = [
    "Débarras de Maisons & Villas",
    "Débarras d'Appartements & Caves",
    "Débarras de Bureaux & Locaux",
    "Débarras de Jardins & Espaces Extérieurs",
    "Nettoyage Spécialisé & Diogène"
  ];

  const isStep2Valid = !!(formData.date && formData.name && formData.email && formData.phone && formData.address);

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20">
      <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Reservation Form (Steps 1 & 2) */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 glass space-y-8">
          
          {/* Stepper Indicators */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-[#00d26a] text-white' : 'bg-white/10 text-gray-400'}`}>1</span>
              <span className="text-sm font-bold">Détails de la prestation</span>
            </div>
            <div className="h-px w-12 bg-white/10"></div>
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-[#00d26a] text-white' : 'bg-white/10 text-gray-400'}`}>2</span>
              <span className="text-sm font-bold">Planification</span>
            </div>
            <div className="h-px w-12 bg-white/10"></div>
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-[#00d26a] text-white' : 'bg-white/10 text-gray-400'}`}>3</span>
              <span className="text-sm font-bold">Paiement & Validation</span>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-[#00d26a]/20 text-[#00d26a] rounded-full flex items-center justify-center text-4xl mx-auto">✓</div>
              <h2 className="text-3xl font-black font-h2">Réservation Confirmée !</h2>
              <p className="text-gray-300 max-w-md mx-auto">
                Votre créneau pour le <strong>{formData.date}</strong> à <strong>{formData.time}</strong> a été réservé avec succès.
              </p>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl max-w-md mx-auto text-left space-y-2">
                <p className="text-[#00d26a] font-bold">Détails du récapitulatif :</p>
                <p className="text-sm text-gray-300">Client : {formData.name}</p>
                <p className="text-sm text-gray-300">Service : {formData.service}</p>
                <p className="text-sm text-gray-300">Volume estimé : {formData.volume} m³</p>
                <p className="text-sm text-gray-300">Adresse : {formData.address}</p>
                <p className="text-sm text-[#00d26a] font-bold">Total estimé : {price} €</p>
              </div>
              <p className="text-xs text-gray-400">Une facture proforma vous a été envoyée sur votre boîte e-mail ({formData.email}).</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Prestation Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-400">Sélectionnez le service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold focus:outline-none focus:border-[#00d26a]"
                    >
                      {services.map((item, idx) => (
                        <option key={idx} value={item} className="bg-[#1e0a2d] text-white">{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-bold uppercase tracking-wider text-gray-400">Volume estimé : {formData.volume} m³</label>
                      <span className="text-xs text-[#00d26a] bg-[#00d26a]/15 px-3 py-1 rounded-full font-bold">1 m³ ≈ 1 lave-linge</span>
                    </div>
                    <input 
                      type="range"
                      min="1"
                      max="100"
                      value={formData.volume}
                      onChange={(e) => setFormData(prev => ({ ...prev, volume: parseInt(e.target.value) }))}
                      className="w-full accent-[#00d26a]"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>1 m³ (petit placard)</span>
                      <span>50 m³ (maison standard)</span>
                      <span>100 m³ (grand hangar)</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Options supplémentaires</h4>
                    <label className="flex items-center gap-3 cursor-pointer p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                      <input 
                        type="checkbox" 
                        checked={formData.cleaningExtra} 
                        onChange={(e) => setFormData(prev => ({ ...prev, cleaningExtra: e.target.checked }))}
                        className="w-5 h-5 accent-[#00d26a]"
                      />
                      <div>
                        <p className="font-bold text-sm">Nettoyage & Désinfection post-débarras (+15€ / m³)</p>
                        <p className="text-xs text-gray-400">Lavage approfondi des sols et des murs après l'évacuation des meubles.</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                      <input 
                        type="checkbox" 
                        checked={formData.donationSorting} 
                        onChange={(e) => setFormData(prev => ({ ...prev, donationSorting: e.target.checked }))}
                        className="w-5 h-5 accent-[#00d26a]"
                      />
                      <div>
                        <p className="font-bold text-sm">Tri Éco-solidaire (Gratuit)</p>
                        <p className="text-xs text-gray-400">Nous mettons de côté les objets réutilisables pour les donner aux associations.</p>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      type="button" 
                      onClick={handleNext}
                      className="px-8 py-4 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-2xl flex items-center gap-2"
                    >
                      Continuer
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Time & Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold uppercase tracking-wider text-gray-400">Date d'intervention</label>
                      <input 
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold focus:outline-none focus:border-[#00d26a]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold uppercase tracking-wider text-gray-400">Heure souhaitée</label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold focus:outline-none focus:border-[#00d26a]"
                      >
                        <option value="08:00" className="bg-[#1e0a2d]">Matin (08:00)</option>
                        <option value="12:00" className="bg-[#1e0a2d]">Midi (12:00)</option>
                        <option value="14:00" className="bg-[#1e0a2d]">Après-midi (14:00)</option>
                        <option value="17:00" className="bg-[#1e0a2d]">Fin de journée (17:00)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-h2">Vos Informations de contact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase text-gray-400">Nom Complet</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Nom Prénom"
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase text-gray-400">Adresse Email</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="votre@email.com"
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase text-gray-400">Téléphone</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="06 00 00 00 00"
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase text-gray-400">Adresse d'intervention</label>
                        <input 
                          type="text" 
                          required
                          value={formData.address}
                          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="Rue, Code Postal, Ville"
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button 
                      type="button" 
                      onClick={handlePrev}
                      className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl"
                    >
                      Retour
                    </button>
                    <button 
                      type="button" 
                      onClick={handleNext}
                      disabled={!isStep2Valid}
                      className={`px-8 py-4 font-black rounded-2xl flex items-center gap-2 transition-all ${
                        isStep2Valid 
                          ? 'bg-[#00d26a] hover:bg-[#00b058] text-white cursor-pointer' 
                          : 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                      }`}
                    >
                      Continuer
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Method */}
              {step === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold uppercase tracking-wider text-gray-400">Mode de règlement</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'card', name: 'CB / Visa', desc: 'Débit à la fin du chantier' },
                      { id: 'paypal', name: 'PayPal', desc: 'Règlement en ligne 100% sécurisé' },
                      { id: 'onsite', name: 'Sur place', desc: 'Paiement chèque ou espèces' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                        className={`p-6 border rounded-2xl text-left transition-all ${formData.paymentMethod === method.id ? 'border-[#00d26a] bg-[#00d26a]/10 text-white' : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'}`}
                      >
                        <p className="font-black text-base">{method.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{method.desc}</p>
                      </button>
                    ))}
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 font-bold uppercase">Numéro de carte</label>
                        <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-bold uppercase">Expiration</label>
                          <input type="text" placeholder="MM/AA" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-bold uppercase">Cryptogramme (CVC)</label>
                          <input type="text" placeholder="123" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <button 
                      type="button" 
                      onClick={handlePrev}
                      className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl"
                    >
                      Retour
                    </button>
                    <button 
                      type="submit"
                      className="px-10 py-4 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-2xl shadow-xl shadow-[#00d26a]/20"
                    >
                      Valider et Réserver ({price} €)
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Pricing Summary Sidepanel */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 glass space-y-6">
          <h3 className="text-2xl font-black font-h2 border-b border-white/10 pb-4">Résumé de l'estimation</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Service</span>
              <span className="font-bold text-right max-w-[150px] truncate">{formData.service}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Volume</span>
              <span className="font-bold">{formData.volume} m³</span>
            </div>
            {formData.cleaningExtra && (
              <div className="flex justify-between text-sm text-[#00d26a]">
                <span>Option Nettoyage</span>
                <span>Inclus</span>
              </div>
            )}
            {formData.donationSorting && (
              <div className="flex justify-between text-sm text-purple-400">
                <span>Tri Éco-solidaire</span>
                <span>Activé (Gratuit)</span>
              </div>
            )}
            <div className="h-px bg-white/10 my-4"></div>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs text-gray-400 font-bold block">PRIX ESTIMÉ TTC</span>
                <span className="text-3xl font-black text-[#00d26a]">{price} €</span>
              </div>
              <span className="text-xs text-gray-400 text-right">Soit env. {(price / formData.volume).toFixed(1)}€/m³</span>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl text-xs text-gray-400 leading-relaxed space-y-2">
            <p className="font-bold text-white">📌 Bon à savoir :</p>
            <p>Notre estimation est indicative. Un technicien peut ajuster le volume sur place de +/- 10% maximum sans surcoût.</p>
            <p><strong>Crédit d'impôt :</strong> Le débarras de cave ou le ménage peut ouvrir droit à 50% de crédit d'impôt sur les services à la personne (selon conditions).</p>
          </div>
        </div>

      </div>

      {/* Custom Professional Modal */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-gradient-to-br from-[#1e0a2d] to-[#3a1555] border border-white/10 rounded-[2.5rem] p-8 max-w-md w-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] text-center relative overflow-hidden glass">
            {/* Glowing background blob inside modal */}
            <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full blur-2xl opacity-20 ${modal.type === 'error' ? 'bg-red-500' : 'bg-[#00d26a]'}`}></div>
            
            {/* Icon */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold ${
              modal.type === 'error' 
                ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                : 'bg-[#00d26a]/10 text-[#00d26a] border border-[#00d26a]/20'
            }`}>
              {modal.type === 'error' ? '✕' : modal.type === 'success' ? '✓' : 'ℹ'}
            </div>

            <h3 className="text-xl font-black font-h2 text-white mb-2">{modal.title}</h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">{modal.message}</p>
            
            <button
              onClick={() => setModal(null)}
              className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white font-bold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
