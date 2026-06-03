const date = document.querySelector(".date")


// Déclaration de la variable et affectation de la date dans la variable date 
let dateActuelle = new Date
if (date) {
  date.innerHTML = dateActuelle.getFullYear()
}

// Le script pour une nav bar responsive
const hamburger = document.querySelector(".humbergur")
const navMenu = document.querySelector("nav ul")

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
const parcsDataElement = document.querySelector("#parcs-data")
const parkDialog = document.querySelector("#park-dialog")

if (parcsDataElement && parkDialog) {
  const parcs = JSON.parse(parcsDataElement.textContent)
  const closeButton = parkDialog.querySelector(".park-dialog-close")
  const dialogImage = parkDialog.querySelector(".park-dialog-image")
  const dialogRegion = parkDialog.querySelector(".park-dialog-region")
  const dialogTitle = parkDialog.querySelector("h2")
  const dialogDescription = parkDialog.querySelector(".park-dialog-description")
  const dialogNote = parkDialog.querySelector(".park-dialog-note")
  const sourceLink = parkDialog.querySelector(".park-source-link")

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

  closeButton.addEventListener("click", () => parkDialog.close())

  parkDialog.addEventListener("click", (event) => {
    if (event.target === parkDialog) {
      parkDialog.close()
    }
  })
}
