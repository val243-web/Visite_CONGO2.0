/**
 * Composant CategoriesGrid pour la page Faune & Flore
 * Affiche la grille des icônes de catégories avec icônes SVG Lucide, hover et état actif.
 */

function renderCategoryCard(cat, isActive = false) {
  return `
    <div class="ff-category-card ${isActive ? "active" : ""}" data-category-id="${cat.id}">
      <div class="ff-category-icon">${cat.icon}</div>
      <span class="ff-category-name">${cat.label}</span>
    </div>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderCategoryCard };
}
