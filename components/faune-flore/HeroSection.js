/**
 * Composant HeroSection pour la page Faune & Flore
 * Affiche la grande image de fond du gorille, l'overlay sombre, le titre,
 * le sous-titre et les 4 cartes statistiques.
 */

function renderHeroSection() {
  return `
    <section class="ff-hero" aria-label="Présentation de la biodiversité">
      <div class="ff-hero-grid">
        <div class="ff-hero-content">
          <div class="ff-hero-badge">
            <i class="fa-solid fa-leaf"></i> Patrimoine Naturel RDC
          </div>
          <h1 class="ff-hero-title">Faune &amp; Flore de la RDC</h1>
          <p class="ff-hero-subtitle">
            Découvrez la richesse extraordinaire de la biodiversité congolaise. Des espèces uniques préservées dans leurs habitats naturels.
          </p>
          <div class="ff-hero-actions">
            <a href="#ff-species-grid" class="btn-primary-ff">
              <i class="fa-solid fa-compass"></i> Explorer les espèces
            </a>
            <a href="#ff-map-section" class="btn-outline-ff">
              <i class="fa-solid fa-map-location-dot"></i> Carte de répartition
            </a>
          </div>
        </div>

        <div class="ff-hero-stats">
          <div class="ff-stat-card">
            <span class="ff-stat-number">400+</span>
            <span class="ff-stat-label">Mammifères</span>
          </div>
          <div class="ff-stat-card">
            <span class="ff-stat-number">1090+</span>
            <span class="ff-stat-label">Oiseaux</span>
          </div>
          <div class="ff-stat-card">
            <span class="ff-stat-number">10000+</span>
            <span class="ff-stat-label">Plantes</span>
          </div>
          <div class="ff-stat-card">
            <span class="ff-stat-number">200+</span>
            <span class="ff-stat-label">Espèces endémiques</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderHeroSection };
}
