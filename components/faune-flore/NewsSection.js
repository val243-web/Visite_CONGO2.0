/**
 * Composant NewsSection pour la page Faune & Flore
 * Affiche la section Actualités & Découvertes de la biodiversité congolaise (2010 - 2026),
 * incluant le Likweli et les liens officiels vers chaque publication/article.
 */

function renderNewsSection() {
  return `
    <section id="ff-news-section" class="ff-news-wrapper">
      <div class="ff-section-title">
        <div>
          <span class="ff-map-tag"><i class="fa-solid fa-newspaper"></i> Recherches &amp; Publications (2010 - 2026)</span>
          <h2 style="font-size: 1.8rem; font-weight: 700; margin-top: 0.3rem;">Actualités de la Biodiversité en RDC</h2>
        </div>
      </div>

      <!-- Carte Vedette : Découverte du Likweli avec Lien Officiel -->
      <article class="ff-news-spotlight">
        <div class="ff-spotlight-img-wrap">
          <img src="https://images.unsplash.com/photo-1540573137025-54641e72e128?auto=format&fit=crop&w=800&q=80" alt="Likweli Colobus congoensis" class="ff-spotlight-img" />
          <span class="ff-spotlight-badge"><i class="fa-solid fa-star"></i> Découverte 2026</span>
        </div>

        <div class="ff-spotlight-content">
          <span class="ff-news-date"><i class="fa-solid fa-calendar-day"></i> Juillet 2026 • Parc National de la Lomami</span>
          <h3 class="ff-spotlight-title">Le Likweli (Colobus congoensis) : Nouvelle espèce de primate identifiée en RDC</h3>
          <p class="ff-spotlight-text">
            En juillet 2026, la communauté scientifique internationale a officialisé la découverte du <strong>Likweli</strong> (<em>Colobus congoensis</em>), un singe colobe au pelage noir dense et aux contours de lèvres ornés d'une teinte orangée à crème. Il s'agit seulement de la 5ème nouvelle espèce de primate identifiée sur le continent africain au cours des 75 dernières années.
          </p>
          
          <div class="ff-spotlight-actions">
            <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0349857" target="_blank" rel="noopener noreferrer" class="btn-news-official">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Lire l'article scientifique dans PLOS ONE
            </a>
            <a href="https://news.mongabay.com/2026/07/new-monkey-species-likweli-described-in-drc/" target="_blank" rel="noopener noreferrer" class="btn-news-source">
              <i class="fa-solid fa-newspaper"></i> Article Mongabay
            </a>
          </div>

          <div class="ff-spotlight-tags">
            <span class="tag">Endémique RDC</span>
            <span class="tag">Parc de la Lomami</span>
            <span class="tag">Colobus congoensis</span>
          </div>
        </div>
      </article>

      <!-- Grille des autres actualités majeures (2010-2025) avec liens officiels -->
      <div class="ff-news-grid">
        <article class="ff-news-card">
          <div class="ff-news-card-media">
            <img src="/assets/hero_gorilla.jpg" alt="Virunga 100 ans" />
            <span class="ff-news-pill">Avril 2025</span>
          </div>
          <div class="ff-news-card-body">
            <h4 class="ff-news-card-title">Virunga fête 100 ans de conservation d'exception</h4>
            <p class="ff-news-card-excerpt">Créé en 1925, le plus ancien parc national d'Afrique célèbre un siècle de résistance et de protection des gorilles de montagne.</p>
            <a href="https://virunga.org/news/virunga-national-park-100-years/" target="_blank" rel="noopener noreferrer" class="ff-news-link">
              Lire le communiqué officiel <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </article>

        <article class="ff-news-card">
          <div class="ff-news-card-media">
            <img src="/salonga.jpg" alt="Parc de la Salonga" />
            <span class="ff-news-pill">2021 - 2023</span>
          </div>
          <div class="ff-news-card-body">
            <h4 class="ff-news-card-title">Salonga retiré de la liste du patrimoine en péril</h4>
            <p class="ff-news-card-excerpt">L'UNESCO salue les progrès de la RDC pour la protection des bonobos et des éléphants de forêt dans la cuvette centrale.</p>
            <a href="https://whc.unesco.org/en/news/2314" target="_blank" rel="noopener noreferrer" class="ff-news-link">
              Consulter l'annonce de l'UNESCO <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </article>

        <article class="ff-news-card">
          <div class="ff-news-card-media">
            <img src="/assets/Kahuzi Biega National Park_.jpeg" alt="Parc de la Lomami" />
            <span class="ff-news-pill">2016</span>
          </div>
          <div class="ff-news-card-body">
            <h4 class="ff-news-card-title">Création officielle du Parc National de la Lomami</h4>
            <p class="ff-news-card-excerpt">Créé pour abriter le Lesula (décrit en 2012) et préfigurer le sanctuaire du Likweli au cœur de la forêt équatoriale.</p>
            <a href="https://news.mongabay.com/2016/10/drc-declares-new-national-park-to-protect-bonobos-and-lesula-monkeys/" target="_blank" rel="noopener noreferrer" class="ff-news-link">
              Lire l'article de création <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </article>
      </div>
    </section>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderNewsSection };
}
