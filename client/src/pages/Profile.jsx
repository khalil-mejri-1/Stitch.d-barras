import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        const name = `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.name || "Utilisateur Stitch";
        return {
          name: name,
          email: u.email || "",
          phone: u.phone || "",
          address: u.address || "",
          avatar: u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00d26a&color=fff`
        };
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: "",
      email: "",
      phone: "",
      address: "",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300"
    };
  });

  const [activeTab, setActiveTab] = useState('settings');
  const [successMsg, setSuccessMsg] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/bookings`);
        if (res.ok) {
          const data = await res.json();
          const filtered = data.filter(b => b.email.toLowerCase() === profile.email.toLowerCase());
          setBookings(filtered);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    if (profile.email) {
      fetchBookings();
    }
  }, [profile.email]);

  const handleSave = (e) => {
    e.preventDefault();
    const savedUser = localStorage.getItem('user');
    let u = {};
    if (savedUser) {
      try {
        u = JSON.parse(savedUser);
      } catch (err) {}
    }
    const nameParts = profile.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const updatedUser = {
      ...u,
      firstName,
      lastName,
      email: profile.email,
      phone: profile.phone,
      address: profile.address
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    setSuccessMsg('Profil mis à jour avec succès !');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00d26a]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#5d3077]/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-gutter relative z-10 space-y-12">
        
        {/* Profile Card Header */}
        <div className="bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-12 glass flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left z-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00d26a] to-[#5d3077] rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-24 h-24 rounded-full border-2 border-white/20 relative z-10 object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h1 className="text-2xl lg:text-3xl font-black font-h2">{profile.name}</h1>
              </div>
              <p className="text-gray-400 text-sm">{profile.email} • Membre depuis 2025</p>

            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl w-full md:w-auto min-w-[320px] relative glass z-10">
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 md:flex-initial px-6 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${activeTab === 'settings' ? 'bg-[#00d26a] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              👤 Mes Coordonnées
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 md:flex-initial px-6 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${activeTab === 'history' ? 'bg-[#00d26a] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              📅 Historique chantiers
            </button>
          </div>

        </div>

        {/* Settings view */}
        {activeTab === 'settings' && (
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 glass max-w-4xl mx-auto space-y-8">
            <h3 className="text-2xl font-black font-h2 border-b border-white/10 pb-4">Editer mon profil</h3>
            
            {successMsg && (
              <div className="bg-[#00d26a]/15 text-[#00d26a] border border-[#00d26a]/30 p-4 rounded-xl text-center text-sm font-bold">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Nom & Prénom</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Adresse E-mail</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Téléphone</label>
                  <input 
                    type="text" 
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Adresse de facturation</label>
                  <input 
                    type="text" 
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-2xl shadow-lg shadow-[#00d26a]/20 transition-all transform hover:scale-[1.02]"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        )}

        {/* History view */}
        {activeTab === 'history' && (
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 glass max-w-4xl mx-auto space-y-8">
            <h3 className="text-2xl font-black font-h2 border-b border-white/10 pb-4">Mes Interventions</h3>
            
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Aucune intervention planifiée pour le moment.</p>
              ) : (
                bookings.map((h, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#00d26a] text-xs font-bold">{h.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${h.status === 'Planifié' ? 'bg-[#00d26a]/20 text-[#00d26a]' : 'bg-[#00d26a]/20 text-[#00d26a]'}`}>
                          {h.status}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold">{h.service}</h4>
                      <p className="text-xs text-gray-400">Prévu le : {h.date} | Volume: {h.volume}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-white">{h.price} €</span>
                      <button className="text-xs font-bold text-[#00d26a] hover:underline block mt-1">
                        📄 Voir devis
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
