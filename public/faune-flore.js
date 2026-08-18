// Script interactif pour la page Faune & Flore

document.addEventListener("DOMContentLoaded", () => {
  // Verifier la presence des donnees de biodiversite et des parcs
  if (typeof FAUNE_FLORE_SPECIES === "undefined") {
    console.error("FAUNE_FLORE_SPECIES non trouve.");
    return;
  }

  // State local
  let currentCategory = "Toutes";
  let searchQuery = "";
  let selectedHabitat = "";
  let selectedIUCN = "";
  let onlyEndemic = false;
  let activeSpecies = FAUNE_FLORE_SPECIES[0]; // premier par defaut
  let favorites = JSON.parse(localStorage.getItem("ff_favorites") || "[]");

  // DOM Elements
  const searchInput = document.querySelector("#ff-search-input");
  const habitatSelect = document.querySelector("#ff-habitat-select");
  const iucnSelect = document.querySelector("#ff-iucn-select");
  const toggleFilterBtn = document.querySelector("#ff-toggle-filters");
  const resetBtn = document.querySelector("#ff-reset-btn");
  const advancedFiltersBox = document.querySelector("#ff-advanced-filters");
  const endemicCheckbox = document.querySelector("#ff-checkbox-endemic");
  const categoriesGrid = document.querySelector("#ff-categories-grid");
  const speciesGrid = document.querySelector("#ff-species-grid");
  const speciesCountElement = document.querySelector("#ff-species-count");

  // Modal Detail Elements
  const detailDialog = document.querySelector("#ff-detail-dialog");
  const dialogClose = document.querySelector("#ff-dialog-close");
  const dialogImg = document.querySelector("#ff-dialog-img");
  const dialogTitle = document.querySelector("#ff-dialog-title");
  const dialogScientific = document.querySelector("#ff-dialog-scientific");
  const dialogIUCNBadge = document.querySelector("#ff-dialog-iucn-badge");
  const dialogArticleLink = document.querySelector("#ff-dialog-article-link");
  const dialogArticleSource = document.querySelector("#ff-dialog-article-source");
  const dialogWeight = document.querySelector("#ff-dialog-weight");
  const dialogLongevity = document.querySelector("#ff-dialog-longevity");
  const dialogDiet = document.querySelector("#ff-dialog-diet");
  const dialogActivity = document.querySelector("#ff-dialog-activity");

  // Tabs Content Elements
  const tabDesc = document.querySelector("#ff-tab-desc");
  const tabHabitat = document.querySelector("#ff-tab-habitat");
  const tabDiet = document.querySelector("#ff-tab-diet");
  const tabDistribution = document.querySelector("#ff-tab-distribution");
  const tabStatus = document.querySelector("#ff-tab-status");
  const tabParks = document.querySelector("#ff-tab-parks");

  // Interactive Map & Tooltip Elements
  const svgMapProvinces = document.querySelectorAll(".ff-province-path");
  const provinceTooltip = document.querySelector("#ff-province-tooltip");
  const tooltipTitle = document.querySelector("#ff-tooltip-title");
  const tooltipStatus = document.querySelector("#ff-tooltip-status");
  const parkCardsList = document.querySelector("#ff-parks-list");
  const activeSpeciesMapName = document.querySelector("#ff-active-species-map-name");

  // 1. Initialiser la grille des categories
  function renderCategories() {
    if (!categoriesGrid) return;
    categoriesGrid.innerHTML = "";

    FAUNE_FLORE_CATEGORIES.forEach((cat) => {
      const card = document.createElement("div");
      card.className = `ff-category-card ${currentCategory === cat.id ? "active" : ""}`;
      card.dataset.categoryId = cat.id;

      card.innerHTML = `
        <div class="ff-category-icon">${cat.icon}</div>
        <span class="ff-category-name">${cat.label}</span>
      `;

      card.addEventListener("click", () => {
        currentCategory = cat.id;
        document.querySelectorAll(".ff-category-card").forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        filterAndRenderSpecies();
      });

      categoriesGrid.appendChild(card);
    });
  }

  // 2. Filtrer et afficher les cartes d'especes
  function filterAndRenderSpecies() {
    if (!speciesGrid) return;

    const filtered = FAUNE_FLORE_SPECIES.filter((sp) => {
      // Categorie
      if (currentCategory !== "Toutes" && sp.categorie !== currentCategory) {
        return false;
      }
      // Recherche texte
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = sp.nom.toLowerCase().includes(q);
        const matchSci = sp.nomScientifique.toLowerCase().includes(q);
        const matchDesc = sp.description.toLowerCase().includes(q);
        if (!matchName && !matchSci && !matchDesc) return false;
      }
      // Habitat
      if (selectedHabitat && sp.habitat !== selectedHabitat) {
        return false;
      }
      // Statut UICN
      if (selectedIUCN && sp.statutUICN !== selectedIUCN) {
        return false;
      }
      // Endemique
      if (onlyEndemic && !sp.endemiqueRDC) {
        return false;
      }
      return true;
    });

    // Compteur
    if (speciesCountElement) {
      speciesCountElement.textContent = `${filtered.length} espèce${filtered.length > 1 ? "s" : ""} trouvée${filtered.length > 1 ? "s" : ""}`;
    }

    speciesGrid.innerHTML = "";

    if (filtered.length === 0) {
      speciesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: #ffffff; border-radius: var(--radius-lg);">
          <i class="fa-solid fa-seedling" style="font-size: 2.5rem; color: #a0a0a0; margin-bottom: 1rem;"></i>
          <h3>Aucune espèce ne correspond à vos critères</h3>
          <p style="color: #666; margin-top: 0.5rem;">Essayez de réinitialiser la barre de recherche ou de modifier vos filtres.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((sp) => {
      const isFav = favorites.includes(sp.id);
      const card = document.createElement("article");
      card.className = "ff-species-card";

      card.innerHTML = `
        <div class="ff-card-media">
          <img class="ff-card-img" src="${sp.image}" alt="${sp.nom}" loading="lazy" onerror="this.onerror=null; this.src='/bgAccueil.jpg';" />
          <div class="ff-card-badges">
            <span class="badge-category">${sp.categorie}</span>
            <span class="badge-iucn iucn-${sp.statutUICN}">${sp.statutUICN}</span>
          </div>
          <button class="btn-favorite ${isFav ? "active" : ""}" type="button" data-species-id="${sp.id}" aria-label="Favori">
            <i class="fa-${isFav ? "solid" : "heart"} fa-heart"></i>
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
      `;

      // Event listener pour le bouton favori
      const favBtn = card.querySelector(".btn-favorite");
      favBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(sp.id, favBtn);
      });

      // Event listener pour ouvrir la fiche detaillee et mettre a jour la carte
      card.querySelectorAll(".btn-detail, .ff-card-media, .ff-card-name").forEach((el) => {
        el.addEventListener("click", () => {
          openSpeciesDetail(sp);
        });
      });

      speciesGrid.appendChild(card);
    });
  }

  // 3. Gestion des favoris
  function toggleFavorite(id, btn) {
    if (favorites.includes(id)) {
      favorites = favorites.filter((favId) => favId !== id);
      btn.classList.remove("active");
      btn.querySelector("i").className = "fa-regular fa-heart";
    } else {
      favorites.push(id);
      btn.classList.add("active");
      btn.querySelector("i").className = "fa-solid fa-heart";
    }
    localStorage.setItem("ff_favorites", JSON.stringify(favorites));
  }

  // 4. Ouvrir le panneau / la modale de detail
  function openSpeciesDetail(sp) {
    activeSpecies = sp;

    if (dialogImg) dialogImg.src = sp.image;
    if (dialogTitle) dialogTitle.textContent = sp.nom;
    if (dialogScientific) dialogScientific.textContent = sp.nomScientifique;

    if (dialogIUCNBadge) {
      dialogIUCNBadge.textContent = sp.statutLabel;
      dialogIUCNBadge.className = `badge-iucn iucn-${sp.statutUICN}`;
    }

    if (dialogArticleLink && dialogArticleSource) {
      if (sp.articleUrl) {
        dialogArticleLink.href = sp.articleUrl;
        dialogArticleSource.textContent = sp.articleSource || "Article & Source Officielle";
        dialogArticleLink.style.display = "inline-flex";
      } else {
        dialogArticleLink.style.display = "none";
      }
    }

    if (dialogWeight) dialogWeight.textContent = sp.poids;
    if (dialogLongevity) dialogLongevity.textContent = sp.longevite;
    if (dialogDiet) dialogDiet.textContent = sp.regime;
    if (dialogActivity) dialogActivity.textContent = sp.activite;

    // Tabs content
    if (tabDesc) tabDesc.innerHTML = `<p>${sp.description}</p>`;
    if (tabHabitat) tabHabitat.innerHTML = `<p>${sp.habitatDetails}</p>`;
    if (tabDiet) tabDiet.innerHTML = `<p>${sp.alimentation}</p>`;
    if (tabDistribution) tabDistribution.innerHTML = `<p>${sp.repartitionDetails}</p>`;
    if (tabStatus) tabStatus.innerHTML = `<p>${sp.menaces}</p>`;

    // Render associated parks inside modal tab
    if (tabParks) {
      tabParks.innerHTML = "";
      if (typeof listeParcsRDC !== "undefined" && sp.parcsIds) {
        const parcs = listeParcsRDC.filter((p) => sp.parcsIds.includes(p.id));
        if (parcs.length > 0) {
          parcs.forEach((p) => {
            const pCard = document.createElement("div");
            pCard.className = "ff-park-mini-card";
            pCard.innerHTML = `
              <img class="ff-park-mini-img" src="${p.imageUrl}" alt="${p.nom}" onerror="this.src='/bgAccueil.jpg';" />
              <div class="ff-park-mini-info">
                <span class="ff-park-mini-name">${p.nom}</span>
                <span class="ff-park-mini-region">${p.region} • ${p.superficie}</span>
              </div>
            `;
            tabParks.appendChild(pCard);
          });
        } else {
          tabParks.innerHTML = "<p>Espèce observée en dehors des limites des parcs nationaux majeurs.</p>";
        }
      }
    }

    // Mettre a jour la carte interactive et les parcs associes en bas de page
    updateInteractiveMap(sp);

    // Ouvrir la modale
    if (detailDialog) {
      detailDialog.showModal();
    }
  }

  // 5. Gestion des onglets de la modale
  const tabBtns = document.querySelectorAll(".ff-tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;
      tabBtns.forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".ff-tab-content").forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const targetEl = document.querySelector(`#ff-tab-${targetTab}`);
      if (targetEl) targetEl.classList.add("active");
    });
  });

  // 6. Carte SVG Interactive Réaliste et Tooltip au Survol
  function updateInteractiveMap(sp) {
    if (!sp) return;
    activeSpecies = sp;

    if (activeSpeciesMapName) {
      activeSpeciesMapName.textContent = sp.nom;
    }

    // Colorer les provinces de la carte SVG
    if (svgMapProvinces && sp.provinces) {
      svgMapProvinces.forEach((path) => {
        const provName = path.dataset.province;
        if (sp.provinces.includes(provName)) {
          path.classList.add("active-province");
        } else {
          path.classList.remove("active-province");
        }
      });
    }

    // Afficher les cartes des parcs observés à droite de la carte SVG
    if (parkCardsList && typeof listeParcsRDC !== "undefined") {
      parkCardsList.innerHTML = "";
      const parcs = listeParcsRDC.filter((p) => sp.parcsIds && sp.parcsIds.includes(p.id));

      if (parcs.length > 0) {
        parcs.forEach((parc) => {
          const pCard = document.createElement("div");
          pCard.className = "ff-park-mini-card";
          pCard.innerHTML = `
            <img class="ff-park-mini-img" src="${parc.imageUrl}" alt="${parc.nom}" onerror="this.src='/bgAccueil.jpg';" />
            <div class="ff-park-mini-info">
              <span class="ff-park-mini-name">${parc.nom}</span>
              <span class="ff-park-mini-region">${parc.region} • ${parc.superficie}</span>
            </div>
          `;
          parkCardsList.appendChild(pCard);
        });
      } else {
        parkCardsList.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; background: #f9fbf9; border-radius: var(--radius-md);">
            <p style="color: #666;">Observé principalement dans les réserves naturelles locales et forêts hors des grands parcs.</p>
          </div>
        `;
      }
    }
  }

  // Interactivité au survol des provinces SVG pour le Tooltip
  if (svgMapProvinces) {
    svgMapProvinces.forEach((path) => {
      path.addEventListener("mouseenter", () => {
        const provName = path.dataset.province;
        const isPresent = activeSpecies && activeSpecies.provinces && activeSpecies.provinces.includes(provName);

        if (tooltipTitle) tooltipTitle.textContent = `Province de ${provName}`;
        if (tooltipStatus) {
          tooltipStatus.textContent = isPresent ? `Présence confirmée de : ${activeSpecies.nom}` : "Hors de la zone principale d'observation";
          tooltipStatus.style.color = isPresent ? "#81c784" : "#ffb74d";
        }
        if (provinceTooltip) provinceTooltip.classList.add("visible");
      });

      path.addEventListener("mouseleave", () => {
        if (provinceTooltip) provinceTooltip.classList.remove("visible");
      });
    });
  }

  // Listeners pour les filtres et recherche
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      filterAndRenderSpecies();
    });
  }

  if (habitatSelect) {
    habitatSelect.addEventListener("change", (e) => {
      selectedHabitat = e.target.value;
      filterAndRenderSpecies();
    });
  }

  if (iucnSelect) {
    iucnSelect.addEventListener("change", (e) => {
      selectedIUCN = e.target.value;
      filterAndRenderSpecies();
    });
  }

  if (toggleFilterBtn && advancedFiltersBox) {
    toggleFilterBtn.addEventListener("click", () => {
      advancedFiltersBox.classList.toggle("active");
    });
  }

  if (endemicCheckbox) {
    endemicCheckbox.addEventListener("change", (e) => {
      onlyEndemic = e.target.checked;
      filterAndRenderSpecies();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      currentCategory = "Toutes";
      searchQuery = "";
      selectedHabitat = "";
      selectedIUCN = "";
      onlyEndemic = false;

      if (searchInput) searchInput.value = "";
      if (habitatSelect) habitatSelect.value = "";
      if (iucnSelect) iucnSelect.value = "";
      if (endemicCheckbox) endemicCheckbox.checked = false;

      renderCategories();
      filterAndRenderSpecies();
    });
  }

  if (dialogClose && detailDialog) {
    dialogClose.addEventListener("click", () => detailDialog.close());
    detailDialog.addEventListener("click", (e) => {
      if (e.target === detailDialog) detailDialog.close();
    });
  }

  // Initialisation
  renderCategories();
  filterAndRenderSpecies();
  updateInteractiveMap(FAUNE_FLORE_SPECIES[0]);
});
