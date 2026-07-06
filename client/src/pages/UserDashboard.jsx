import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [modal, setModal] = useState(null); // { type: 'success' | 'info' | 'error', title: '', message: '' }
  const [profile, setProfile] = useState({
    name: "Khalil Ben Ali",
    email: "khalil.benali@email.com",
    phone: "06 82 93 01 44",
    address: "22 Rue des Glycines, 75020 Paris"
  });

  const [reviews, setReviews] = useState([
    { id: 1, service: "Débarras Appartement", date: "15 Janvier 2026", status: "submitted", rating: 5, comment: "Parfait ! Équipe ponctuelle et efficace." }
  ]);

  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const bookings = [
    { id: "ST-8832", service: "Débarras de Maisons & Villas", date: "12 Juin 2026", volume: "35 m³", status: "Planifié", price: 1450, team: "Équipe Nord" },
    { id: "ST-8710", service: "Débarras d'Appartements & Caves", date: "15 Janvier 2026", volume: "10 m³", status: "Complété", price: 490, team: "Équipe Est" },
    { id: "ST-8604", service: "Débarras de Jardins", date: "10 Décembre 2025", volume: "15 m³", status: "Complété", price: 525, team: "Équipe Ouest" }
  ];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews(prev => [...prev, {
      id: Date.now(),
      service: "Débarras de Jardins",
      date: "Aujourd'hui",
      status: "submitted",
      rating: newReview.rating,
      comment: newReview.comment
    }]);
    setReviewSubmitted(true);
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20">
      <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 space-y-6 glass">
          <div className="space-y-2 border-b border-white/10 pb-6 text-center lg:text-left">
            <h3 className="text-xl font-black font-h2">{profile.name}</h3>
            <p className="text-[#00d26a] text-xs font-bold uppercase tracking-wider">Client Stitch Premium</p>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: 'overview', name: '📊 Tableau de bord' },
              { id: 'bookings', name: '📅 Mes Réservations' },
              { id: 'invoices', name: '🧾 Mes Factures' },
              { id: 'reviews', name: '⭐ Laisser un Avis' },
              { id: 'profile', name: '👤 Mon Profil' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setReviewSubmitted(false); }}
                className={`w-full text-left p-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-[#00d26a] text-white' : 'text-gray-300 hover:bg-white/5'}`}
              >
                {tab.name}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 text-center space-y-4">
            <p className="text-xs text-gray-400">Accès Administration de simulation :</p>
            <Link 
              to="/admin" 
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs font-black block transition-all uppercase tracking-widest"
            >
              ⚙️ Switch Admin Panel
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 glass space-y-8 min-h-[500px]">
          
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-black font-h2">Ravi de vous revoir, {profile.name.split(' ')[0]} !</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Réservations Actives</p>
                  <p className="text-3xl font-black text-[#00d26a]">1</p>
                  <p className="text-[10px] text-gray-400">Prochaine intervention le 12 Juin</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Débarrassé</p>
                  <p className="text-3xl font-black text-[#00d26a]">60 m³</p>
                  <p className="text-[10px] text-gray-400">Sur 3 chantiers cumulés</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Factures réglées</p>
                  <p className="text-3xl font-black text-[#00d26a]">2</p>
                  <p className="text-[10px] text-gray-400">1 en attente de solde final</p>
                </div>
              </div>

              {/* Next Booking Summary */}
              <div className="bg-[#00d26a]/10 border border-[#00d26a]/30 rounded-3xl p-6 space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <span className="text-xs text-[#00d26a] font-bold uppercase tracking-wider bg-[#00d26a]/20 px-3 py-1 rounded-full">Prochain Débarras</span>
                    <h4 className="text-xl font-bold mt-2">Débarras de Maisons & Villas</h4>
                    <p className="text-sm text-gray-300">Intervenant : <strong>{bookings[0].team}</strong></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">DATE & HEURE</p>
                    <p className="font-black text-[#00d26a]">12 Juin 2026 à 08:30</p>
                  </div>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Adresse : {profile.address}</span>
                  <span>Volume : {bookings[0].volume}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Bookings */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black font-h2">Mes Réservations</h2>
              
              <div className="space-y-4">
                {bookings.map((book) => (
                  <div key={book.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[#00d26a] font-black text-sm">{book.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${book.status === 'Planifié' ? 'bg-[#00d26a]/20 text-[#00d26a]' : 'bg-white/10 text-gray-400'}`}>
                          {book.status}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold">{book.service}</h4>
                      <p className="text-xs text-gray-400">Date : {book.date} | Volume : {book.volume}</p>
                    </div>
                    <div className="text-right space-y-2 w-full md:w-auto">
                      <p className="text-xl font-black text-white">{book.price} €</p>
                      <button className="text-xs font-bold text-[#00d26a] hover:underline block w-full text-left md:text-right">
                        🖨️ Télécharger l'autorisation de dépôt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Invoices */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black font-h2">Mes Factures</h2>
              
              <div className="overflow-x-auto no-scrollbar rounded-2xl border border-white/10 bg-white/5">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-xs text-gray-400 font-bold uppercase">
                      <th className="p-4">N° Facture</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Prestation</th>
                      <th className="p-4">Montant</th>
                      <th className="p-4">Statut</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {[
                      { id: "INV-2026-004", date: "15 Jan 2026", desc: "Débarras Appartement T2", price: "490 €", status: "Payé" },
                      { id: "INV-2025-098", date: "10 Déc 2025", desc: "Débarras Jardin", price: "525 €", status: "Payé" },
                      { id: "INV-2026-112", date: "En attente", desc: "Acompte Débarras Maison", price: "435 €", status: "Acompte Payé" }
                    ].map((inv, idx) => (
                      <tr key={idx} className="hover:bg-white/5">
                        <td className="p-4 font-bold text-[#00d26a]">{inv.id}</td>
                        <td className="p-4">{inv.date}</td>
                        <td className="p-4">{inv.desc}</td>
                        <td className="p-4 font-bold">{inv.price}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${inv.status === 'Payé' ? 'bg-[#00d26a]/15 text-[#00d26a]' : 'bg-yellow-400/15 text-yellow-400'}`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button className="text-xs text-purple-300 font-bold hover:underline">
                            ⬇️ PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: Submit Review */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black font-h2">Laisser un avis sur nos prestations</h2>
              
              {reviewSubmitted ? (
                <div className="bg-[#00d26a]/10 border border-[#00d26a]/30 p-6 rounded-2xl text-center space-y-4">
                  <p className="text-[#00d26a] text-3xl">✓</p>
                  <p className="font-bold text-lg">Avis publié avec succès !</p>
                  <p className="text-sm text-gray-300">Merci de contribuer à faire connaître la qualité des services Stitch.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-gray-400">Note (de 1 à 5 étoiles)</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none"
                    >
                      <option value="5" className="bg-[#1e0a2d]">⭐⭐⭐⭐⭐ Excellent</option>
                      <option value="4" className="bg-[#1e0a2d]">⭐⭐⭐⭐ Très Bon</option>
                      <option value="3" className="bg-[#1e0a2d]">⭐⭐⭐ Moyen</option>
                      <option value="2" className="bg-[#1e0a2d]">⭐⭐ Insatisfaisant</option>
                      <option value="1" className="bg-[#1e0a2d]">⭐ Mauvais</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-gray-400">Votre Commentaire</label>
                    <textarea
                      rows="4"
                      required
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Comment s'est passée l'intervention de débarras ? Les techniciens ont-ils bien nettoyé ?"
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="px-8 py-3 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-xl"
                  >
                    Publier mon avis
                  </button>
                </form>
              )}

              <div className="space-y-4 pt-6 border-t border-white/5">
                <h4 className="text-lg font-bold">Mes avis récents</h4>
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white/5 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#00d26a]">{rev.service}</span>
                      <span className="text-gray-400">{rev.date}</span>
                    </div>
                    <div className="text-yellow-400 text-sm">{"★".repeat(rev.rating)}</div>
                    <p className="text-sm text-gray-300 font-semibold">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black font-h2">Mon Profil</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Nom Complet</label>
                  <input 
                    type="text" 
                    value={profile.name} 
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Adresse E-mail</label>
                  <input 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Téléphone</label>
                  <input 
                    type="text" 
                    value={profile.phone} 
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Adresse de facturation par défaut</label>
                  <input 
                    type="text" 
                    value={profile.address} 
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#00d26a] text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setModal({ type: 'success', title: 'Profil sauvegardé', message: 'Vos modifications ont été enregistrées avec succès.' })}
                  className="px-8 py-3 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-xl transition-all cursor-pointer"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          )}

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

export default UserDashboard;
