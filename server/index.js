const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
if (!MONGODB_URI || MONGODB_URI.includes("<db_password>")) {
  console.warn("⚠️ Warning: MONGODB_URI is not set or still contains <db_password> in server/.env");
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("🔌 Connected to MongoDB successfully!"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

// User Schema & Model
const userSchema = new mongoose.Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" } // "user" or "admin"
});
const User = mongoose.model("User", userSchema);

const bookingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  service: { type: String, required: true },
  volume: { type: String, required: true },
  cleaningExtra: { type: Boolean, default: false },
  donationSorting: { type: Boolean, default: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "Planifié" },
  team: { type: String, default: "Non assignée" },
  isPro: { type: Boolean, default: false }
});
const Booking = mongoose.model("Booking", bookingSchema);

// Homepage Schema & Model
const homepageSchema = new mongoose.Schema({
  hero: {
    badge: { type: String, default: "Service Professionnel de Débarras en France" },
    title: { type: String, default: "Libérez de l'espace sans effort avec Stitch" },
    subtitle: { type: String, default: "Maison, appartement, cave ou bureau: nous trions, recyclons et nettoyons après débarras de manière écoresponsable." },
    button1Title: { type: String, default: "Vous êtes un Particulier ?" },
    button1Sub: { type: String, default: "Maison, appartement, cave, bureaux..." },
    button2Title: { type: String, default: "Vous êtes un Professionnel ?" },
    button2Sub: { type: String, default: "Usines, Entrepôts, Domaines..." },
    image: { type: String, default: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" }
  },
  stats: {
    items: [
      {
        number: { type: String },
        label: { type: String },
        sublabel: { type: String }
      }
    ]
  },
  howItWorks: {
    title: { type: String },
    subtitle: { type: String },
    steps: [
      {
        number: { type: String },
        title: { type: String },
        description: { type: String },
        icon: { type: String }
      }
    ]
  },
  categories: {
    title: { type: String },
    subtitle: { type: String },
    items: [
      {
        title: { type: String },
        description: { type: String },
        icon: { type: String },
        image: { type: String }
      }
    ]
  },
  reviews: {
    title: { type: String },
    subtitle: { type: String },
    items: [
      {
        name: { type: String },
        role: { type: String },
        content: { type: String },
        rating: { type: Number },
        avatar: { type: String }
      }
    ]
  },
  b2b: {
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    points: [
      {
        title: { type: String },
        description: { type: String }
      }
    ],
    image: { type: String }
  }
});
const Homepage = mongoose.model("Homepage", homepageSchema);

// Generic Page Content Schema & Model
const pageContentSchema = new mongoose.Schema({
  pageId: { type: String, required: true, unique: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true }
});
const PageContent = mongoose.model("PageContent", pageContentSchema);

// Home route
app.get("/", (req, res) => {
  res.send("Stitch Server API running...");
});

// Register route
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà enregistré." });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    res.status(201).json({
      message: "Utilisateur créé avec succès !",
      user: { firstName, lastName, email, role: newUser.role }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Erreur interne lors de la création du compte." });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ error: "Email ou mot de passe incorrect." });
    }
    res.status(200).json({
      message: "Connexion réussie !",
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Erreur de connexion." });
  }
});

// Bookings routes
app.post("/api/bookings", async (req, res) => {
  try {
    const bookingData = req.body;
    // Generate unique ID like ST-XXXX
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `ST-${randomNum}`;

    const newBooking = new Booking({
      ...bookingData,
      id: bookingId
    });

    await newBooking.save();
    res.status(201).json({ message: "Réservation créée avec succès !", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Erreur lors de la création de la réservation." });
  }
});

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Erreur lors du chargement des réservations." });
  }
});

app.put("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updated = await Booking.findOneAndUpdate({ id }, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Réservation introuvable." });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Booking.findOneAndDelete({ id });
    if (!deleted) {
      return res.status(404).json({ error: "Réservation introuvable." });
    }
    res.status(200).json({ message: "Réservation supprimée avec succès !" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Erreur lors de la suppression." });
  }
});

// Users endpoints
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Erreur lors du chargement des utilisateurs." });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, role } = req.body;
    const updated = await User.findByIdAndUpdate(id, { firstName, lastName, email, role }, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès !" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Erreur lors de la suppression." });
  }
});

// Homepage content endpoints
app.get("/api/homepage", async (req, res) => {
  try {
    let homepage = await Homepage.findOne({});
    if (!homepage) {
      // Create default
      homepage = new Homepage({
        hero: {
          badge: "Service Professionnel de Débarras en France",
          title: "Libérez de l'espace sans effort avec Stitch",
          subtitle: "Maison, appartement, cave ou bureau: nous trions, recyclons et nettoyons après débarras de manière écoresponsable.",
          button1Title: "Vous êtes un Particulier ?",
          button1Sub: "Maison, appartement, cave, bureaux...",
          button2Title: "Vous êtes un Professionnel ?",
          button2Sub: "Usines, Entrepôts, Domaines...",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
        },
        stats: {
          items: [
            { number: "15k+", label: "Interventions", sublabel: "Particuliers & Pros" },
            { number: "98%", label: "Taux de Recyclage", sublabel: "Objectif Zéro Déchet" },
            { number: "4.9/5", label: "Note Moyenne", sublabel: "Avis Clients Vérifiés" }
          ]
        },
        howItWorks: {
          title: "Comment ça fonctionne ?",
          subtitle: "Un service simple, transparent et professionnel en 3 étapes clés.",
          steps: [
            { number: "01", title: "Demande en ligne", description: "Décrivez vos besoins, estimez votre volume et recevez une estimation instantanée de votre tarif.", icon: "📝" },
            { number: "02", title: "Visite & Tri", description: "Nos experts se déplacent, effectuent un tri rigoureux pour favoriser le réemploi et le recyclage.", icon: "🔍" },
            { number: "03", title: "Libération & Nettoyage", description: "Nous débarrassons tout rapidement et laissons les espaces parfaitement propres derrière nous.", icon: "✨" }
          ]
        },
        categories: {
          title: "Nos Domaines d'Intervention",
          subtitle: "Des solutions adaptées pour chaque type de débarras, que vous soyez particulier ou professionnel.",
          items: [
            { title: "Débarras de Maison", description: "Tri complet, valorisation des objets, don aux associations et recyclage écoresponsable.", icon: "🏠", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600" },
            { title: "Débarras d'Appartement", description: "Intervention rapide en étage, gestion des accès difficiles et respect de la copropriété.", icon: "🏢", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=600" },
            { title: "Débarras de Cave & Garage", description: "Extraction rapide des encombrants, tri écologique et balayage soigné après intervention.", icon: "📦", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600" }
          ]
        },
        reviews: {
          title: "Ce que disent nos clients",
          subtitle: "Découvrez les avis de ceux qui nous ont fait confiance pour leur débarras.",
          items: [
            { name: "Sophie L.", role: "Particulier - Débarras Maison", content: "Une équipe incroyable ! Rapides, polis, et d'une efficacité redoutable. Ils ont trié tous les objets et donné une grande partie à des associations. Je recommande à 100% !", rating: 5, avatar: "👩" },
            { name: "Jean-Marc P.", role: "Professionnel - Vente Entrepôt", content: "Excellent service professionnel. Devis clair et respecté. Intervention propre et dans les temps. La dimension écoresponsable est un vrai plus.", rating: 5, avatar: "👨" }
          ]
        },
        b2b: {
          title: "Solutions B2B & Grands Espaces",
          subtitle: "Partenaire de confiance pour les entreprises, syndics, études notariales et collectivités.",
          description: "Nous proposons des solutions sur-mesure pour vider vos bureaux, commerces, entrepôts ou locaux industriels avec une traçabilité totale des déchets et dons.",
          points: [
            { title: "Devis Rapide & Visite Gratuite", description: "Une estimation précise sous 24h et une visite technique sans aucun engagement." },
            { title: "Normes & Responsabilité RSE", description: "Bilan carbone optimisé, valorisation maximale et certificats de destruction fournis." }
          ],
          image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
        }
      });
      await homepage.save();
    }
    res.status(200).json(homepage);
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    res.status(500).json({ error: "Erreur lors du chargement du contenu de la page d'accueil." });
  }
});

app.put("/api/homepage", async (req, res) => {
  try {
    let homepage = await Homepage.findOne({});
    if (!homepage) {
      homepage = new Homepage(req.body);
    } else {
      Object.assign(homepage, req.body);
    }
    await homepage.save();
    res.status(200).json(homepage);
  } catch (error) {
    console.error("Error updating homepage content:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du contenu de la page d'accueil." });
  }
});

// Generic Page Content endpoints
app.get("/api/pages/:pageId", async (req, res) => {
  try {
    const { pageId } = req.params;
    let pageContent = await PageContent.findOne({ pageId });
    if (!pageContent) {
      return res.status(200).json({ pageId, content: {} });
    }
    res.status(200).json(pageContent);
  } catch (error) {
    console.error("Error fetching page content:", error);
    res.status(500).json({ error: "Erreur lors du chargement du contenu de la page." });
  }
});

app.put("/api/pages/:pageId", async (req, res) => {
  try {
    const { pageId } = req.params;
    const { content } = req.body;
    let pageContent = await PageContent.findOne({ pageId });
    if (!pageContent) {
      pageContent = new PageContent({ pageId, content });
    } else {
      pageContent.content = content;
    }
    await pageContent.save();
    res.status(200).json(pageContent);
  } catch (error) {
    console.error("Error updating page content:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du contenu de la page." });
  }
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;