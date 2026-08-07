/**
 * Composant DetailPanel pour la page Faune & Flore
 * Gère la modale / fiche complète présentant l'espèce choisie avec ses 4 cartes statistiques,
 * ses onglets (Description, Habitat, Alimentation, Répartition, Statut & Menaces, Parcs),
 * ainsi qu'un accès direct à la source officielle / article scientifique.
 */

function renderDetailPanel() {
  return `
    <dialog id="ff-detail-dialog" class="ff-dialog">
      <div class="ff-dialog-container">
        <button id="ff-dialog-close" class="ff-dialog-close" type="button" aria-label="Fermer">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="ff-dialog-header-banner">
          <img id="ff-dialog-img" class="ff-dialog-banner-img" src="" alt="" />
          <div class="ff-dialog-banner-overlay">
            <div class="ff-dialog-banner-top">
              <span id="ff-dialog-iucn-badge" class="badge-iucn"></span>
              <a id="ff-dialog-article-link" href="#" target="_blank" rel="noopener noreferrer" class="btn-dialog-article">
                <i class="fa-solid fa-newspaper"></i> <span id="ff-dialog-article-source">Source Officielle</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
            <h2 id="ff-dialog-title" class="ff-dialog-title"></h2>
            <span id="ff-dialog-scientific" class="ff-dialog-scientific"></span>
          </div>
        </div>

        <div class="ff-dialog-body">
          <div class="ff-info-cards-grid">
            <div class="ff-info-mini-card">
              <span class="label">Poids / Taille</span>
              <span id="ff-dialog-weight" class="value"></span>
            </div>
            <div class="ff-info-mini-card">
              <span class="label">Longévité</span>
              <span id="ff-dialog-longevity" class="value"></span>
            </div>
            <div class="ff-info-mini-card">
              <span class="label">Régime</span>
              <span id="ff-dialog-diet" class="value"></span>
            </div>
            <div class="ff-info-mini-card">
              <span class="label">Activité</span>
              <span id="ff-dialog-activity" class="value"></span>
            </div>
          </div>

          <div class="ff-tabs-nav">
            <button class="ff-tab-btn active" data-tab="desc" type="button">Description</button>
            <button class="ff-tab-btn" data-tab="habitat" type="button">Habitat &amp; Forêt</button>
            <button class="ff-tab-btn" data-tab="diet" type="button">Alimentation &amp; Usage</button>
            <button class="ff-tab-btn" data-tab="distribution" type="button">Répartition</button>
            <button class="ff-tab-btn" data-tab="status" type="button">Statut &amp; Menaces</button>
            <button class="ff-tab-btn" data-tab="parks" type="button">Parcs présents</button>
          </div>

          <div id="ff-tab-desc" class="ff-tab-content active"></div>
          <div id="ff-tab-habitat" class="ff-tab-content"></div>
          <div id="ff-tab-diet" class="ff-tab-content"></div>
          <div id="ff-tab-distribution" class="ff-tab-content"></div>
          <div id="ff-tab-status" class="ff-tab-content"></div>
          <div id="ff-tab-parks" class="ff-tab-content"></div>
        </div>
      </div>
    </dialog>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderDetailPanel };
}
