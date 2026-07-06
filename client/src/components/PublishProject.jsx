import React, { useState } from 'react';

const PublishProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Maison',
    description: '',
    volume: '15',
    images: []
  });

  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const filesArray = Array.from(e.dataTransfer.files).map(file => file.name);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...filesArray] }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files).map(file => file.name);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...filesArray] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F3F6F9] relative flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-[#1e0a2d] to-transparent opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00d26a] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5d3077] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00d26a]/15 text-[#00d26a] rounded-full text-xs font-black uppercase tracking-widest mb-4">
            ✨ Devis 100% Gratuit & Sans Engagement
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-h1 text-[#1e0a2d] tracking-tight mb-4">
            Demande de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5d3077] to-[#00d26a]">Devis Personnalisé</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Décrivez votre projet de débarras et ajoutez des photos pour obtenir une estimation précise sous 2 heures ouvrées.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 text-center space-y-6">
            <div className="w-20 h-20 bg-[#00d26a]/20 text-[#00d26a] rounded-full flex items-center justify-center text-4xl mx-auto">
              ✓
            </div>
            <h3 className="text-3xl font-black font-h2 text-[#1e0a2d]">Demande Reçue !</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Merci <strong>{formData.name}</strong>. Un expert de l'équipe Stitch analyse actuellement vos photos et détails.
            </p>
            <div className="bg-[#1e0a2d]/5 p-6 rounded-2xl max-w-md mx-auto text-left text-sm space-y-2">
              <p className="text-[#1e0a2d] font-bold">⏱️ Temps de réponse estimé : <span className="text-[#00d26a]">1h 45min</span></p>
              <p className="text-gray-500">Un e-mail de confirmation vient d'être envoyé à <strong>{formData.email}</strong>.</p>
            </div>
            <button 
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  serviceType: 'Maison',
                  description: '',
                  volume: '15',
                  images: []
                });
              }}
              className="px-8 py-3 bg-[#1e0a2d] hover:bg-[#5d3077] text-white font-bold rounded-xl transition-all"
            >
              Faire une nouvelle demande
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 space-y-8">
            {/* Step 1: Services */}
            <div className="space-y-4">
              <label className="block text-sm font-black text-[#1e0a2d] uppercase tracking-wider">1. Type de débarras</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Maison', 'Appartement', 'Bureaux', 'Jardin / Extérieur'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, serviceType: type }))}
                    className={`py-3 px-4 rounded-2xl font-bold text-sm border transition-all ${formData.serviceType === type ? 'bg-[#1e0a2d] text-white border-[#1e0a2d]' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-black text-[#1e0a2d] uppercase tracking-wider">Volume estimé (m³)</label>
                <select
                  value={formData.volume}
                  onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-black font-semibold focus:outline-none focus:border-[#00d26a]"
                >
                  <option value="5">Petit volume (&lt; 5 m³)</option>
                  <option value="15">Moyen volume (5 à 20 m³)</option>
                  <option value="30">Grand volume (20 à 40 m³)</option>
                  <option value="60">Très grand volume (40+ m³)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-black text-[#1e0a2d] uppercase tracking-wider">Numéro de Téléphone</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: 06 12 34 56 78"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-black font-semibold focus:outline-none focus:border-[#00d26a]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-black text-[#1e0a2d] uppercase tracking-wider">Description des objets à évacuer</label>
              <textarea
                rows="4"
                required
                placeholder="Décrivez les meubles principaux, l'état d'accessibilité (étage, ascenseur, parking)..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-black font-semibold focus:outline-none focus:border-[#00d26a]"
              ></textarea>
            </div>

            {/* Step 3: Images Dropzone */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-[#1e0a2d] uppercase tracking-wider">Photos du projet (Recommandé)</label>
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragActive ? 'border-[#00d26a] bg-[#00d26a]/5' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer space-y-2 block">
                  <div className="text-4xl">📸</div>
                  <p className="text-sm font-bold text-[#1e0a2d]">Glissez-déposez des images ou cliquez pour parcourir</p>
                  <p className="text-xs text-gray-400">Formats acceptés : PNG, JPG jusqu'à 10 Mo par photo</p>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.images.map((name, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-xs font-bold text-gray-600">
                      <span>📎 {name}</span>
                      <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                        className="text-red-500 font-bold hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <label className="block text-sm font-black text-[#1e0a2d] uppercase tracking-wider">Votre Nom</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Jean Dupont"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-black font-semibold focus:outline-none focus:border-[#00d26a]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-black text-[#1e0a2d] uppercase tracking-wider">Votre E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="Ex: jean.dupont@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-black font-semibold focus:outline-none focus:border-[#00d26a]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e0a2d] hover:bg-[#5d3077] text-white py-5 rounded-2xl font-black text-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-[#1e0a2d]/20 flex justify-center items-center gap-2"
            >
              <span>Envoyer ma demande de devis</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PublishProject;
