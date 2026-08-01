const express = require("express");
const path = require("path");
// Importation de la version 5+ du SDK Brevo
const { BrevoClient } = require("@getbrevo/brevo");
const { listeParcsRDC } = require("./public/parcsData.js");

const app = express();
const port = process.env.PORT || 3000;

// Configuration d'Express
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Initialisation du client Brevo (Compatible avec le Serverless de Vercel)
const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY || "",
});

// Sécurisation des entrées utilisateur
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "'");
}

// Fonction de rendu de la page contact
function renderContactPage(res, options = {}) {
  res.render("contacts", {
    pageTitle: "contacts",
    status: options.status || null,
    formData: options.formData || {},
  });
}

// Routes de navigation du site
app.get("/", (req, res) => {
  res.render("accueil", { pageTitle: "accueil" });
});

app.get("/apropos", (req, res) => {
  res.render("apropos", { pageTitle: "apropos" });
});

app.get("/parcs", (req, res) => {
  res.render("parcs", { pageTitle: "parcs", listeParcsRDC });
});

app.get("/fauneflore", (req, res) => {
  res.render("fauneflore", { pageTitle: "fauneflore" });
});

app.get("/contacts", (req, res) => {
  renderContactPage(res);
});

// Route de traitement du formulaire de contact
app.post("/contact/envoyer", async (req, res) => {
  const { nom, email, sujet, message } = req.body;
  const formData = { nom, email, sujet, message };

  // Validation des champs côté serveur
  if (!nom || !email || !sujet || !message) {
    return renderContactPage(res, {
      formData,
      status: {
        type: "error",
        message: "Merci de remplir tous les champs du formulaire.",
      },
    });
  }

  // Vérification de la présence des variables d'environnement indispensables sur Vercel
  if (!process.env.BREVO_API_KEY || !process.env.CONTACT_TO || !process.env.SENDER_EMAIL) {
    console.error("❌ Configuration manquante dans les variables d'environnement Vercel !");
    console.error("BREVO_API_KEY :", process.env.BREVO_API_KEY ? "✓ OK" : "✗ Manquant");
    console.error("CONTACT_TO :", process.env.CONTACT_TO ? "✓ OK" : "✗ Manquant");
    console.error("SENDER_EMAIL :", process.env.SENDER_EMAIL ? "✓ OK" : "✗ Manquant");
    
    return renderContactPage(res, {
      formData,
      status: {
        type: "error",
        message: "Le service d'envoi est temporairement indisponible (problème de configuration).",
      },
    });
  }

  try {
    console.log("📧 Envoi du message via l'API Brevo V5...");

    // Nettoyage des données pour éviter les failles XSS dans l'e-mail HTML
    const safeNom = escapeHtml(nom);
    const safeEmail = escapeHtml(email);
    const safeSujet = escapeHtml(sujet);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    // Envoi du mail transitoire en HTTP via l'API unifiée de Brevo v5
    await brevo.transactionalEmails.sendTransacEmail({
      sender: { name: "Visite Congo", email: process.env.SENDER_EMAIL.trim() },
      to: [{ email: process.env.CONTACT_TO.trim() }],
      replyTo: { email: email.trim(), name: nom },
      subject: `Nouveau message de contact : ${sujet}`,
      htmlContent: `
        <h2>Nouveau message depuis Visite Congo</h2>
        <p><strong>Nom :</strong> ${safeNom}</p>
        <p><strong>Email du visiteur :</strong> ${safeEmail}</p>
        <p><strong>Sujet :</strong> ${safeSujet}</p>
        <p><strong>Message :</strong></p>
        <p>${safeMessage}</p>
      `
    });

    console.log("✅ Email envoyé avec succès !");

    return renderContactPage(res, {
      status: {
        type: "success",
        message: "Votre message a bien été envoyé. Merci de nous avoir contactés.",
      },
    });

  } catch (error) {
    console.error("❌ Erreur API Brevo V5 :", error.message || error);
    
    return renderContactPage(res, {
      formData,
      status: {
        type: "error",
        message: "Impossible d'envoyer le message pour le moment. Veuillez réessayer plus tard.",
      },
    });
  }
});

//R oute pour gérer les erreurs 404 (page non trouvée)
app.use((req, res) => {
  res.status(404).render("pageErreur", { pageTitle: "Page non trouvée" });
});

// Lancement du serveur en local uniquement
if (require.main === module) {
  app.listen(port, () => console.log(`Serveur démarré sur : http://localhost:${port}`));
}

module.exports = app;