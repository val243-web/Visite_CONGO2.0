/**
 * Composant DetailPanel pour la page Faune & Flore
 * Gère la modale / fiche complète présentant l'espèce choisie avec ses 4 cartes statistiques,
 * ses onglets (Description, Habitat, Alimentation, Répartition, Statut & Menaces, Parcs).
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
            <span id="ff-dialog-iucn-badge" class="badge-iucn"></span>
            <h2 id="ff-dialog-title" class="ff-dialog-title"></h2>
            <span id="ff-dialog-scientific" class="ff-dialog-scientific"></span>
          </div>
        </div>

        <div class="ff-dialog-body">
          <div class="ff-info-cards-grid">
            <div class="ff-info-mini-card">
              <span class="label">Poids</span>
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
            <button class="ff-tab-btn" data-tab="habitat" type="button">Habitat</button>
            <button class="ff-tab-btn" data-tab="diet" type="button">Alimentation</button>
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
