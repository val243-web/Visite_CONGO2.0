const date = document.querySelector(".date")


// Déclaration de la variable et affectation de la date dans la variable date 
let dateActuelle = new Date
if (date) {
  date.innerHTML = dateActuelle.getFullYear()
}
