/**
 * Composant SpeciesCard pour la page Faune & Flore
 * Génère le balisage HTML d'une carte d'espèce avec image, badges, favori, hover et bouton d'action.
 */

function renderSpeciesCard(sp, isFavorite = false) {
  return `
    <article class="ff-species-card" data-species-id="${sp.id}">
      <div class="ff-card-media">
        <img class="ff-card-img" src="${sp.image}" alt="${sp.nom}" loading="lazy" onerror="this.onerror=null; this.src='/bgAccueil.jpg';" />
        <div class="ff-card-badges">
          <span class="badge-category">${sp.categorie}</span>
          <span class="badge-iucn iucn-${sp.statutUICN}">${sp.statutUICN}</span>
        </div>
        <button class="btn-favorite ${isFavorite ? "active" : ""}" type="button" data-species-id="${sp.id}" aria-label="Favori">
          <i class="fa-${isFavorite ? "solid" : "regular"} fa-heart"></i>
        </button>
      </div>

      <div class="ff-card-body">
        <h3 class="ff-card-name">${sp.nom}</h3>
        <span class="ff-card-scientific">${sp.nomScientifique}</span>
        <p class="ff-card-desc">${sp.description}</p>

        <div class="ff-card-footer">
          <span class="ff-card-habitat">
            <i class="fa-solid fa-tree"></i> ${sp.habitat}
          </span>
          <button class="btn-detail" type="button" data-species-id="${sp.id}">
            Consulter la fiche
          </button>
        </div>
      </div>
    </article>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderSpeciesCard };
}
