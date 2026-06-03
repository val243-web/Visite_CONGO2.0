const express = require("express");
const fs = require("fs");
const path = require("path");
const { listeParcsRDC } = require("./public/parcsModule.js");
const nodemailer = require("nodemailer");

loadLocalEnv();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

function createContactTransporter() {
  loadLocalEnv();

  const mailUser = process.env.MAIL_USER && process.env.MAIL_USER.trim();
  const mailPass = process.env.MAIL_PASS && process.env.MAIL_PASS.trim();

  if (!mailUser || !mailPass) {
    return null;
  }

  // Gmail affiche parfois le mot de passe d'application avec des espaces.
  // Nodemailer reçoit ici la version nettoyée pour éviter les erreurs SMTP.
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailUser,
      pass: mailPass.replace(/\s/g, ""),
    },
  });
}

function loadLocalEnv() {
  const envPath = path.join(__dirname, ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envContent = fs.readFileSync(envPath, "utf8");

  envContent.split(/\r?\n/).forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderContactPage(res, options = {}) {
  res.render("contacts", {
    pageTitle: "contacts",
    status: options.status || null,
    formData: options.formData || {},
  });
}

function getContactReceiver() {
  loadLocalEnv();

  return process.env.CONTACT_TO && process.env.CONTACT_TO.trim();
}

app.get("/", (req, res) => {
  res.render("accueil", { pageTitle: "accueil" });
});

app.get("/apropos", (req, res) => {
  res.render("apropos", { pageTitle: "apropos" });
});

app.get("/parcs", (req, res) => {
  res.render("parcs", { pageTitle: "parcs", listeParcsRDC });
});

app.get("/contacts", (req, res) => {
  renderContactPage(res);
});

app.post("/contact/envoyer", async (req, res) => {
  const { nom, email, sujet, message } = req.body;
  const formData = { nom, email, sujet, message };

  // On vérifie les champs côté serveur, même si le navigateur les demande déjà.
  if (!nom || !email || !sujet || !message) {
    return renderContactPage(res, {
      formData,
      status: {
        type: "error",
        message: "Merci de remplir tous les champs du formulaire.",
      },
    });
  }

  const transporter = createContactTransporter();
  const receiver = getContactReceiver();

  // Sans ces variables dans .env, le serveur ne sait pas quel compte Gmail utiliser.
  if (!transporter || !receiver) {
    console.error("Configuration email manquante: MAIL_USER, MAIL_PASS ou CONTACT_TO.");
    return renderContactPage(res, {
      formData,
      status: {
        type: "error",
        message: "Le formulaire est prêt, mais l'adresse email du site n'est pas encore configurée.",
      },
    });
  }

  try {
    // Les valeurs utilisateur sont échappées avant d'entrer dans le HTML du mail.
    const safeNom = escapeHtml(nom);
    const safeEmail = escapeHtml(email);
    const safeSujet = escapeHtml(sujet);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await transporter.sendMail({
      from: `"${nom} via Visite Congo" <${process.env.MAIL_USER}>`,
      to: receiver,
      replyTo: email,
      subject: `Nouveau message de contact: ${sujet}`,
      text: [
        `Nom: ${nom}`,
        `Email: ${email}`,
        `Sujet: ${sujet}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>Nouveau message depuis Visite Congo</h2>
        <p><strong>Nom :</strong> ${safeNom}</p>
        <p><strong>Email :</strong> ${safeEmail}</p>
        <p><strong>Sujet :</strong> ${safeSujet}</p>
        <p><strong>Message :</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    return renderContactPage(res, {
      status: {
        type: "success",
        message: "Votre message a bien été envoyé. Merci de nous avoir contactés.",
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return renderContactPage(res, {
      formData,
      status: {
        type: "error",
        message: "Impossible d'envoyer le message pour le moment. Veuillez réessayer plus tard.",
      },
    });
  }
});

if (require.main === module) {
  app.listen(port, () => console.log(`http://localhost:${port}`));
}

module.exports = app;
