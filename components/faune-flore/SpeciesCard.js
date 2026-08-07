/**
 * Composant SpeciesCard pour la page Faune & Flore
 * Génère le balisage HTML d'une carte d'espèce avec image, badges, favori, hover,
 * bouton de fiche détaillée ET option redirigeant vers l'article scientifique / source officielle complet.
 */

function renderSpeciesCard(sp, isFavorite = false) {
  const articleLink = sp.articleUrl ? `
    <a class="btn-card-article" href="${sp.articleUrl}" target="_blank" rel="noopener noreferrer" title="Consulter l'article d'origine sur ${sp.articleSource || 'Source scientifique'}" onclick="event.stopPropagation();">
      <i class="fa-solid fa-arrow-up-right-from-square"></i> Article &amp; Source
    </a>
  ` : '';

  return `
    <article class="ff-species-card" data-species-id="${sp.id}">
      <div class="ff-card-media">
        <img class="ff-card-img" src="${sp.image}" alt="${sp.nom}" loading="lazy" onerror="this.onerror=null; this.src='/bgAccueil.jpg';" />
        <div class="ff-card-badges">
          <span class="badge-category">${sp.categorie}</span>
          <span class="badge-iucn iucn-${sp.statutUICN}">${sp.statutUICN}</span>
          ${sp.endemiqueRDC ? '<span class="badge-endemic"><i class="fa-solid fa-certificate"></i> Endémique RDC</span>' : ''}
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
          <div class="ff-card-buttons">
            <button class="btn-detail" type="button" data-species-id="${sp.id}">
              Consulter la fiche
            </button>
            ${articleLink}
          </div>
        </div>
      </div>
    </article>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderSpeciesCard };
}
