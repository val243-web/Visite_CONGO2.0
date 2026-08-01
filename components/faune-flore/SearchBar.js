/**
 * Composant SearchBar pour la page Faune & Flore
 * Propose la recherche par texte, le filtre par catégorie, habitat, statut UICN,
 * les filtres avancés dépliables et le bouton de réinitialisation.
 */

function renderSearchBar() {
  return `
    <section class="ff-search-wrapper" aria-label="Barre de recherche et filtres">
      <div class="ff-search-main">
        <div class="ff-input-group">
          <i class="fa-solid fa-magnifying-glass ff-input-icon"></i>
          <input
            type="text"
            id="ff-search-input"
            class="ff-search-input"
            placeholder="Rechercher une espèce (nom, nom scientifique...)"
          />
        </div>

        <select id="ff-habitat-select" class="ff-select-input" aria-label="Tous les habitats">
          <option value="">Tous les habitats</option>
          <option value="Forêt tropicale">Forêt tropicale</option>
          <option value="Savane">Savane</option>
          <option value="Zone humide">Zone humide</option>
          <option value="Montagne">Montagne</option>
          <option value="Fleuve">Fleuve Congo</option>
        </select>

        <select id="ff-iucn-select" class="ff-select-input" aria-label="Statut UICN">
          <option value="">Statut UICN</option>
          <option value="CR">CR - En danger critique</option>
          <option value="EN">EN - En danger</option>
          <option value="VU">VU - Vulnérable</option>
          <option value="NT">NT - Quasi menacé</option>
          <option value="LC">LC - Préoccupation mineure</option>
        </select>

        <button id="ff-toggle-filters" class="btn-filter-toggle" type="button">
          <i class="fa-solid fa-sliders"></i> Filtres avancés
        </button>

        <button id="ff-reset-btn" class="btn-reset" type="button">
          <i class="fa-solid fa-rotate-left"></i> Réinitialiser
        </button>
      </div>

      <div id="ff-advanced-filters" class="ff-advanced-filters">
        <label class="ff-filter-checkbox">
          <input type="checkbox" id="ff-checkbox-endemic" />
          <span>Espèces strictement endémiques à la RDC</span>
        </label>
      </div>
    </section>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderSearchBar };
}
