/**
 * Composant RdcMap pour la page Faune & Flore
 * Carte vectorielle SVG réaliste et hautement détaillée des 26 provinces de la RDC,
 * avec les principaux lacs (Tanganyika, Kivu, Édouard, Albert, Maï-Ndombe)
 * et le tracé du Fleuve Congo.
 */

function renderRdcMapSection() {
  return `
    <section id="ff-map-section" class="ff-map-parks-section">
      <div class="ff-map-header-bar">
        <div>
          <span class="ff-map-tag"><i class="fa-solid fa-earth-africa"></i> Cartographie Officielle</span>
          <h2 style="font-size: 1.8rem; font-weight: 700; margin-top: 0.3rem;">Carte de Répartition de la Biodiversité</h2>
          <p style="color: #555; font-size: 0.95rem; margin-top: 0.2rem;">
            Distribution géographique en RDC pour l'espèce sélectionnée : <strong id="ff-active-species-map-name" style="color: #2e7d32;">Gorille des montagnes</strong>
          </p>
        </div>

        <div class="ff-map-quick-stats">
          <div class="ff-map-stat-badge">
            <span class="num">26</span>
            <span class="txt">Provinces</span>
          </div>
          <div class="ff-map-stat-badge">
            <span class="num">9</span>
            <span class="txt">Parcs Nationaux</span>
          </div>
        </div>
      </div>

      <div class="ff-map-parks-grid">
        <!-- Carte SVG Réaliste de la RDC -->
        <div class="ff-map-container">
          <!-- Tooltip flottant au survol d'une province -->
          <div id="ff-province-tooltip" class="ff-province-tooltip">
            <span id="ff-tooltip-title" class="title">Province</span>
            <span id="ff-tooltip-status" class="status">Statut de présence</span>
          </div>

          <svg
            class="ff-svg-map"
            viewBox="0 0 1000 960"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Carte vectorielle détaillée et réaliste des 26 provinces de la République Démocratique du Congo"
          >
            <defs>
              <!-- Ombre portée douce pour la relief géographique -->
              <filter id="map-drop-shadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="3" dy="6" stdDeviation="8" flood-color="#142c14" flood-opacity="0.18" />
              </filter>
              <!-- Dégradé de surbrillance pour les provinces actives -->
              <linearGradient id="activeProvinceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#388e3c" />
                <stop offset="100%" stop-color="#1b5e20" />
              </linearGradient>
            </defs>

            <!-- Tracé des 26 Provinces de la RDC -->
            <g id="provinces-rdc" filter="url(#map-drop-shadow)">
              <!-- Kongo Central -->
              <path data-province="Kongo-Central" class="ff-province-path" d="M 50 510 C 70 490 100 480 120 480 C 140 490 160 500 170 510 C 180 530 185 540 180 555 C 165 575 140 590 120 590 C 85 590 60 570 30 540 Z" />
              <text x="95" y="540" class="ff-province-label">Kongo-Central</text>

              <!-- Kinshasa -->
              <circle data-province="Kinshasa" cx="185" cy="495" r="16" class="ff-province-path" />
              <text x="185" y="472" class="ff-province-label" style="font-weight: 800;">Kinshasa</text>

              <!-- Kwango -->
              <path data-province="Kwango" class="ff-province-path" d="M 170 540 C 190 540 210 590 220 640 C 230 680 260 710 280 730 C 230 740 190 730 160 710 C 150 640 160 580 170 540 Z" />
              <text x="210" y="660" class="ff-province-label">Kwango</text>

              <!-- Kwilu -->
              <path data-province="Kwilu" class="ff-province-path" d="M 200 520 C 240 525 260 530 280 540 C 300 570 320 600 330 630 C 285 640 245 640 220 640 C 210 590 205 550 200 520 Z" />
              <text x="260" y="585" class="ff-province-label">Kwilu</text>

              <!-- Mai-Ndombe -->
              <path data-province="Mai-Ndombe" class="ff-province-path" d="M 210 380 C 260 375 290 370 320 370 C 330 405 335 435 340 460 C 310 500 295 520 280 540 C 245 530 225 525 200 520 C 205 470 208 420 210 380 Z" />
              <text x="260" y="445" class="ff-province-label">Mai-Ndombe</text>

              <!-- Sud-Ubangi -->
              <path data-province="Sud-Ubangi" class="ff-province-path" d="M 210 140 C 240 130 270 125 290 120 C 285 160 282 195 280 230 C 245 235 220 238 200 240 C 195 210 192 180 190 180 Z" />
              <text x="235" y="185" class="ff-province-label">Sud-Ubangi</text>

              <!-- Nord-Ubangi -->
              <path data-province="Nord-Ubangi" class="ff-province-path" d="M 290 120 C 340 110 380 105 410 100 C 405 140 402 170 400 200 C 350 215 315 222 280 230 Z" />
              <text x="345" y="160" class="ff-province-label">Nord-Ubangi</text>

              <!-- Équateur -->
              <path data-province="Équateur" class="ff-province-path" d="M 200 240 C 240 235 260 232 280 230 C 300 280 310 330 320 370 C 275 375 240 378 210 380 C 198 350 194 310 190 310 Z" />
              <text x="250" y="305" class="ff-province-label">Équateur</text>

              <!-- Mongala -->
              <path data-province="Mongala" class="ff-province-path" d="M 410 100 C 450 105 480 108 510 110 C 505 150 502 185 500 220 C 455 212 425 206 400 200 Z" />
              <text x="450" y="160" class="ff-province-label">Mongala</text>

              <!-- Bas-Uele -->
              <path data-province="Bas-Uele" class="ff-province-path" d="M 510 110 C 580 105 630 102 680 100 C 675 140 672 175 670 210 C 590 215 540 218 500 220 Z" />
              <text x="585" y="155" class="ff-province-label">Bas-Uele</text>

              <!-- Haut-Uele -->
              <path data-province="Haut-Uele" class="ff-province-path" d="M 680 100 C 750 95 810 92 870 90 C 865 135 862 175 860 210 C 785 210 725 210 670 210 Z" />
              <text x="765" y="150" class="ff-province-label">Haut-Uele</text>

              <!-- Ituri -->
              <path data-province="Ituri" class="ff-province-path" d="M 860 210 C 890 215 910 218 920 220 C 925 260 928 295 930 330 C 880 335 845 338 820 340 C 800 300 790 260 780 240 Z" />
              <text x="860" y="275" class="ff-province-label">Ituri</text>

              <!-- Tshopo -->
              <path data-province="Tshopo" class="ff-province-path" d="M 500 220 C 600 225 700 232 780 240 C 800 280 810 310 820 340 C 720 370 660 385 620 400 C 570 370 545 355 520 340 C 510 295 505 255 500 220 Z" />
              <text x="640" y="305" class="ff-province-label">Tshopo</text>

              <!-- Tshuapa -->
              <path data-province="Tshuapa" class="ff-province-path" d="M 320 370 C 400 358 460 348 520 340 C 560 365 590 385 620 400 C 570 435 530 460 500 480 C 430 472 380 466 340 460 Z" />
              <text x="460" y="415" class="ff-province-label">Tshuapa</text>

              <!-- Sankuru -->
              <path data-province="Sankuru" class="ff-province-path" d="M 500 480 C 560 472 610 465 650 460 C 642 505 636 540 630 570 C 560 565 505 562 460 560 Z" />
              <text x="550" y="515" class="ff-province-label">Sankuru</text>

              <!-- Kasaï -->
              <path data-province="Kasaï" class="ff-province-path" d="M 340 460 C 390 465 430 468 460 470 C 452 525 446 565 440 600 C 390 612 355 622 330 630 Z" />
              <text x="390" y="535" class="ff-province-label">Kasaï</text>

              <!-- Kasaï Central -->
              <path data-province="Kasaï Central" class="ff-province-path" d="M 440 600 C 475 595 505 592 530 590 C 522 635 516 670 510 700 C 465 700 435 700 410 700 Z" />
              <text x="470" y="645" class="ff-province-label">Kasaï Central</text>

              <!-- Kasaï Oriental -->
              <path data-province="Kasaï Oriental" class="ff-province-path" d="M 530 590 C 560 585 580 582 600 580 C 592 618 586 648 580 670 C 550 682 530 692 510 700 Z" />
              <text x="555" y="635" class="ff-province-label" style="font-size: 11px;">Kasaï Or.</text>

              <!-- Lomami -->
              <path data-province="Lomami" class="ff-province-path" d="M 600 580 C 635 575 660 572 680 570 C 672 620 666 660 660 690 C 625 682 600 675 580 670 Z" />
              <text x="630" y="630" class="ff-province-label">Lomami</text>

              <!-- Maniema -->
              <path data-province="Maniema" class="ff-province-path" d="M 620 400 C 680 392 720 385 760 380 C 768 450 774 505 780 550 C 725 554 685 557 650 560 Z" />
              <text x="700" y="470" class="ff-province-label">Maniema</text>

              <!-- Nord-Kivu -->
              <path data-province="Nord-Kivu" class="ff-province-path" d="M 820 340 C 875 335 905 332 930 330 C 938 375 944 410 950 440 C 910 445 880 448 860 450 Z" />
              <text x="880" y="385" class="ff-province-label">Nord-Kivu</text>

              <!-- Sud-Kivu -->
              <path data-province="Sud-Kivu" class="ff-province-path" d="M 860 450 C 900 445 930 442 950 440 C 958 490 964 530 970 560 C 925 564 890 567 860 570 Z" />
              <text x="905" y="505" class="ff-province-label">Sud-Kivu</text>

              <!-- Tanganyika -->
              <path data-province="Tanganyika" class="ff-province-path" d="M 780 550 C 815 555 840 560 860 570 C 900 566 935 563 960 560 C 940 635 925 690 910 730 C 840 722 790 716 750 710 Z" />
              <text x="840" y="640" class="ff-province-label">Tanganyika</text>

              <!-- Haut-Lomami -->
              <path data-province="Haut-Lomami" class="ff-province-path" d="M 660 690 C 700 698 730 704 750 710 C 735 755 722 790 710 820 C 660 812 625 806 600 800 Z" />
              <text x="670" y="755" class="ff-province-label">Haut-Lomami</text>

              <!-- Lualaba -->
              <path data-province="Lualaba" class="ff-province-path" d="M 410 700 C 500 740 550 770 600 800 C 620 845 635 880 650 910 C 550 902 480 895 430 890 Z" />
              <text x="510" y="810" class="ff-province-label">Lualaba</text>

              <!-- Haut-Katanga -->
              <path data-province="Haut-Katanga" class="ff-province-path" d="M 710 820 C 795 780 855 755 910 730 C 935 780 955 820 970 850 C 890 888 835 915 780 940 Z" />
              <text x="830" y="845" class="ff-province-label">Haut-Katanga</text>
            </g>

            <!-- Éléments Hydrographiques Réalistes (Grand Fleuve Congo et Lacs de l'Est) -->
            <g id="hydrographie-rdc" pointer-events="none">
              <!-- Fleuve Congo (Courbe maîtresse bleue) -->
              <path d="M 710 820 Q 640 400 360 210 T 170 510" fill="none" stroke="#0288d1" stroke-width="5" stroke-linecap="round" opacity="0.8" />
              <path d="M 710 820 Q 640 400 360 210 T 170 510" fill="none" stroke="#e0f7fa" stroke-width="1.8" stroke-linecap="round" opacity="0.9" />

              <!-- Lac Tanganyika (Est) -->
              <path d="M 955 450 C 970 530 965 650 915 725 C 905 725 915 630 940 520 Z" fill="#0288d1" opacity="0.85" />

              <!-- Lac Kivu -->
              <ellipse cx="945" cy="425" rx="14" ry="20" fill="#0288d1" opacity="0.85" />

              <!-- Lac Édouard -->
              <ellipse cx="925" cy="335" rx="12" ry="16" fill="#0288d1" opacity="0.85" />

              <!-- Lac Albert -->
              <ellipse cx="915" cy="225" rx="10" ry="22" fill="#0288d1" opacity="0.85" />

              <!-- Lac Maï-Ndombe -->
              <ellipse cx="270" cy="410" rx="18" ry="28" fill="#0288d1" opacity="0.85" />
            </g>
          </svg>

          <!-- Légende de la Carte -->
          <div class="ff-map-legend">
            <div class="ff-legend-item">
              <div class="ff-legend-box" style="background: linear-gradient(135deg, #388e3c, #1b5e20);"></div>
              <span>Présence de l'espèce</span>
            </div>
            <div class="ff-legend-item">
              <div class="ff-legend-box" style="background: #e2e8e0; border: 1px solid #b0bec5;"></div>
              <span>Autre province RDC</span>
            </div>
            <div class="ff-legend-item">
              <div class="ff-legend-box" style="background: #0288d1;"></div>
              <span>Fleuve Congo &amp; Grands Lacs</span>
            </div>
          </div>
        </div>

        <!-- Colonne droite : Liste des Parcs Observés -->
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: var(--color-dark);">
            <i class="fa-solid fa-tree-city" style="color: #2e7d32; margin-right: 0.4rem;"></i> Parcs &amp; Sanctuaires Observés
          </h3>
          <div id="ff-parks-list" class="ff-parks-list">
            <!-- Injecté dynamiquement par le script JS -->
          </div>
        </div>
      </div>
    </section>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderRdcMapSection };
}
