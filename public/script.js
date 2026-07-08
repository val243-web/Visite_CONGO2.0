// Recupere l'emplacement de l'annee dans le footer.
const date = document.querySelector(".date")

// Affiche automatiquement l'annee actuelle si le footer est present.
let dateActuelle = new Date
if (date) {
  date.innerHTML = dateActuelle.getFullYear()
}

// Elements du menu responsive.
const hamburger = document.querySelector(".humbergur")
const navMenu = document.querySelector("nav ul")

// Ouvre ou ferme le menu mobile au clic sur l'icone hamburger.
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.querySelector(".fa-bars").style.display = "none"
    hamburger.querySelector(".fa-xmark").style.display = "block"
    navMenu.classList.toggle("active")
    if (!navMenu.classList.contains("active")) {
      hamburger.querySelector(".fa-bars").style.display = "block"
      hamburger.querySelector(".fa-xmark").style.display = "none"
    }

  })
}

// Donnees et boite de dialogue utilisees sur la page des parcs.
const parcsDataElement = document.querySelector("#parcs-data")
const parkDialog = document.querySelector("#park-dialog")

if (parcsDataElement && parkDialog) {
  // Parse les donnees JSON injectees dans la page EJS.
  const parcs = JSON.parse(parcsDataElement.textContent)

  // Recupere tous les champs qui seront remplis dans la modale.
  const closeButton = parkDialog.querySelector(".park-dialog-close")
  const dialogImage = parkDialog.querySelector(".park-dialog-image")
  const dialogRegion = parkDialog.querySelector(".park-dialog-region")
  const dialogTitle = parkDialog.querySelector("h2")
  const dialogDescription = parkDialog.querySelector(".park-dialog-description")
  const dialogNote = parkDialog.querySelector(".park-dialog-note")
  const sourceLink = parkDialog.querySelector(".park-source-link")

  // Chaque bouton "voir plus" ouvre la modale avec les informations du parc choisi.
  document.querySelectorAll(".park-more-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const parc = parcs.find((item) => item.id === Number(button.dataset.parkId))

      if (!parc) {
        return
      }

      dialogImage.src = parc.imageUrl
      dialogImage.alt = parc.nom
      dialogRegion.textContent = parc.region
      dialogTitle.textContent = parc.nom
      dialogDescription.textContent = parc.description
      dialogNote.textContent = parc.infoIndispensable
      sourceLink.href = parc.sourceUrl

      parkDialog.querySelector('[data-field="superficie"]').textContent = parc.superficie
      parkDialog.querySelector('[data-field="creation"]').textContent = parc.creation
      parkDialog.querySelector('[data-field="status"]').textContent = parc.status
      parkDialog.querySelector('[data-field="faune"]').textContent = parc.faune
      parkDialog.querySelector('[data-field="flore"]').textContent = parc.flore

      parkDialog.showModal()
    })
  })

  // Ferme la modale avec le bouton de fermeture.
  closeButton.addEventListener("click", () => parkDialog.close())

  // Ferme aussi la modale quand on clique sur le fond sombre.
  parkDialog.addEventListener("click", (event) => {
    if (event.target === parkDialog) {
      parkDialog.close()
    }
  })
}
