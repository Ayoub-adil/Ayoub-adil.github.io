import type { Strings } from './en'

export const fr: Strings = {
  name: 'Ayoub ADIL',
  ui: {
    meta: {
      title: 'Ayoub ADIL · Ingénieur logiciel, 3D',
      description: 'Ayoub ADIL, ingénieur logiciel : je conçois, développe et maintiens des applications, avec une formation en 3D (nuages de points, viewers 3D, reconstruction).',
    },
    skip: 'Aller au contenu',
    home: 'Ayoub ADIL, accueil',
    menu: 'Menu',
    close: 'Fermer',
    language: 'Langue',
    nav: {
      about: 'À propos',
      experience: 'Expérience',
      education: 'Formation',
      projects: 'Projets',
      skills: 'Compétences',
      cv: 'CV',
      contact: 'Contact',
    },
    hero: {
      seeProjects: 'Voir mes projets',
      viewCv: 'Voir mon CV',
      scroll: 'Défiler',
      scrollAria: 'Défiler jusqu’à « À propos »',
    },
    about: {
      languages: 'Langues',
      outsideWork: 'En dehors du travail',
      portraitAlt: 'Portrait d’Ayoub ADIL',
    },
    whatIDo: 'Ce que je fais',
    experience: {
      eyebrow: 'Expérience',
      title: ['De stagiaire de master', 'à ingénieur logiciel.'],
      lede: 'J’ai rejoint R&D Vision pour mon stage de fin de master, puis j’ai été embauché.',
    },
    present: 'Aujourd’hui',
    education: {
      eyebrow: 'Formation',
      title: ['Des mathématiques', 'à un master en 3D.'],
      earlier: 'Avant',
      recommendationLetter: 'lettre de recommandation',
    },
    projects: {
      eyebrow: 'Projets',
      title: ['Ce que j’ai construit,', 'et ma part dans chaque projet.'],
      lede: 'Les systèmes industriels sur lesquels j’ai travaillé, avec ce que j’ai réalisé sur chacun, puis mes projets de master. Les clients sont anonymisés ; les visuels sont des rendus synthétiques.',
      industrial: 'Projets industriels',
      academic: 'Académiques et personnels',
      academicNote: 'Rendu, réalité virtuelle, full-stack',
      myRole: 'Mon rôle',
      more: '+ {n} de plus',
      details: 'Détails',
      detailsArchitecture: 'Détails + architecture',
      showDetails: 'Afficher les détails',
      projectOf: 'Projet {i} sur {n}',
      previousProject: 'Projet précédent',
      nextProject: 'Projet suivant',
      syntheticRender: 'rendu synthétique',
      stack: 'Stack',
      architecture: 'Architecture',
      hoverHint: 'Survolez ou touchez un autre service pour voir ce qui l’alimente.',
      media: 'médias',
      showMedia: 'Afficher l’élément {i} sur {n}',
      previousMedia: 'Média précédent',
      nextMedia: 'Média suivant',
    },
    skills: {
      eyebrow: 'Compétences',
      title: ['Ma boîte à outils,', 'des shaders aux capteurs.'],
    },
    contact: {
      eyebrow: 'Contact',
      title: ['Ouvert aux postes', 'de logiciel 3D.'],
      line: 'Le plus rapide pour me joindre : par e-mail ou sur LinkedIn.',
      backToTop: 'Retour en haut',
    },
    cv: {
      site: 'Site',
      print: 'Imprimer',
      download: 'Télécharger le PDF',
      experience: 'Expérience',
      industrial: 'Projets industriels · 2024 – Aujourd’hui',
      academic: 'Stage de master et projets académiques',
      education: 'Formation',
      skills: 'Compétences',
      languages: 'Langues',
    },
  },
  status: {
    'In production': 'En production',
    Delivered: 'Livré',
    'In progress': 'En cours',
    'Proof of concept': 'Preuve de concept',
  },
  location: 'Région parisienne, France',
  languageNames: {
    Arabic: 'Arabe',
    French: 'Français',
    English: 'Anglais',
    German: 'Allemand',
  },
  languageLevels: {
    Native: 'Langue maternelle',
    Fluent: 'Courant',
    Conversational: 'Conversationnel',
    Learning: 'En apprentissage',
  },
  hero: {
    title: ['Ingénieur logiciel,', 'avec une expertise 3D.'],
    lede: 'Je conçois, développe et maintiens des applications logicielles, de la première architecture jusqu’au support après livraison. Je travaille sur du logiciel 3D, comme les nuages de points, les viewers 3D et la reconstruction, et sur des systèmes plus larges : des plateformes multi-services et les applications avec lesquelles leurs utilisateurs travaillent. Plusieurs de mes applications tournent aujourd’hui en production.',
    facts: [
      ['Aujourd’hui', 'Ingénieur logiciel, vision industrielle'],
      ['Formation', 'Master Image & 3D'],
      ['Ce que je fais', 'Conception · développement · maintenance'],
      ['Code', 'C++ · C# · Python'],
    ],
  },
  about: {
    eyebrow: 'À propos',
    title: ['Des logiciels que je conçois,', 'développe et fais vivre.'],
    body: [
      'Je suis Ayoub, ingénieur logiciel avec une formation en 3D. J’y suis arrivé par les mathématiques et l’informatique, puis par le Master Image & 3D de l’Université de Strasbourg : rendu, modélisation géométrique et réalité virtuelle.',
      'Depuis 2024, en tant qu’ingénieur logiciel, je conçois et développe des applications et des services, des plateformes multi-services aux viewers 3D et aux applications opérateur, puis je les installe sur site et les maintiens après livraison. Beaucoup de ces projets s’articulent autour de caméras et de LiDAR ; le logiciel, c’est ce que j’apporte.',
    ],
    outside: {
      category: 'Jeu vidéo',
      mode: 'Compétitif',
      percentile: 'top 9 % de tous les joueurs classés',
    },
  },
  steps: {
    capture: {
      verb: 'Je capture',
      object: 'la scène.',
      body: 'J’intègre des capteurs dans le logiciel : caméras industrielles (linéaires, matricielles, temps de vol, thermiques) et LiDAR. Je les connecte, les configure et synchronise leur acquisition avec le reste du système.',
      refs: ['Plateforme d’inspection de tunnel', 'Inspection de voie', 'Barrière de sécurité LiDAR'],
    },
    reconstruct: {
      verb: 'Je reconstruis',
      object: 'la géométrie.',
      body: 'Je travaille avec des données 3D : nuages de points, images de profondeur, calibration stéréo et reconstruction 3D, et je développe les viewers qui les affichent.',
      refs: ['Reconstruction 3D de tunnels', 'Suivi de la pâte', 'Barrière de sécurité LiDAR'],
    },
    detect: {
      verb: 'Je détecte',
      object: 'ce qui compte.',
      body: 'Je calibre les capteurs, traite leurs données et les transforme en résultat utile au client : une mesure, une détection ou une alerte, fiable dans les conditions réelles du site.',
      refs: ['Barrière de sécurité LiDAR', 'Suivi de la pâte', 'Détection de niches'],
    },
    interface: {
      verb: 'Je construis',
      object: 'l’interface.',
      body: 'Je conçois et développe les applications avec lesquelles les gens travaillent : applications de bureau et multi-écrans, applications tablette, outils de relecture et d’historique, pensés pour être clairs pour ceux qui les utilisent.',
      refs: ['Assistant de poste d’aiguillage', 'Plateforme d’inspection de tunnel', 'Inspection de défauts de tissu'],
    },
    ship: {
      verb: 'Je livre',
      object: 'en production.',
      body: 'J’installe mes applications sur site, les supporte après livraison et les fais évoluer : corrections, et refactoring quand un produit doit grandir.',
      refs: ['Inspection de voie'],
    },
  },
  projects: {
    'tunnel-platform': {
      title: 'Plateforme d’inspection de tunnel',
      client: 'Exploitant de tunnel ferroviaire',
      summary: 'Un camion d’inspection, transporté par train dans le tunnel, filme les équipements installés sur les parois et la voûte pour leur maintenance. 22 caméras arrière couvrent chacune leur zone, 2 caméras latérales lisent les panneaux de positionnement et plus de 100 éclairages éclairent chacun leur section, avec en plus des caméras thermiques, du RFID + GPS, des batteries et une centrale incendie. Treize services et applications gèrent l’acquisition à bord, puis le téléversement, l’archivage, l’inspection multi-écrans et la comparaison entre passages.',
      did: [
        'Développement de la plupart des services et de la communication entre eux',
        'Développement de toutes les applications : tablette opérateur, inspection multi-écrans, comparaison historique',
      ],
    },
    'lidar-barrier': {
      title: 'Barrière de sécurité LiDAR pour la recharge haute tension de bus électriques',
      client: 'Constructeur du secteur transport',
      summary: 'Détecte toute personne ou tout objet, jusqu’à une canne, qui s’approche d’un bus se rechargeant en haute tension par le dessous, sans fausse alerte due à la pluie, à la neige, aux secousses ou à l’inclinaison du bus. Deux LiDAR en haut du bus scannent une ligne devant lui et le long de son côté droit. Le système alerte le conducteur, puis coupe le courant.',
      did: [
        'Traitement des nuages de points qui distingue les vraies intrusions de la pluie, de la neige et des mouvements du bus',
        'Intégration et calibration des LiDAR',
        'Développement de l’interface opérateur',
      ],
    },
    'dough-tof': {
      title: 'Suivi 3D de la pâte dans un four industriel',
      client: 'Groupe agroalimentaire',
      summary: 'Suit la hauteur et le volume de la pâte dans le temps pendant la cuisson, à partir des images de profondeur et du nuage de points d’une caméra temps de vol placée en haut du four.',
      did: [
        'Intégration de la caméra ToF',
        'Développement du viewer 3D et de l’affichage de l’image de profondeur',
        'Développement de l’interface opérateur',
      ],
    },
    'track-inspection': {
      title: 'Logiciel d’inspection de voie, 3 configurations de véhicule',
      client: 'Société d’inspection ferroviaire',
      summary: 'Six caméras linéaires, trois par rail (vue de dessus, intérieure et extérieure), capturent chacune une ligne par millimètre parcouru, et une caméra matricielle orientée vers l’avant enregistre l’environnement pour localiser chaque image de rail. Les inspecteurs relisent les séquences pour décider où chaque rail nécessite une maintenance.',
      did: [
        'Reprise du code d’un collègue et correction des dysfonctionnements',
        'Refactoring en une application modulable pour les 3 configurations',
        'Installation sur les trains',
        'Support et maintenance',
      ],
    },
    'signal-box': {
      title: 'Assistant de commande d’itinéraires en poste d’aiguillage',
      client: 'Opérateur ferroviaire',
      summary: 'Une application sur trois écrans pour les agents de poste d’aiguillage : préparation et commande des itinéraires, détection des aiguilles à manœuvrer, détection des passages de trains par zone, enregistrement complet et relecture de ce qui s’est passé sur les tables d’aiguillage. 3 caméras et éclairages par table, 2 tables par poste.',
      did: [
        'Développement de l’application complète',
        'Enregistrement, historique et mode replay',
      ],
    },
    'slam-tunnels': {
      title: 'Reconstruction 3D de tunnels ferroviaires et de métro à partir d’images',
      client: 'Stage de master',
      summary: 'SLAM visuel (ORB-SLAM, PLVS) appliqué à des images réelles de tunnels ferroviaires, de trains et de métro : calibration stéréo, nuages de points, reconstruction 3D et visualisation.',
      did: [
        'Étude bibliographique du SLAM visuel',
        'Mise en œuvre et exécution d’ORB-SLAM et de PLVS',
        'Application aux images réelles de rail et de métro, et analyse des résultats',
      ],
    },
    fabric: {
      title: 'Inspection de défauts de tissu',
      client: 'Maison de luxe',
      summary: 'Une table d’inspection vérifie que le tissu est posé sans mains dans le champ, prend et recale l’image, détecte sa forme, puis trouve les défauts grâce à un modèle entraîné. J’ai développé l’interface opérateur, y compris les outils de création des jeux de données d’entraînement.',
      did: [
        'Développement de l’interface opérateur',
        'Développement des outils de création de jeux de données',
      ],
    },
    'train-passage': {
      title: 'Détection de passages de trains',
      client: 'Opérateur ferroviaire',
      summary: 'Un système qui détecte les passages de trains. J’ai développé l’application de consultation de ses données et le service qui met ces données à disposition d’applications tierces et d’une interface web.',
      did: [
        'Développement de l’application de consultation des données',
        'Développement du service de données',
      ],
    },
    'metro-niches': {
      title: 'Détection de niches dans les tunnels de métro',
      client: 'Opérateur de transport urbain',
      summary: 'Les niches sont de petits refuges au niveau du sol dans les parois des tunnels de métro, de la taille de deux personnes, où les techniciens s’abritent au passage d’une rame. J’ai repris le code d’un collègue et finalisé l’application qui les détecte.',
      did: [
        'Reprise du code d’un collègue',
        'Finalisation de l’application de détection des niches',
      ],
    },
  },
  academic: {
    'path-tracing': {
      title: 'Path tracing Monte Carlo',
      context: 'Projet de cours de master',
      summary: 'Un path tracer GPU développé pour étudier l’échantillonnage Monte Carlo sur des scènes avec réflexions, ombres et transparence.',
      alts: [
        'Path tracer convergeant sur une scène avec des colonnes et des sphères',
        'Path tracer à côté de son panneau de réglages',
      ],
    },
    'vr-protocols': {
      title: 'Protocoles expérimentaux en réalité virtuelle',
      context: 'Projet de master · laboratoire ICube',
      summary: 'J’ai conçu et développé des environnements virtuels pour la recherche en psychologie, et intégré la VR dans des applications thérapeutiques.',
      alts: ['Environnements virtuels conçus pour la recherche en psychologie'],
    },
    'vr-interaction': {
      title: 'Interaction avec des objets en réalité virtuelle',
      context: 'Projet de recherche · laboratoire ICube',
      summary: 'Un framework de développement sous Unreal Engine 5 qui associe gestes et postures à la manipulation d’objets 3D.',
      alts: [
        'Gants de capture de mouvement utilisés dans le projet',
        'Moi en combinaison de capture de mouvement, pilotant un avatar 3D en temps réel',
      ],
    },
    'smart-home': {
      title: 'Maison connectée',
      context: 'Stage de licence · FST Mohammedia',
      summary: 'Une application web, une application Android, une console et une API pour gérer des maisons connectées à distance.',
      alts: ['Écran d’accueil de l’application de maison connectée'],
    },
  },
  architecture: {
    eyebrow: 'Étude de cas · Plateforme d’inspection de tunnel',
    title: ['Un camion,', 'treize services.'],
    lede: 'Le plus grand système sur lequel j’ai travaillé. Le matériel n’était pas ma partie : j’ai développé la plupart des services et la communication entre eux, ainsi que toutes les applications, de l’acquisition synchronisée à bord du camion aux outils utilisés par les inspecteurs après le passage.',
    layers: {
      hw: 'Dans le camion',
      rt: 'Services d’acquisition',
      sup: 'Supervision',
      post: 'Après le passage',
    },
    nodes: {
      rear: {
        label: '22 caméras arrière',
        desc: '22 caméras à l’arrière du camion, chacune avec sa direction et son point de vue, filment une zone précise du tunnel où des équipements sont installés sur les parois ou la voûte.',
      },
      side: {
        label: '2 caméras latérales',
        desc: 'Deux caméras sur le côté du camion filment les panneaux qui servent à localiser le camion dans le tunnel.',
      },
      lights: {
        label: '100+ éclairages',
        desc: 'Plus de 100 éclairages, chacun éclairant sa propre section du tunnel.',
      },
      thermal: {
        label: 'Caméras thermiques',
        desc: 'Caméras thermiques à bord du camion.',
      },
      rfid: {
        label: 'RFID + GPS',
        desc: 'Servent à détecter l’entrée et la sortie du tunnel, et par quelle entrée et quelle sortie.',
      },
      batt: {
        label: 'Batteries',
        desc: 'Batteries qui alimentent le système embarqué.',
      },
      fire: {
        label: 'Centrale incendie',
        desc: 'Centrale d’alarme incendie avec ses détecteurs et déclencheurs.',
      },
      tunnel: {
        label: 'Entrée / sortie tunnel',
        desc: 'Détecte l’entrée et la sortie à partir du RFID et du GPS, pour savoir quand lancer l’acquisition et les triggers.',
      },
      sync: {
        label: 'Synchronisation',
        desc: 'Envoie les triggers aux caméras et aux éclairages en même temps, à la fréquence choisie.',
      },
      acq: {
        label: 'Acquisition vidéo',
        desc: 'Acquiert les séquences vidéo des caméras.',
      },
      light: {
        label: 'Éclairage',
        desc: 'Configure les flashs des éclairages, vérifie que chacun fonctionne et alerte l’opérateur en cas de panne.',
      },
      pos: {
        label: 'Positionnement',
        desc: 'Lit les panneaux de positionnement du tunnel pour donner la position de prise de chaque image et l’avancement dans le tunnel.',
      },
      therm: {
        label: 'Thermique',
        desc: 'Service des caméras thermiques.',
      },
      battery: {
        label: 'Batterie',
        desc: 'Indique l’état des batteries et si elles tiendront tout le trajet.',
      },
      firesvc: {
        label: 'Incendie',
        desc: 'Indique l’état des déclencheurs et des détecteurs incendie.',
      },
      tablet: {
        label: 'Tablette opérateur',
        desc: 'Application tablette qui permet à l’opérateur de tout vérifier et suivre pendant le passage.',
      },
      upload: {
        label: 'Téléversement au garage',
        desc: 'En fin de tournée, téléverse les acquisitions vers le réseau du garage.',
      },
      archive: {
        label: 'Archivage',
        desc: 'Compresse les acquisitions et les stocke sur le NAS d’archivage.',
      },
      inspect: {
        label: 'Application d’inspection',
        desc: 'Grande application multi-écrans pour relire les séquences : multi-caméras, synchronisation et base de données.',
      },
      history: {
        label: 'Historique',
        desc: 'Compare plusieurs passages : l’aspect d’un endroit précis vu par une caméra donnée à la date x et à la date y.',
      },
    },
  },
  experience: {
    place: 'Vision industrielle',
    roles: [
      {
        title: 'Ingénieur logiciel',
        note: 'Même poste, renommé quand l’entreprise a spécialisé ses intitulés',
      },
      {
        title: 'Ingénieur d’application',
        note: '',
      },
      {
        title: 'Stagiaire R&D',
        note: 'Stage de fin de master : reconstruction 3D à partir d’images',
      },
    ],
    summary: 'Selon les projets, je travaille seul, en binôme ou dans une équipe plus large, et j’installe et supporte ce que je livre.',
  },
  education: [
    {
      title: 'Master Image & 3D',
      org: 'UFR Mathématique et Informatique · Université de Strasbourg',
      body: 'Parcours informatique graphique (I3D) : modélisation géométrique, réalité virtuelle, rendu et traitement d’images. Projets de recherche et de master avec le laboratoire ICube.',
    },
    {
      title: 'Licence (L3) Informatique',
      org: 'INP-ISIMA · Université Clermont Auvergne',
      body: 'Troisième année de licence : algorithmique, réseaux, bases de données.',
    },
    {
      title: 'Licence Sciences et Techniques : Informatique, Réseaux et Multimédia',
      org: 'FST Mohammedia · Université Hassan II',
      body: 'Développement logiciel, réseaux et multimédia.',
    },
    {
      title: 'DEUG Mathématiques, Informatique, Physique (MIP)',
      org: 'FST Mohammedia · Université Hassan II',
      body: 'Diplôme d’études universitaires générales en deux ans (MIP).',
    },
    {
      title: 'Baccalauréat Sciences Mathématiques',
      org: 'Lycée Ben Msik',
      body: '',
    },
  ],
  recommendationAuthor: 'Abdellah ADIB, professeur, Université Hassan II',
  skills: {
    categories: {
      languages: 'langages',
      '3D & graphics': '3D et graphisme',
      'vision & data': 'vision et données',
      frameworks: 'frameworks',
      tools: 'outils',
      hardware: 'matériel',
    },
    items: {
      'OpenGL / shaders': 'OpenGL / shaders',
      'Point clouds': 'Nuages de points',
      'Visual SLAM': 'SLAM visuel',
      'Stereo calibration': 'Calibration stéréo',
      'Line-scan cameras': 'Caméras linéaires',
      'Area-scan cameras': 'Caméras matricielles',
      'ToF cameras': 'Caméras ToF',
      'Thermal cameras': 'Caméras thermiques',
    },
  },
}
