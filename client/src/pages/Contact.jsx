import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', msg: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20">
      <div className="max-w-[1280px] mx-auto px-gutter space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00d26a] text-sm font-bold uppercase tracking-wider">
            📞 Contactez-nous
          </div>
          <h1 className="text-4xl lg:text-6xl font-black font-h1 tracking-tight leading-tight">
            Une question ? <span className="text-[#00d26a]">Écrivez-nous</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Notre service client est à votre disposition par téléphone ou par message pour planifier ou modifier un débarras.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details & Opening hours */}
          <div className="space-y-8 bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 glass">
            <h3 className="text-2xl font-black font-h2 border-b border-white/10 pb-4">Nos coordonnées</h3>
            
            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-bold text-white">Adresse Siège Social</p>
                  <p className="text-gray-400">14 Rue de la Revalorisation, 75011 Paris, France</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-bold text-white">Téléphone (Gratuit)</p>
                  <p className="text-[#00d26a] font-bold text-lg">01 88 99 00 11</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-bold text-white">E-mail support</p>
                  <p className="text-gray-400">contact@stitch-debarras.fr</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <h4 className="text-lg font-bold text-white">🕰️ Horaires d'ouverture</h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-400">
                <span>Lundi - Vendredi :</span>
                <span className="text-white text-right">08:00 - 19:30</span>
                <span>Samedi :</span>
                <span className="text-white text-right">09:00 - 18:00</span>
                <span>Dimanche :</span>
                <span className="text-red-400 text-right">Fermé (Urgences par email)</span>
              </div>
            </div>

            {/* Stylized Vector Map representation */}
            <div className="h-48 bg-gradient-to-br from-[#1e0a2d] to-[#5d3077]/40 rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/5">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              {/* Paris pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#00d26a] flex items-center justify-center animate-bounce shadow-xl">
                  <span className="text-white text-xs">📍</span>
                </div>
                <span className="text-[10px] font-black text-white bg-black/80 px-2 py-0.5 rounded-full mt-1">Stitch Paris</span>
              </div>
              <span className="text-xs text-gray-400 absolute bottom-3 right-3 font-semibold">Stitch Maps - Région Île-de-France</span>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 glass">
            {sent ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-[#00d26a]/20 text-[#00d26a] rounded-full flex items-center justify-center text-3xl mx-auto">✓</div>
                <h3 className="text-2xl font-black font-h2">Message Envoyé !</h3>
                <p className="text-gray-300 text-sm">
                  Merci <strong>{formData.name}</strong>. Notre équipe vous répondra par e-mail dans les plus brefs délais (généralement sous 1 heure).
                </p>
                <button 
                  onClick={() => {
                    setSent(false);
                    setFormData({ name: '', email: '', phone: '', msg: '' });
                  }}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold"
                >
                  Renvoyer un message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-black font-h2 border-b border-white/10 pb-4">Formulaire de contact</h3>
                
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Votre Nom Complet</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold uppercase">Adresse E-mail</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jean.dupont@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold uppercase">Téléphone (Optionnel)</label>
                    <input 
                      type="tel" 
                      placeholder="06 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Votre Message</label>
                  <textarea 
                    rows="5"
                    required
                    placeholder="Posez-nous vos questions ici..."
                    value={formData.msg}
                    onChange={(e) => setFormData(prev => ({ ...prev, msg: e.target.value }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#00d26a] hover:bg-[#00b058] text-white rounded-2xl font-black transition-all shadow-lg shadow-[#00d26a]/20"
                >
                  Envoyer mon Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
