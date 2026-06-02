const listeParcsRDC = [
  {
    id: 1,
    nom: "Parc National des Virunga",
    statut: "Parc National",
    anneeCreation: 1925,
    superficie: 7800,
    localisation: "Nord-Kivu, Ituri",
    biodiversite: ["Gorille de montagne", "Chimpanzé", "Hippopotame", "Éléphant de savane"],
    description: "Plus ancien parc d'Afrique. Il englobe une chaîne de volcans actifs, des glaciers dans les montagnes du Rwenzori et la plus grande diversité de mammifères et d'oiseaux du continent.",
    unesco: {
      estInscrit: true,
      anneeInscription: 1979,
      statutEnPeril: true,
      criteresSelection: ["vii", "viii", "x"]
    }
  },
  {
    id: 2,
    nom: "Parc National de la Garamba",
    statut: "Parc National",
    anneeCreation: 1938,
    superficie: 4920,
    localisation: "Haut-Uele",
    biodiversite: ["Girafe du Congo", "Éléphant de savane", "Rhinocéros blanc du Nord", "Lion"],
    description: "Immenses savanes herbeuses et forêts-galeries. Historiquement le dernier sanctuaire mondial du rhinocéros blanc du Nord.",
    unesco: {
      estInscrit: true,
      anneeInscription: 1980,
      statutEnPeril: true,
      criteresSelection: ["vii", "x"]
    }
  },
  {
    id: 3,
    nom: "Parc National de Kahuzi-Biega",
    statut: "Parc National",
    anneeCreation: 1970,
    superficie: 6000,
    localisation: "Sud-Kivu, Maniema",
    biodiversite: ["Gorille de plaine de l'Est (Grauer)", "Chimpanzé", "Éléphant de forêt", "Genette géante"],
    description: "Vaste zone de forêt tropicale dominée par deux volcans éteints. C'est l'un des derniers refuges mondiaux pour le gorille de plaine de l'Est.",
    unesco: {
      estInscrit: true,
      anneeInscription: 1980,
      statutEnPeril: true,
      criteresSelection: ["x"]
    }
  },
  {
    id: 4,
    nom: "Parc National de la Salonga",
    statut: "Parc National",
    anneeCreation: 1970,
    superficie: 36000,
    localisation: "Équateur, Mai-Ndombe, Kasai, Tshuapa",
    biodiversite: ["Bonobo", "Paon congolais", "Éléphant de forêt", "Faux-gavial d'Afrique"],
    description: "La plus grande réserve de forêt tropicale humide d'Afrique. Isolé au cœur du bassin du Congo, le site sert de sanctuaire au bonobo.",
    unesco: {
      estInscrit: true,
      anneeInscription: 1984,
      statutEnPeril: false,
      criteresSelection: ["vii", "ix"]
    }
  },
  {
    id: 5,
    nom: "Réserve de Faune à Okapis",
    statut: "Réserve de Faune",
    anneeCreation: 1992,
    superficie: 13726,
    localisation: "Ituri",
    biodiversite: ["Okapi", "Chimpanzé", "Éléphant de forêt", "Oiseau de l'Ituri"],
    description: "Située dans la forêt d'Ituri, la réserve protège environ un cinquième de la population mondiale d'okapis sauvages.",
    unesco: {
      estInscrit: true,
      anneeInscription: 1996,
      statutEnPeril: true,
      criteresSelection: ["x"]
    }
  },
  {
    id: 6,
    nom: "Parc National de l'Upemba",
    statut: "Parc National",
    anneeCreation: 1939,
    superficie: 11730,
    localisation: "Haut-Lomami",
    biodiversite: ["Zèbre de Crawshay", "Éléphant", "Antilope sable", "Oiseaux migrateurs"],
    description: "Écosystème unique mêlant de hauts plateaux herbeux et une vaste dépression lacustre marécageuse.",
    unesco: null
  },
  {
    id: 7,
    nom: "Parc National de Kundelungu",
    statut: "Parc National",
    anneeCreation: 1970,
    superficie: 7600,
    localisation: "Haut-Katanga",
    biodiversite: ["Guépard", "Lion", "Zèbre", "Éléphant"],
    description: "Célèbre pour ses plateaux de savane d'altitude et les chutes de la Lofoi, qui comptent parmi les plus hautes d'Afrique.",
    unesco: null
  },
  {
    id: 8,
    nom: "Parc National de Maïko",
    statut: "Parc National",
    anneeCreation: 1970,
    superficie: 10885,
    localisation: "Nord-Kivu, Tshopo, Maniema",
    biodiversite: ["Gorille de Grauer", "Okapi", "Paon congolais"],
    description: "Zone forestière dense extrêmement isolée, abritant les trois grands animaux endémiques de la faune congolaise.",
    unesco: null
  },
  {
    id: 9,
    nom: "Parc National des Mangroves",
    statut: "Parc National",
    anneeCreation: 1992,
    superficie: 768,
    localisation: "Kongo-Central",
    biodiversite: ["Lamantin d'Afrique", "Tortue marine", "Crabe de mangrove"],
    description: "Unique parc marin et côtier de la RDC, protégeant l'écosystème délicat des mangroves de palétuviers à l'embouchure du fleuve.",
    unesco: null
  },
  {
    id: 10,
    nom: "Parc National de la Lomami",
    statut: "Parc National",
    anneeCreation: 2016,
    superficie: 8879,
    localisation: "Maniema, Tshopo",
    biodiversite: ["Singe Lesula", "Bonobo", "Okapi", "Éléphant de forêt"],
    description: "Le plus jeune parc national du pays, créé suite à la découverte scientifique majeure en 2007 du Lesula.",
    unesco: null
  }
];

module.exports = { listeParcsRDC };
