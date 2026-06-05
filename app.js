const express = require("express");
const path = require("path");
// 1. On remplace Nodemailer par le SDK officiel de Brevo (plus rapide sur Vercel)
const sibApiV3Sdk = require("@getbrevo/brevo");
const { listeParcsRDC } = require("./public/parcsData.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// 2. Configuration du client Brevo via API Key
let apiInstance = new sibApiV3Sdk.TransactionalEmailsApi();
let apiKey = apiInstance.authentications['apiKey'];
// Ta clé d'API Brevo doit être stockée dans l'interface de Vercel
apiKey.apiKey = process.env.BREVO_API_KEY; 

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "'");
}

function renderContactPage(res, options = {}) {
  res.render("contacts", {
    pageTitle: "contacts",
    status: options.status || null,
    formData: options.formData || {},
  });
}

app.get("/", (req, res) => { res.render("accueil", { pageTitle: "accueil" }); });
app.get("/apropos", (req, res) => { res.render("apropos", { pageTitle: "apropos" }); });
app.get("/parcs", (req, res) => { res.render("parcs", { pageTitle: "parcs", listeParcsRDC }); });
app.get("/contacts", (req, res) => { renderContactPage(res); });

app.post("/contact/envoyer", async (req, res) => {
  const { nom, email, sujet, message } = req.body;
  const formData = { nom, email, sujet, message };

  if (!nom || !email || !sujet || !message) {
    return renderContactPage(res, {
      formData,
      status: { type: "error", message: "Merci de remplir tous les champs du formulaire." },
    });
  }

  // Vérification de la clé d'API et de l'email de réception sur Vercel
  if (!process.env.BREVO_API_KEY || !process.env.CONTACT_TO || !process.env.SENDER_EMAIL) {
    console.error("Configuration manquante dans les variables d'environnement Vercel.");
    return renderContactPage(res, {
      formData,
      status: { type: "error", message: "Le service d'envoi est en cours de maintenance." },
    });
  }

  try {
    console.log("📧 Envoi du message via l'API Brevo...");

    const safeNom = escapeHtml(nom);
    const safeEmail = escapeHtml(email);
    const safeSujet = escapeHtml(sujet);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    // Structure requise par l'API Brevo
    let sendSmtpEmail = new sibApiV3Sdk.SendSmtpEmail();
    
    // IMPORTANT : SENDER_EMAIL doit être l'email vérifié dans ton compte Brevo
    sendSmtpEmail.sender = { "name": "Visite Congo", "email": process.env.SENDER_EMAIL };
    sendSmtpEmail.to = [{ "email": process.env.CONTACT_TO.trim() }];
    sendSmtpEmail.replyTo = { "email": email, "name": nom };
    sendSmtpEmail.subject = `Nouveau message de contact : ${sujet}`;
    
    sendSmtpEmail.htmlContent = `
      <h2>Nouveau message depuis Visite Congo</h2>
      <p><strong>Nom :</strong> ${safeNom}</p>
      <p><strong>Email du visiteur :</strong> ${safeEmail}</p>
      <p><strong>Sujet :</strong> ${safeSujet}</p>
      <p><strong>Message :</strong></p>
      <p>${safeMessage}</p>
    `;

    // Envoi via HTTP
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email envoyé avec succès via API !");

    return renderContactPage(res, {
      status: { type: "success", message: "Votre message a bien été envoyé. Merci de nous avoir contactés." },
    });

  } catch (error) {
    console.error("❌ Erreur API Brevo :", error);
    return renderContactPage(res, {
      formData,
      status: { type: "error", message: "Impossible d'envoyer le message. Veuillez réessayer plus tard." },
    });
  }
});

if (require.main === module) {
  app.listen(port, () => console.log(`http://localhost:${port}`));
}

module.exports = app;
