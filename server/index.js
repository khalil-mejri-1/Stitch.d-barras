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
      user: { firstName, lastName, email } 
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
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email } 
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

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});