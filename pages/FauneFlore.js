/**
 * Page FauneFlore - Assemblage des composants pour la biodiversité de la RDC
 */

const { renderHeroSection } = require('../components/faune-flore/HeroSection');
const { renderSearchBar } = require('../components/faune-flore/SearchBar');
const { renderNewsSection } = require('../components/faune-flore/NewsSection');
const { renderDetailPanel } = require('../components/faune-flore/DetailPanel');
const { renderRdcMapSection } = require('../components/faune-flore/RdcMap');

function renderFauneFlorePage() {
  return `
    <main class="ff-page">
      ${renderHeroSection()}
      ${renderSearchBar()}

      <section class="ff-categories-section">
        <div class="ff-section-title">
          <h2>Catégories</h2>
          <span id="ff-species-count" style="font-size: 0.95rem; color: #666; font-weight: 500;">13 espèces trouvées</span>
        </div>
        <div id="ff-categories-grid" class="ff-categories-grid"></div>
      </section>

      <section class="ff-species-section">
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.8rem; font-weight: 700;">Espèces Populaires &amp; Nouveautés</h2>
          <p style="color: #666; font-size: 0.95rem;">Cliquez sur une fiche pour consulter les détails complets, incluant le nouveau Likweli (2026).</p>
        </div>
        <div id="ff-species-grid" class="ff-species-grid"></div>
      </section>

      ${renderNewsSection()}
      ${renderRdcMapSection()}
      ${renderDetailPanel()}
    </main>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderFauneFlorePage };
}
