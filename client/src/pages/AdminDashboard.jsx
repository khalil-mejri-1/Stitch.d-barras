import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [activeSubTab, setActiveSubTab] = useState('bookings');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modal, setModal] = useState(null); // { type: 'success' | 'info' | 'error' | 'confirm', title: '', message: '', onConfirm: () => void }
  const [editingBooking, setEditingBooking] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState([]);

  const [customers, setCustomers] = useState([
    { id: "C-901", name: "Khalil Ben Ali", email: "khalil.benali@email.com", bookings: 3, totalSpent: 2465, note: "Client régulier, syndic d'immeuble", rating: 4.8 },
    { id: "C-802", name: "Amélie Dupont", email: "amelie.dupont@email.com", bookings: 1, totalSpent: 490, note: "Accès difficile sans ascenseur", rating: 5.0 },
    { id: "C-703", name: "Benoit Renaud", email: "b.renaud@gmail.com", bookings: 2, totalSpent: 3500, note: "Chantier Diogène important", rating: 4.2 },
    { id: "C-604", name: "Claire Legendre", email: "c.legendre@corporation.fr", bookings: 1, totalSpent: 1200, note: "Entreprise tech, besoin de facture certifiée", rating: 4.9 }
  ]);

  const [team, setTeam] = useState([
    { id: "E-101", name: "Marc Dubreuil", role: "Chef d'Équipe (Nord)", jobs: 14, status: "Disponible", rating: 4.9 },
    { id: "E-102", name: "Jérôme Valois", role: "Technicien senior", jobs: 19, status: "En intervention", rating: 4.7 },
    { id: "E-103", name: "Stéphane Legrand", role: "Chauffeur / Manutentionnaire", jobs: 24, status: "Disponible", rating: 4.5 },
    { id: "E-104", name: "Sophia Martinez", role: "Sophia Martinez", jobs: 31, role: "Spécialiste Tri / Valorisation", status: "Congé", rating: 5.0 }
  ]);

  const [pricingSettings, setPricingSettings] = useState({
    maisonRate: 45,
    appartementRate: 50,
    caveRate: 55,
    diogeneRate: 90
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [bookingsRes, usersRes] = await Promise.all([
          fetch("http://localhost:3000/api/bookings"),
          fetch("http://localhost:3000/api/users")
        ]);
        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          setBookings(bookingsData || []);
        }
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setRegisteredUsers(usersData);
        }
      } catch (err) {
        console.error("Error loading admin data:", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    try {
      await fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleTeamChange = async (id, newTeam) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, team: newTeam } : b));
    try {
      await fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team: newTeam })
      });
    } catch (err) {
      console.error("Error updating team:", err);
    }
  };

  const handlePrintDevis = (book) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      setModal({ type: 'error', title: 'Fenêtre bloquée', message: 'Veuillez autoriser les fenêtres contextuelles (popups) pour imprimer le devis.' });
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Devis ${book.id} - ${book.customer}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            color: #1e0a2d;
            margin: 0;
            padding: 40px;
            background-color: #ffffff;
            font-size: 14px;
            line-height: 1.5;
          }
          .header {
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #00d26a;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: 800;
            color: #1e0a2d;
          }
          .logo span {
            color: #00d26a;
          }
          .devis-info {
            text-align: right;
          }
          .devis-info h1 {
            margin: 0 0 5px 0;
            font-size: 28px;
            font-weight: 800;
            color: #1e0a2d;
          }
          .devis-info p {
            margin: 2px 0;
            color: #666;
          }
          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
          }
          .details-box h3 {
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #5d3077;
          }
          .details-box p {
            margin: 4px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
          }
          th {
            background-color: #f8f9fa;
            border-bottom: 2px solid #eee;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #5d3077;
          }
          td {
            border-bottom: 1px solid #eee;
            padding: 12px;
          }
          .total-section {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 50px;
          }
          .total-table {
            width: 300px;
            margin-bottom: 0;
          }
          .total-table td {
            padding: 8px 12px;
          }
          .total-table tr.grand-total td {
            background-color: #00d26a;
            color: white;
            font-weight: 800;
            font-size: 16px;
            border-radius: 8px;
          }
          .signature-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 60px;
            page-break-inside: avoid;
          }
          .signature-box {
            border: 1px dashed #ccc;
            border-radius: 12px;
            padding: 20px;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .signature-title {
            font-weight: 600;
            color: #666;
            font-size: 12px;
          }
          .footer {
            margin-top: 60px;
            text-align: center;
            font-size: 11px;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 20px;
            page-break-inside: avoid;
          }
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">Stitch<span>.</span>débarras</div>
            <p style="margin: 5px 0 0 0; color: #666;">Services d'Économie Circulaire</p>
          </div>
          <div class="devis-info">
            <h1>DEVIS</h1>
            <p><strong>N° Référence :</strong> ${book.id}</p>
            <p><strong>Date :</strong> ${book.date || new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>

        <div class="details-grid">
          <div class="details-box">
            <h3>Prestataire</h3>
            <p><strong>Stitch Débarras SAS</strong></p>
            <p>12 Avenue de l'Éco-Citoyen</p>
            <p>75001 Paris, France</p>
            <p>Siret : 123 456 789 00012</p>
            <p>Email : contact@stitch-debarras.fr</p>
          </div>
          <div class="details-box">
            <h3>Destinataire</h3>
            <p><strong>${book.customer}</strong></p>
            <p><strong>Tél :</strong> ${book.tel || 'Non renseigné'}</p>
            <p><strong>Email :</strong> ${book.email || 'Non renseigné'}</p>
            <p><strong>Adresse d'intervention :</strong></p>
            <p>${book.address}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Désignation de la prestation</th>
              <th style="text-align: center;">Volume</th>
              <th style="text-align: right;">Prix Unitaire HT</th>
              <th style="text-align: right;">Total HT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>${book.service}</strong><br>
                <span style="font-size: 12px; color: #666;">Tri sélectif et valorisation éco-responsable des encombrants.</span>
              </td>
              <td style="text-align: center;">${book.volume || 'N/A'}</td>
              <td style="text-align: right;">${(book.price * 0.8).toFixed(2)} €</td>
              <td style="text-align: right;">${(book.price * 0.8).toFixed(2)} €</td>
            </tr>
          </tbody>
        </table>

        <div class="total-section">
          <table class="total-table">
            <tr>
              <td style="border: none;">Total HT</td>
              <td style="text-align: right; border: none;">${(book.price * 0.8).toFixed(2)} €</td>
            </tr>
            <tr>
              <td>TVA (20%)</td>
              <td style="text-align: right;">${(book.price * 0.2).toFixed(2)} €</td>
            </tr>
            <tr class="grand-total">
              <td style="border-radius: 8px 0 0 8px;">Total TTC</td>
              <td style="text-align: right; border-radius: 0 8px 8px 0;">${book.price} €</td>
            </tr>
          </table>
        </div>

        <div class="signature-section">
          <div class="signature-box">
            <span class="signature-title">Pour la société Stitch Débarras</span>
            <div style="font-size: 12px; font-weight: bold; color: #5d3077;">Bon pour accord</div>
          </div>
          <div class="signature-box">
            <span class="signature-title">Pour le Client (précédé de la mention "Bon pour accord")</span>
            <div style="font-size: 10px; color: #999;">Date et Signature</div>
          </div>
        </div>

        <div class="footer">
          <p>Stitch Débarras SAS - Capital de 10 000 € - RCS Paris 123 456 789 - Siret 123 456 789 00012</p>
          <p>Ce devis est valable pendant une durée de 30 jours à compter de sa date d'émission.</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handlePrintFacture = (book) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      setModal({ type: 'error', title: 'Fenêtre bloquée', message: 'Veuillez autoriser les fenêtres contextuelles (popups) pour imprimer la facture.' });
      return;
    }

    const priceTTC = parseFloat(book.price) || 0;
    const priceHT = priceTTC / 1.2;
    const tvaAmount = priceTTC - priceHT;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Facture ${book.id.replace('ST-', 'FC-')} - ${book.customer}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            color: #1e0a2d;
            margin: 0;
            padding: 40px;
            background-color: #ffffff;
            font-size: 14px;
            line-height: 1.5;
          }
          .header {
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #00d26a;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: 800;
            color: #1e0a2d;
          }
          .logo span {
            color: #00d26a;
          }
          .facture-info {
            text-align: right;
          }
          .facture-info h1 {
            margin: 0 0 5px 0;
            font-size: 28px;
            font-weight: 800;
            color: #1e0a2d;
          }
          .facture-info p {
            margin: 2px 0;
            color: #666;
          }
          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
          }
          .details-box h3 {
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #5d3077;
          }
          .details-box p {
            margin: 4px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
          }
          th {
            background-color: #f8f9fa;
            border-bottom: 2px solid #eee;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #5d3077;
          }
          td {
            border-bottom: 1px solid #eee;
            padding: 12px;
          }
          .total-section {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 50px;
          }
          .total-table {
            width: 300px;
            margin-bottom: 0;
          }
          .total-table td {
            padding: 8px 12px;
          }
          .total-table tr.grand-total td {
            background-color: #00d26a;
            color: white;
            font-weight: 800;
            font-size: 16px;
            border-radius: 8px;
          }
          .signature-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 60px;
            page-break-inside: avoid;
          }
          .signature-box {
            border: 1px dashed #ccc;
            border-radius: 12px;
            padding: 20px;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .signature-title {
            font-weight: 600;
            color: #666;
            font-size: 12px;
          }
          .footer {
            margin-top: 60px;
            text-align: center;
            font-size: 11px;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 20px;
            page-break-inside: avoid;
          }
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">Stitch<span>.</span>débarras</div>
            <p style="margin: 5px 0 0 0; color: #666;">Services d'Économie Circulaire</p>
          </div>
          <div class="facture-info">
            <h1>FACTURE</h1>
            <p><strong>N° Facture :</strong> ${book.id.replace('ST-', 'FC-')}</p>
            <p><strong>Date d'émission :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
            <p><strong>Réf Devis :</strong> ${book.id}</p>
          </div>
        </div>

        <div class="details-grid">
          <div class="details-box">
            <h3>Prestataire</h3>
            <p><strong>Stitch Débarras SAS</strong></p>
            <p>12 Avenue de l'Éco-Citoyen</p>
            <p>75001 Paris, France</p>
            <p>Siret : 123 456 789 00012</p>
            <p>Email : contact@stitch-debarras.fr</p>
          </div>
          <div class="details-box">
            <h3>Facturé à</h3>
            <p><strong>${book.customer}</strong></p>
            <p><strong>Tél :</strong> ${book.tel || 'Non renseigné'}</p>
            <p><strong>Email :</strong> ${book.email || 'Non renseigné'}</p>
            <p><strong>Adresse de prestation :</strong></p>
            <p>${book.address}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description de la prestation</th>
              <th style="text-align: center;">Volume</th>
              <th style="text-align: right;">Prix Unitaire HT</th>
              <th style="text-align: right;">Total HT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Prestation de Débarras Éco-responsable</strong><br>
                <span style="font-size: 12px; color: #666;">${book.service} avec tri, recyclage et valorisation des biens.</span>
              </td>
              <td style="text-align: center;">${book.volume || 'N/A'}</td>
              <td style="text-align: right;">${priceHT.toFixed(2)} €</td>
              <td style="text-align: right;">${priceHT.toFixed(2)} €</td>
            </tr>
          </tbody>
        </table>

        <div class="total-section">
          <table class="total-table">
            <tr>
              <td style="border: none;">Total HT</td>
              <td style="text-align: right; border: none;">${priceHT.toFixed(2)} €</td>
            </tr>
            <tr>
              <td>TVA (20%)</td>
              <td style="text-align: right;">${tvaAmount.toFixed(2)} €</td>
            </tr>
            <tr class="grand-total">
              <td style="border-radius: 8px 0 0 8px;">Total TTC</td>
              <td style="text-align: right; border-radius: 0 8px 8px 0;">${priceTTC.toFixed(2)} €</td>
            </tr>
          </table>
        </div>

        <div class="signature-section">
          <div class="signature-box" style="border: none; background-color: #f8f9fa;">
            <span class="signature-title">Mode de Règlement</span>
            <p style="font-weight: bold; margin-top: 10px;">${book.paymentMethod || 'Carte Bancaire / Virement'}</p>
            <p style="font-size: 11px; color: #666;">Facture payée le ${book.date || new Date().toLocaleDateString('fr-FR')}</p>
          </div>
          <div class="signature-box" style="border: none; background-color: #f8f9fa; justify-content: center; align-items: center;">
            <div style="font-size: 18px; font-weight: 800; color: #00d26a; border: 3px double #00d26a; padding: 10px 20px; transform: rotate(-5deg); border-radius: 8px;">
              FACTURE PAYÉE
            </div>
          </div>
        </div>

        <div class="footer">
          <p>Stitch Débarras SAS - Capital de 10 000 € - RCS Paris 123 456 789 - Siret 123 456 789 00012</p>
          <p>Merci pour votre confiance et votre geste pour l'environnement !</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleToggleUserRole = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      const response = await fetch(`http://localhost:3000/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, role: newRole })
      });
      if (response.ok) {
        setRegisteredUsers(prev => prev.map(u => u._id === user._id ? { ...u, role: newRole } : u));
        setModal({ type: 'success', title: 'Rôle mis à jour', message: `Le rôle de ${user.firstName} a été changé en ${newRole === 'admin' ? 'Administrateur' : 'Utilisateur'}.` });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setRegisteredUsers(prev => prev.filter(u => u._id !== userId));
        setModal({ type: 'success', title: 'Utilisateur supprimé', message: `Le compte de ${userName} a été supprimé avec succès.` });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20 animate-pulse">
        <div className="max-w-[1536px] w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 space-y-6 glass">
            <div className="space-y-2 border-b border-white/10 pb-6">
              <div className="h-6 w-3/4 bg-white/10 rounded-xl"></div>
              <div className="h-3 w-1/2 bg-white/5 rounded-lg"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-12 w-full bg-white/5 rounded-2xl"></div>
              ))}
            </div>
          </div>

          {/* Content Area Skeleton */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 glass space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
              <div className="space-y-2">
                <div className="h-8 w-64 bg-white/10 rounded-2xl"></div>
                <div className="h-4 w-96 bg-white/5 rounded-lg"></div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-16 bg-white/5 rounded-xl"></div>
                <div className="h-12 w-20 bg-white/5 rounded-xl"></div>
                <div className="h-12 w-24 bg-white/5 rounded-xl"></div>
              </div>
            </div>

            {/* Filter controls skeleton */}
            <div className="h-16 w-full bg-white/5 border border-white/10 rounded-2xl"></div>

            {/* Card Items Skeletons */}
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-1">
                      <div className="h-4 w-16 bg-white/10 rounded-lg"></div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <div className="space-y-1.5 flex-1">
                          <div className="h-4 w-24 bg-white/10 rounded-lg"></div>
                          <div className="h-3 w-20 bg-white/5 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/10 rounded-lg"></div>
                        <div className="space-y-1.5 flex-1">
                          <div className="h-4 w-32 bg-white/10 rounded-lg"></div>
                          <div className="h-3 w-16 bg-white/5 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-6 flex justify-end gap-3">
                      <div className="h-10 w-24 bg-white/10 rounded-2xl"></div>
                      <div className="h-10 w-24 bg-white/10 rounded-2xl"></div>
                      <div className="h-10 w-24 bg-white/10 rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#1e0a2d] text-white pt-32 pb-20">
      <div className="max-w-[1536px] w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Admin Navigation Sidebar */}
        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 space-y-6 glass">
          <div className="space-y-1 border-b border-white/10 pb-6 text-center lg:text-left">
            <h3 className="text-xl font-black font-h2 text-red-400">Panel Admin</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Superviseur Stitch</p>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { 
                id: 'overview', 
                name: 'Aperçu Général', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
                  </svg>
                )
              },
              { 
                id: 'bookings', 
                name: 'Gestion des Commandes', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              },
              { 
                id: 'customers', 
                name: 'Gérer Clients', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.956 11.956 0 0112 20.25a11.956 11.956 0 01-3-1.013v-.109c0-1.112-.285-2.16-.786-3.07M7 10.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zM1.494 17.53A4.125 4.125 0 015.75 14.25c.9 0 1.747.288 2.44.78M12 21a9.04 9.04 0 003-3.87M3 9a2 2 0 114 0 2 2 0 01-4 0z" />
                  </svg>
                )
              },
              { 
                id: 'team', 
                name: 'Gérer Équipes', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091.58.041 1.17-.14 1.743L3.06 17.25a3 3 0 00-4.242 4.242l6.364-6.364" />
                  </svg>
                )
              },
              { 
                id: 'pricing', 
                name: 'Services & Tarifs', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              },
              { 
                id: 'stats', 
                name: 'Rapports Financiers', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                )
              }
            ].map(tab => {
              const isLocked = tab.id !== 'bookings' && tab.id !== 'customers';
              return (
                <button
                  key={tab.id}
                  disabled={isLocked}
                  onClick={() => !isLocked && setActiveSubTab(tab.id)}
                  className={`w-full text-left p-3.5 rounded-2xl text-sm font-bold transition-all flex items-center justify-between ${
                    activeSubTab === tab.id 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                      : isLocked
                        ? 'text-gray-550 opacity-40 cursor-not-allowed'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </div>
                  {isLocked && <span className="text-[10px] text-gray-500">🔒</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 glass space-y-8 min-h-[550px]">
          
          {/* Subtab 1: Overview */}
          {activeSubTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-black font-h2">Aperçu de l'Activité</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Chiffre d'Affaires Mensuel</p>
                  <p className="text-3xl font-black text-[#00d26a]">14 850 €</p>
                  <p className="text-[10px] text-[#00d26a] font-bold">↑ +18% vs le mois dernier</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Métrage Débarrassé</p>
                  <p className="text-3xl font-black text-purple-350">340 m³</p>
                  <p className="text-[10px] text-gray-400">92% valorisé & donné</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Chantiers Actifs</p>
                  <p className="text-3xl font-black text-yellow-450">4 Planifiés</p>
                  <p className="text-[10px] text-gray-400">Cette semaine</p>
                </div>
              </div>

              {/* Feed of incoming bookings */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold font-h2">Dernières réservations reçues</h4>
                <div className="divide-y divide-white/5">
                  {bookings.slice(0, 3).map((book) => (
                    <div key={book.id} className="py-4 flex justify-between items-center text-sm">
                      <div>
                        <span className="font-bold text-[#00d26a]">{book.id}</span> | <span className="font-semibold">{book.customer}</span>
                        <p className="text-xs text-gray-400">{book.service} | volume: {book.volume}</p>
                      </div>
                      <span className="font-black text-white">{book.price} €</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Subtab 2: Manage Bookings */}
          {activeSubTab === 'bookings' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-3xl font-black font-h2 flex items-center gap-2">
                    <span className="text-[#00d26a]">⚙️</span> Gestion des Commandes
                  </h2>
                  <p className="text-sm text-gray-400">Supervisez, planifiez et assignez les interventions de débarras en temps réel.</p>
                </div>
                
                {/* Stats quick view */}
                <div className="flex gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
                    <span className="block text-[10px] text-gray-400 uppercase font-black">Total</span>
                    <span className="text-lg font-bold text-white">{bookings.length}</span>
                  </div>
                  <div className="bg-[#00d26a]/15 border border-[#00d26a]/30 rounded-xl px-4 py-2 text-center">
                    <span className="block text-[10px] text-[#00d26a] uppercase font-black">Actifs</span>
                    <span className="text-lg font-bold text-[#00d26a]">
                      {bookings.filter(b => b.status !== 'Complété' && b.status !== 'Annulé').length}
                    </span>
                  </div>
                  <div className="bg-purple-500/15 border border-purple-500/30 rounded-xl px-4 py-2 text-center">
                    <span className="block text-[10px] text-purple-300 uppercase font-black">Complétés</span>
                    <span className="text-lg font-bold text-purple-350">
                      {bookings.filter(b => b.status === 'Complété').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Filters & Search Control Bar */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl">
                {/* Search */}
                <div className="relative w-full md:w-72">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Rechercher client, ID ou service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[#1e0a2d] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00d26a] transition-all"
                  />
                </div>

                {/* Filter Statuses */}
                <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
                  {['All', 'Planifié', 'En cours', 'Complété', 'Annulé'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        statusFilter === status 
                          ? 'bg-[#00d26a] text-white shadow-lg shadow-[#00d26a]/25' 
                          : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {status === 'All' ? 'Tous' : status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Command List Grid */}
              <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-gray-400">Aucune commande ne correspond à votre recherche.</p>
                  </div>
                ) : (
                  filteredBookings.map((book) => (
                    <div 
                      key={book.id} 
                      className={`relative group border rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden ${
                        book.isPro 
                          ? 'bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border-purple-500/35 hover:border-purple-500/60 shadow-[0_0_25px_rgba(139,92,246,0.08)]' 
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Top background glow for status */}
                      <div className={`absolute top-0 right-0 w-32 h-16 blur-3xl opacity-10 rounded-full pointer-events-none ${
                        book.status === 'Planifié' ? 'bg-blue-500' :
                        book.status === 'En cours' ? 'bg-yellow-500' :
                        book.status === 'Complété' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        {/* ID & Date */}
                        <div className="lg:col-span-1 col-span-12 flex flex-row lg:flex-col items-center lg:items-start gap-2">
                          <span className="block text-xs text-gray-400 font-bold">{book.date}</span>
                          {book.isPro && (
                            <span className="px-2 py-0.5 rounded bg-purple-650/40 text-purple-300 border border-purple-500/30 text-[9px] font-black uppercase tracking-wider">
                              PRO 🏭
                            </span>
                          )}
                        </div>

                        {/* Customer & Info */}
                        <div className="lg:col-span-2 col-span-12 text-left">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5d3077] to-[#00d26a] flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {book.customer.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <span className="font-bold block text-sm">{book.customer}</span>
                              <span className="text-xs text-gray-400 block">{book.tel}</span>
                            </div>
                          </div>
                        </div>

                        {/* Service details */}
                        <div className="lg:col-span-3 col-span-12 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {book.service.includes('Maison') ? '🏠' : 
                               book.service.includes('Appartement') ? '🏢' : 
                               book.service.includes('Cave') ? '📦' : '☣️'}
                            </span>
                            <div>
                              <span className="font-bold text-xs text-white block">{book.service}</span>
                              <span className="text-xs text-[#00d26a] font-bold block">{book.volume} à vider</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400 block mt-1 truncate max-w-[200px]" title={book.address}>
                            📍 {book.address}
                          </span>
                        </div>

                        {/* Price & Action Buttons */}
                        <div className="lg:col-span-6 col-span-12 flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-3 text-right">
                          <div className="text-left lg:text-right mr-2 flex-shrink-0">
                            <span className="block text-[10px] text-gray-400 uppercase font-black">Montant</span>
                            <span className="text-base font-black text-white">{book.price} €</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 flex-shrink-0 w-full sm:w-auto">
                            {/* Modifier */}
                            <button 
                              onClick={() => setEditingBooking(book)}
                              className="group/btn inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-blue-500/5 hover:bg-blue-500/15 text-blue-300 hover:text-blue-100 border border-blue-500/20 hover:border-blue-500/50 text-xs font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-[0_4px_12px_rgba(59,130,246,0.05)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] w-full"
                              title="Modifier Devis"
                            >
                              <svg className="w-3.5 h-3.5 transform group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                              </svg>
                              <span>Modifier</span>
                            </button>
 
                            {/* Imprimer */}
                            <button 
                              onClick={() => handlePrintDevis(book)}
                              className="group/btn inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-purple-500/5 hover:bg-purple-500/15 text-purple-300 hover:text-purple-100 border border-purple-500/20 hover:border-purple-500/50 text-xs font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-[0_4px_12px_rgba(147,51,234,0.05)] hover:shadow-[0_4px_20px_rgba(147,51,234,0.25)] w-full"
                              title="Imprimer Devis"
                            >
                              <svg className="w-3.5 h-3.5 transform group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5V1.5h-5.25v6.75h-1.5A3.375 3.375 0 004.5 11.625v2.625M19.5 14.25a2.25 2.25 0 002.25-2.25v-3a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 9v3a2.25 2.25 0 002.25 2.25M19.5 14.25v3a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 17.25v-3m12 0v3.75m-9-3.75v3.75m3-3.75h3" />
                              </svg>
                              <span>Imprimer</span>
                            </button>
 
                            {/* Convertir */}
                            <button 
                              onClick={() => {
                                handlePrintFacture(book);
                                setModal({ type: 'success', title: 'Facturation réussie', message: `Le devis de ${book.customer} a bien été converti en facture avec calcul de la TVA 20%.` });
                              }}
                              className="group/btn inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-300 hover:text-emerald-100 border border-emerald-500/20 hover:border-emerald-500/50 text-xs font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-[0_4px_12px_rgba(16,185,129,0.05)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.25)] w-full"
                              title="Convertir en Facture"
                            >
                              <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Convertir</span>
                            </button>
 
                            {/* Supprimer */}
                            <button 
                              onClick={() => setModal({
                                type: 'confirm',
                                title: 'Confirmation de suppression',
                                message: `Voulez-vous vraiment supprimer le devis de ${book.customer} ?`,
                                onConfirm: async () => {
                                  try {
                                    const response = await fetch(`http://localhost:3000/api/bookings/${book.id}`, {
                                      method: 'DELETE'
                                    });
                                    if (response.ok || response.status === 404) {
                                      setBookings(prev => prev.filter(b => b.id !== book.id));
                                      setModal({ 
                                        type: 'success', 
                                        title: 'Succès', 
                                        message: response.status === 404 
                                          ? 'La réservation locale/simulée a été retirée avec succès.' 
                                          : 'La réservation a été supprimée de la base de données avec succès.' 
                                      });
                                    } else {
                                      throw new Error();
                                    }
                                  } catch (err) {
                                    setModal({ type: 'error', title: 'Erreur', message: 'Impossible de supprimer la réservation.' });
                                  }
                                }
                              })}
                              className="group/btn inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-red-500/5 hover:bg-red-500/15 text-red-300 hover:text-red-100 border border-red-500/20 hover:border-red-500/50 text-xs font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-[0_4px_12px_rgba(239,68,68,0.05)] hover:shadow-[0_4px_20px_rgba(239,68,68,0.25)] w-full"
                              title="Supprimer Devis"
                            >
                              <svg className="w-3.5 h-3.5 transform group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-1.5 12a2.25 2.25 0 01-2.25 2.25H8.25A2.25 2.25 0 016 20.25l-1.5-12m15 0h-18" />
                              </svg>
                              <span>Supprimer</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer (Only Details Button) */}
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedBooking(book)}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-[#00d26a]/15 text-gray-300 hover:text-[#00d26a] border border-white/10 hover:border-[#00d26a]/30 text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_15px_rgba(0,210,106,0.1)] group/btn cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5 transform group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Détails Fiche</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Subtab 3: Manage Customers */}
          {activeSubTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-3xl font-black font-h2">Gestion des Comptes Clients</h2>
                  <p className="text-sm text-gray-400">Gérez les comptes enregistrés sur le site, modifiez leurs rôles ou supprimez les accès.</p>
                </div>
                <div className="bg-[#00d26a]/15 border border-[#00d26a]/30 rounded-xl px-4 py-2 text-center">
                  <span className="block text-[10px] text-[#00d26a] uppercase font-black font-bold">Utilisateurs</span>
                  <span className="text-lg font-bold text-[#00d26a]">{registeredUsers.length}</span>
                </div>
              </div>
              
              <div className="overflow-x-auto no-scrollbar rounded-2xl border border-white/10 bg-white/5">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-gray-400 font-bold uppercase">
                      <th className="p-4">Utilisateur</th>
                      <th className="p-4">Adresse Email</th>
                      <th className="p-4 text-center">Rôle Actuel</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {registeredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-gray-500">Aucun utilisateur enregistré.</td>
                      </tr>
                    ) : (
                      registeredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-white/5 transition-all">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5d3077] to-[#00d26a] flex items-center justify-center font-bold text-xs">
                                {`${user.firstName || ''} ${user.lastName || ''}`.trim().split(' ').map(n => n[0]).join('') || '?'}
                              </div>
                              <span className="font-bold text-white text-sm">
                                {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Sans nom'}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-400">{user.email}</td>
                          <td className="p-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                              user.role === 'admin' 
                                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' 
                                : 'bg-[#00d26a]/15 text-[#00d26a] border border-[#00d26a]/30'
                            }`}>
                              {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex gap-2 justify-end">
                              {/* Change Role Button */}
                              <button
                                onClick={() => handleToggleUserRole(user)}
                                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                  user.role === 'admin'
                                    ? 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 border-orange-500/20 hover:border-orange-500/40'
                                    : 'bg-purple-650/20 hover:bg-purple-600/30 text-purple-300 border-purple-500/25 hover:border-purple-500/50'
                                }`}
                              >
                                {user.role === 'admin' ? 'Retirer Admin' : 'Rendre Admin'}
                              </button>

                              {/* Edit Button */}
                              <button
                                onClick={() => setEditingUser(user)}
                                className="px-3 py-1.5 bg-blue-500/5 hover:bg-blue-500/15 text-blue-300 hover:text-blue-100 border border-blue-500/20 hover:border-blue-500/40 rounded-xl text-xs font-bold transition-all cursor-pointer"
                              >
                                Modifier
                              </button>

                              {/* Delete Button */}
                              <button
                                onClick={() => setModal({
                                  type: 'confirm',
                                  title: 'Supprimer le compte',
                                  message: `Voulez-vous vraiment supprimer définitivement le compte de ${user.firstName} ${user.lastName} ? Cette action est irréversible.`,
                                  onConfirm: () => handleDeleteUser(user._id, `${user.firstName} ${user.lastName}`)
                                })}
                                className="px-3 py-1.5 bg-red-500/5 hover:bg-red-500/15 text-red-300 hover:text-red-100 border border-red-500/20 hover:border-red-500/40 rounded-xl text-xs font-bold transition-all cursor-pointer"
                              >
                                Supprimer
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subtab 4: Manage Team */}
          {activeSubTab === 'team' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black font-h2">Gestion de l'Équipe Terrain</h2>
              
              <div className="overflow-x-auto no-scrollbar rounded-2xl border border-white/10 bg-white/5">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-gray-400 font-bold uppercase">
                      <th className="p-4">ID Équipier</th>
                      <th className="p-4">Nom</th>
                      <th className="p-4">Rôle</th>
                      <th className="p-4 text-center">Missions réalisées</th>
                      <th className="p-4 text-center">Score performance</th>
                      <th className="p-4 text-center">Statut Actuel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {team.map((emp) => (
                      <tr key={emp.id} className="hover:bg-white/5">
                        <td className="p-4 font-bold text-gray-400">{emp.id}</td>
                        <td className="p-4 font-bold">{emp.name}</td>
                        <td className="p-4">{emp.role}</td>
                        <td className="p-4 text-center font-bold">{emp.jobs}</td>
                        <td className="p-4 text-center text-yellow-400 font-black">⭐ {emp.rating} / 5</td>
                        <td className="p-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${emp.status === 'Disponible' ? 'bg-[#00d26a]/15 text-[#00d26a]' : emp.status === 'Congé' ? 'bg-red-400/15 text-red-400' : 'bg-yellow-400/15 text-yellow-400'}`}>
                            {emp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subtab 5: Services & Prices */}
          {activeSubTab === 'pricing' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black font-h2">Services & Configuration des Tarifs</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                <h4 className="text-lg font-bold font-h2 text-[#00d26a]">Modifier le prix par m³ (mètre cube)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold">Maison standard (EUR / m³)</label>
                    <input 
                      type="number" 
                      value={pricingSettings.maisonRate}
                      onChange={(e) => setPricingSettings(prev => ({ ...prev, maisonRate: parseInt(e.target.value) }))}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold">Appartement urbain (EUR / m³)</label>
                    <input 
                      type="number" 
                      value={pricingSettings.appartementRate}
                      onChange={(e) => setPricingSettings(prev => ({ ...prev, appartementRate: parseInt(e.target.value) }))}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold">Caves & Box (EUR / m³)</label>
                    <input 
                      type="number" 
                      value={pricingSettings.caveRate}
                      onChange={(e) => setPricingSettings(prev => ({ ...prev, caveRate: parseInt(e.target.value) }))}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-bold">Nettoyage Extrême / Diogène (EUR / m³)</label>
                    <input 
                      type="number" 
                      value={pricingSettings.diogeneRate}
                      onChange={(e) => setPricingSettings(prev => ({ ...prev, diogeneRate: parseInt(e.target.value) }))}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setModal({ type: 'success', title: 'Tarifs mis à jour', message: 'Grille tarifaire mise à jour avec succès !' })}
                  className="px-8 py-3 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-xl transition-all cursor-pointer"
                >
                  Enregistrer la grille tarifaire
                </button>
              </div>
            </div>
          )}

          {/* Subtab 6: Financial Reports */}
          {activeSubTab === 'stats' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black font-h2">Rapports & Statistiques Financières</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                <h4 className="text-lg font-bold">Graphique de chiffre d'affaires (Chantier par mois)</h4>
                
                {/* CSS Bar Chart Simulation */}
                <div className="h-64 flex items-end justify-around border-b border-l border-white/10 pb-2 pl-2">
                  {[
                    { month: 'Jan', val: 75, sum: '9 400€' },
                    { month: 'Fév', val: 80, sum: '10 100€' },
                    { month: 'Mar', val: 65, sum: '8 200€' },
                    { month: 'Avr', val: 95, sum: '12 800€' },
                    { month: 'Mai', val: 120, sum: '14 850€' },
                    { month: 'Juin', val: 140, sum: '18 200€' }
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center w-12 group cursor-pointer">
                      <span className="text-[9px] text-[#00d26a] opacity-0 group-hover:opacity-100 transition-opacity font-bold mb-1">{bar.sum}</span>
                      <div 
                        style={{ height: `${bar.val}px` }}
                        className="w-8 bg-gradient-to-t from-[#5d3077] to-[#00d26a] rounded-t-lg group-hover:to-[#00ff80] transition-all"
                      ></div>
                      <span className="text-[10px] text-gray-400 mt-2 font-bold">{bar.month}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 text-center font-semibold">Simulation du CA Stitch 1er semestre 2026. Survolez les barres pour afficher le total.</p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Modal for Booking Details */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/65 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedBooking(null)}
          ></div>
          
          {/* Modal Card */}
          <div className="relative w-full max-w-2xl bg-[#261038] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl glass max-h-[90vh] overflow-y-auto z-10 animate-reveal">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-6">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black block mb-1">Fiche d'intervention</span>
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  Commande {selectedBooking.id}
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                    selectedBooking.status === 'Planifié' ? 'bg-blue-500/10 text-blue-450 border-blue-500/30' :
                    selectedBooking.status === 'En cours' ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' :
                    selectedBooking.status === 'Complété' ? 'bg-green-500/10 text-[#00d26a] border-green-500/30' :
                    'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}>
                    {selectedBooking.status}
                  </span>
                </h3>
              </div>
              
              <button 
                onClick={() => setSelectedBooking(null)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center border border-white/10 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content Sections */}
            <div className="space-y-6">
              {/* Customer */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
                <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Informations Client</h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5d3077] to-[#00d26a] flex items-center justify-center font-bold text-base text-white">
                    {selectedBooking.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="space-y-1">
                    <span className="text-base font-bold text-white block">{selectedBooking.customer}</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-300">
                      <span>📞 {selectedBooking.tel}</span>
                      <span>✉️ client@email.com</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Service Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Prestation Demandée</h4>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-lg">
                      {selectedBooking.service.includes('Maison') ? '🏠' : 
                       selectedBooking.service.includes('Appartement') ? '🏢' : 
                       selectedBooking.service.includes('Cave') ? '📦' : '☣️'}
                    </span>
                    {selectedBooking.service}
                  </p>
                  <p className="text-xs text-gray-300">Volume estimé : <strong className="text-[#00d26a]">{selectedBooking.volume}</strong></p>
                  <p className="text-xs text-gray-300">Date planifiée : <strong>{selectedBooking.date}</strong></p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Lieu de l'intervention</h4>
                  <p className="text-xs text-white leading-relaxed">
                    📍 {selectedBooking.address}
                  </p>
                  <p className="text-[10px] text-gray-400">Accès : Standard avec stationnement disponible</p>
                </div>
              </div>
              
              {/* Operational & Financial */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Opérations & Logistique</h4>
                  <p className="text-xs text-white">
                    Équipe désignée : <strong>{selectedBooking.team}</strong>
                  </p>
                  <p className="text-xs text-gray-300">
                    Statut actuel : <span className="text-[#00d26a] font-bold">{selectedBooking.status}</span>
                  </p>
                </div>
                
                <div className="bg-white/5 border border-[#00d26a]/30 rounded-2xl p-5 space-y-2 bg-[#00d26a]/5">
                  <h4 className="text-xs text-[#00d26a] font-bold uppercase tracking-wider">Facturation & Devis</h4>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-xs text-gray-300">Montant Total HT</span>
                    <span className="text-xl font-black text-white">{selectedBooking.price} €</span>
                  </div>
                  <p className="text-[9px] text-gray-400">Facture certifiée émise après intervention et recyclage.</p>
                </div>
              </div>
            </div>
            
            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 border-t border-white/10 pt-6 mt-8">
              <button 
                onClick={() => setSelectedBooking(null)}
                className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold border border-white/10 transition-all cursor-pointer"
              >
                Fermer
              </button>
              <button 
                onClick={() => handlePrintDevis(selectedBooking)}
                className="px-6 py-2.5 rounded-xl bg-[#00d26a] hover:bg-[#00b058] text-xs font-black text-white transition-all shadow-[0_0_15px_rgba(0,210,106,0.2)] cursor-pointer"
              >
                🖨️ Imprimer Bon
              </button>
            </div>
            
          </div>
        </div>
      )}
      {/* Editing Booking Modal */}
      {editingBooking && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
          <div className="bg-gradient-to-br from-[#1e0a2d] to-[#3a1555] border border-white/10 rounded-[2.5rem] p-8 max-w-2xl w-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden glass my-8">
            <h3 className="text-2xl font-black font-h2 text-white mb-6 border-b border-white/10 pb-4">
              Modifier le Devis {editingBooking.id}
            </h3>

            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const response = await fetch(`http://localhost:3000/api/bookings/${editingBooking.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingBooking)
                });
                if (response.ok) {
                  setBookings(prev => prev.map(b => b.id === editingBooking.id ? editingBooking : b));
                  setEditingBooking(null);
                  setModal({ type: 'success', title: 'Succès', message: 'Le devis a été mis à jour avec succès.' });
                } else {
                  throw new Error();
                }
              } catch (err) {
                setModal({ type: 'error', title: 'Erreur', message: 'Impossible de mettre à jour le devis.' });
              }
            }} className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Nom du Client</label>
                  <input 
                    type="text" 
                    value={editingBooking.customer} 
                    onChange={e => setEditingBooking(prev => ({ ...prev, customer: e.target.value }))}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Téléphone</label>
                  <input 
                    type="text" 
                    value={editingBooking.tel} 
                    onChange={e => setEditingBooking(prev => ({ ...prev, tel: e.target.value }))}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Adresse E-mail</label>
                  <input 
                    type="email" 
                    value={editingBooking.email} 
                    onChange={e => setEditingBooking(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Service</label>
                  <select 
                    value={editingBooking.service} 
                    onChange={e => setEditingBooking(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  >
                    <option value="Débarras de Maisons & Villas" className="bg-[#1e0a2d]">Débarras de Maisons & Villas</option>
                    <option value="Débarras d'Appartements & Caves" className="bg-[#1e0a2d]">Débarras d'Appartements & Caves</option>
                    <option value="Débarras de Bureaux & Locaux" className="bg-[#1e0a2d]">Débarras de Bureaux & Locaux</option>
                    <option value="Débarras de Jardins & Espaces Extérieurs" className="bg-[#1e0a2d]">Débarras de Jardins & Espaces Extérieurs</option>
                    <option value="Nettoyage Spécialisé & Diogène" className="bg-[#1e0a2d]">Nettoyage Spécialisé & Diogène</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Volume (m³)</label>
                  <input 
                    type="text" 
                    value={editingBooking.volume} 
                    onChange={e => setEditingBooking(prev => ({ ...prev, volume: e.target.value }))}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Prix (€)</label>
                  <input 
                    type="number" 
                    value={editingBooking.price} 
                    onChange={e => setEditingBooking(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Date</label>
                  <input 
                    type="date" 
                    value={editingBooking.date} 
                    onChange={e => setEditingBooking(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Adresse d'intervention</label>
                  <input 
                    type="text" 
                    value={editingBooking.address} 
                    onChange={e => setEditingBooking(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Statut</label>
                  <select 
                    value={editingBooking.status} 
                    onChange={e => setEditingBooking(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  >
                    <option value="Planifié" className="bg-[#1e0a2d]">Planifié</option>
                    <option value="En cours" className="bg-[#1e0a2d]">En cours</option>
                    <option value="Complété" className="bg-[#1e0a2d]">Complété</option>
                    <option value="Annulé" className="bg-[#1e0a2d]">Annulé</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Équipe assignée</label>
                  <select 
                    value={editingBooking.team} 
                    onChange={e => setEditingBooking(prev => ({ ...prev, team: e.target.value }))}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  >
                    <option value="Non assignée" className="bg-[#1e0a2d]">Non assignée</option>
                    <option value="Équipe Ouest" className="bg-[#1e0a2d]">Équipe Ouest</option>
                    <option value="Équipe Est" className="bg-[#1e0a2d]">Équipe Est</option>
                    <option value="Équipe Nord" className="bg-[#1e0a2d]">Équipe Nord</option>
                    <option value="Équipe Sud" className="bg-[#1e0a2d]">Équipe Sud</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  Enregistrer les modifications
                </button>
                <button
                  type="button"
                  onClick={() => setEditingBooking(null)}
                  className="flex-1 py-3.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Editing User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
          <div className="bg-gradient-to-br from-[#1e0a2d] to-[#3a1555] border border-white/10 rounded-[2.5rem] p-8 max-w-md w-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden glass my-8">
            <h3 className="text-2xl font-black font-h2 text-white mb-6 border-b border-white/10 pb-4 text-center">
              Modifier l'Utilisateur
            </h3>

            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const response = await fetch(`http://localhost:3000/api/users/${editingUser._id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingUser)
                });
                if (response.ok) {
                  setRegisteredUsers(prev => prev.map(u => u._id === editingUser._id ? editingUser : u));
                  setEditingUser(null);
                  setModal({ type: 'success', title: 'Succès', message: 'Le compte utilisateur a été mis à jour avec succès.' });
                } else {
                  throw new Error();
                }
              } catch (err) {
                setModal({ type: 'error', title: 'Erreur', message: 'Impossible de mettre à jour le compte.' });
              }
            }} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase">Prénom</label>
                <input 
                  type="text" 
                  value={editingUser.firstName} 
                  onChange={e => setEditingUser(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase">Nom de Famille</label>
                <input 
                  type="text" 
                  value={editingUser.lastName} 
                  onChange={e => setEditingUser(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase">Adresse E-mail</label>
                <input 
                  type="email" 
                  value={editingUser.email} 
                  onChange={e => setEditingUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d26a] text-sm"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#00d26a] hover:bg-[#00b058] text-white font-black rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-3.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Professional Modal */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-gradient-to-br from-[#1e0a2d] to-[#3a1555] border border-white/10 rounded-[2.5rem] p-8 max-w-md w-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] text-center relative overflow-hidden glass">
            {/* Glowing background blob inside modal */}
            <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full blur-2xl opacity-20 ${modal.type === 'error' ? 'bg-red-500' : modal.type === 'confirm' ? 'bg-yellow-500' : 'bg-[#00d26a]'}`}></div>
            
            {/* Icon */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold ${
              modal.type === 'error' 
                ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                : modal.type === 'confirm'
                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                : 'bg-[#00d26a]/10 text-[#00d26a] border border-[#00d26a]/20'
            }`}>
              {modal.type === 'error' ? '✕' : modal.type === 'confirm' ? '⚠' : modal.type === 'success' ? '✓' : 'ℹ'}
            </div>

            <h3 className="text-xl font-black font-h2 text-white mb-2">{modal.title}</h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">{modal.message}</p>
            
            <div className="flex gap-4">
              {modal.onConfirm ? (
                <>
                  <button
                    onClick={() => {
                      modal.onConfirm();
                      setModal(null);
                    }}
                    className="flex-1 py-3 bg-red-650 hover:bg-red-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={() => setModal(null)}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setModal(null)}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white font-bold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                >
                  Fermer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
