import type { Strings } from './en'

export const fr: Strings = {
  name: 'Ayoub ADIL',
  ui: {
    meta: {
      title: 'Ayoub ADIL · Ingénieur logiciel, 3D',
      description: 'Ayoub ADIL, ingénieur logiciel avec une formation en 3D. Je développe des applications et je m’en occupe une fois en production.',
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
      lede: 'J’ai rejoint R&D Vision pour mon stage de fin de master, et l’entreprise m’a embauché ensuite.',
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
      lede: 'D’abord les systèmes industriels sur lesquels j’ai travaillé et ce que j’ai fait sur chacun, puis mes projets de master. Je ne peux pas citer les clients, et les visuels sont des rendus synthétiques.',
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
    lede: 'Je développe des applications logicielles, en commençant par l’architecture, et je continue à m’en occuper une fois livrées. Une partie de mon travail est en 3D, surtout des nuages de points et les viewers qui les affichent. Le reste, ce sont de plus gros systèmes faits de nombreux services, avec les applications qu’utilisent leurs opérateurs. Plusieurs tournent aujourd’hui en production.',
    facts: [
      ['Aujourd’hui', 'Ingénieur logiciel, vision industrielle'],
      ['Formation', 'Master Image & 3D'],
      ['Ce que je fais', 'Développer et maintenir des applications'],
      ['Code', 'C++ · C# · Python'],
    ],
  },
  about: {
    eyebrow: 'À propos',
    title: ['Des logiciels que je construis,', 'et que je fais vivre.'],
    body: [
      'Je suis Ayoub, ingénieur logiciel. J’ai commencé par les maths et l’informatique, puis j’ai fait le Master Image & 3D de l’Université de Strasbourg, où j’ai étudié le rendu, la modélisation géométrique et la réalité virtuelle.',
      'Depuis 2024, je développe des applications et des services pour des clients industriels, des plateformes multi-services aux viewers 3D et aux applications opérateur. Je les installe aussi sur site et je les maintiens ensuite. Beaucoup de ces projets tournent autour de caméras ou de LiDAR, et mon travail, c’est le logiciel autour.',
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
      body: 'Beaucoup de mes projets commencent par des capteurs : caméras linéaires, matricielles, temps de vol et thermiques, et LiDAR. Je les connecte, je les règle et je fais en sorte qu’ils acquièrent en synchro avec le reste du système.',
      refs: ['Plateforme d’inspection de tunnel', 'Inspection de voie', 'Barrière de sécurité LiDAR'],
    },
    reconstruct: {
      verb: 'Je reconstruis',
      object: 'la géométrie.',
      body: 'Viennent ensuite les données 3D. J’ai travaillé avec des nuages de points, des images de profondeur, la calibration stéréo et le SLAM visuel, et j’écris les viewers qui affichent le résultat.',
      refs: ['Reconstruction 3D de tunnels', 'Suivi de la pâte', 'Barrière de sécurité LiDAR'],
    },
    detect: {
      verb: 'Je détecte',
      object: 'ce qui compte.',
      body: 'Au bout du compte, le client veut un chiffre ou une décision, comme la hauteur de la pâte ou une alarme quand quelqu’un s’approche d’un bus en charge. Je calibre les capteurs et j’écris le traitement, et ça doit tenir sur site, sous la pluie et avec le bus qui bouge.',
      refs: ['Barrière de sécurité LiDAR', 'Suivi de la pâte', 'Détection de niches'],
    },
    interface: {
      verb: 'Je construis',
      object: 'l’interface.',
      body: 'C’est la partie que les gens voient vraiment. J’ai développé une application de poste d’aiguillage sur trois écrans, une application tablette pour l’opérateur et des outils pour rejouer et comparer d’anciens passages. J’essaie de les garder simples à utiliser.',
      refs: ['Assistant de poste d’aiguillage', 'Plateforme d’inspection de tunnel', 'Inspection de défauts de tissu'],
    },
    ship: {
      verb: 'Je livre',
      object: 'en production.',
      body: 'La livraison n’est pas la fin. J’installe mes applications sur site, je corrige ce qui remonte et je refactore quand un produit doit grandir. C’est comme ça que le logiciel d’inspection de voie est devenu une seule application pour trois configurations de véhicule.',
      refs: ['Inspection de voie'],
    },
  },
  projects: {
    'tunnel-platform': {
      title: 'Plateforme d’inspection de tunnel',
      client: 'Exploitant de tunnel ferroviaire',
      summary: 'Un camion d’inspection traverse le tunnel sur un train et filme les équipements des parois et de la voûte, pour leur maintenance. À l’arrière, 22 caméras couvrent chacune leur zone. Deux caméras latérales lisent les panneaux de positionnement, et plus de 100 éclairages couvrent chacun une section. Il y a aussi des caméras thermiques, du RFID et du GPS, des batteries et une centrale incendie. Treize services et applications gèrent l’acquisition à bord, puis le téléversement, l’archivage, l’inspection multi-écrans et la comparaison entre passages.',
      did: [
        'Développement de la plupart des services et de la communication entre eux',
        'Développement de toutes les applications : tablette opérateur, inspection multi-écrans, comparaison historique',
      ],
    },
    'lidar-barrier': {
      title: 'Barrière de sécurité LiDAR pour la recharge haute tension de bus électriques',
      client: 'Constructeur du secteur transport',
      summary: 'Le bus se recharge en haute tension par le dessous, donc personne ne doit s’en approcher. Deux LiDAR en haut du bus scannent une ligne devant lui et le long de son côté droit. Tout ce qui approche, même une canne, est détecté, sans fausse alerte due à la pluie, à la neige ou aux secousses et à l’inclinaison du bus. Le conducteur reçoit une alerte, puis le courant est coupé.',
      did: [
        'Traitement des nuages de points qui distingue les vraies intrusions de la pluie, de la neige et des mouvements du bus',
        'Intégration et calibration des LiDAR',
        'Développement de l’interface opérateur',
      ],
    },
    'dough-tof': {
      title: 'Suivi 3D de la pâte dans un four industriel',
      client: 'Groupe agroalimentaire',
      summary: 'Une caméra temps de vol en haut du four fournit des images de profondeur et un nuage de points. À partir de là, le logiciel suit la hauteur et le volume de la pâte pendant la cuisson.',
      did: [
        'Intégration de la caméra ToF',
        'Développement du viewer 3D et de l’affichage de l’image de profondeur',
        'Développement de l’interface opérateur',
      ],
    },
    'track-inspection': {
      title: 'Logiciel d’inspection de voie, 3 configurations de véhicule',
      client: 'Société d’inspection ferroviaire',
      summary: 'Six caméras linéaires, trois par rail (vue de dessus, intérieure et extérieure), prennent chacune une ligne par millimètre parcouru. Une caméra matricielle à l’avant filme l’environnement pour qu’on puisse localiser chaque image de rail. Les inspecteurs relisent les séquences pour décider quel rail a besoin de maintenance, et à quel endroit.',
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
      summary: 'Les agents de poste d’aiguillage l’utilisent sur trois écrans pour préparer et commander les itinéraires. Elle montre les aiguilles à manœuvrer et les zones où passent des trains. Tout est enregistré, donc un agent peut rejouer ce qui s’est passé sur les tables d’aiguillage. Chaque table a 3 caméras et éclairages, et chaque poste a 2 tables.',
      did: [
        'Développement de l’application complète',
        'Enregistrement, historique et mode replay',
      ],
    },
    'slam-tunnels': {
      title: 'Reconstruction 3D de tunnels ferroviaires et de métro à partir d’images',
      client: 'Stage de master',
      summary: 'J’ai fait tourner du SLAM visuel (ORB-SLAM et PLVS) sur des images réelles de tunnels ferroviaires, de trains et du métro, pour voir à quel point il pouvait les reconstruire en 3D. Il a fallu passer par la calibration stéréo, les nuages de points, la reconstruction et la visualisation.',
      did: [
        'Étude bibliographique du SLAM visuel',
        'Mise en œuvre et exécution d’ORB-SLAM et de PLVS',
        'Application aux images réelles de rail et de métro, et analyse des résultats',
      ],
    },
    fabric: {
      title: 'Inspection de défauts de tissu',
      client: 'Maison de luxe',
      summary: 'Le tissu est posé sur une table d’inspection. Dès qu’aucune main n’est dans le champ, le système prend l’image, la recale, trouve la forme et cherche les défauts avec un modèle entraîné. Ma partie, c’était l’interface opérateur, y compris les outils qui servent à construire les jeux de données d’entraînement du modèle.',
      did: [
        'Développement de l’interface opérateur',
        'Développement des outils de création de jeux de données',
      ],
    },
    'train-passage': {
      title: 'Détection de passages de trains',
      client: 'Opérateur ferroviaire',
      summary: 'Le système détecte les passages de trains. J’ai écrit l’application de consultation de ses données, et le service qui transmet ces données à d’autres applications et à une interface web.',
      did: [
        'Développement de l’application de consultation des données',
        'Développement du service de données',
      ],
    },
    'metro-niches': {
      title: 'Détection de niches dans les tunnels de métro',
      client: 'Opérateur de transport urbain',
      summary: 'Dans les tunnels de métro, les niches sont de petits refuges dans la paroi au niveau du sol, assez grands pour deux personnes, où les techniciens attendent pendant le passage d’une rame. J’ai repris le code d’un collègue et terminé l’application qui les détecte.',
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
      summary: 'Un path tracer GPU que j’ai écrit pour étudier l’échantillonnage Monte Carlo, testé sur des scènes avec réflexions, ombres et objets transparents.',
      alts: [
        'Path tracer convergeant sur une scène avec des colonnes et des sphères',
        'Path tracer à côté de son panneau de réglages',
      ],
    },
    'vr-protocols': {
      title: 'Protocoles expérimentaux en réalité virtuelle',
      context: 'Projet de master · laboratoire ICube',
      summary: 'J’ai conçu et développé des environnements virtuels pour la recherche en psychologie, et amené la VR dans des applications de thérapie.',
      alts: ['Environnements virtuels conçus pour la recherche en psychologie'],
    },
    'vr-interaction': {
      title: 'Interaction avec des objets en réalité virtuelle',
      context: 'Projet de recherche · laboratoire ICube',
      summary: 'Un framework sous Unreal Engine 5 pour manipuler des objets 3D avec les gestes de la main et la posture du corps.',
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
    lede: 'C’est le plus gros système sur lequel j’ai travaillé. Je n’ai pas fait le matériel. J’ai écrit la plupart des services et la façon dont ils communiquent, et toutes les applications, de l’acquisition dans le camion aux outils des inspecteurs une fois le passage terminé.',
    layers: {
      hw: 'Dans le camion',
      rt: 'Services d’acquisition',
      sup: 'Supervision',
      post: 'Après le passage',
    },
    nodes: {
      rear: {
        label: '22 caméras arrière',
        desc: '22 caméras à l’arrière du camion. Chacune a sa propre orientation et filme une zone du tunnel où des équipements sont montés sur les parois ou la voûte.',
      },
      side: {
        label: '2 caméras latérales',
        desc: 'Deux caméras sur le côté du camion filment les panneaux qui indiquent où se trouve le camion dans le tunnel.',
      },
      lights: {
        label: '100+ éclairages',
        desc: 'Plus de 100 éclairages, chacun sur sa section du tunnel.',
      },
      thermal: {
        label: 'Caméras thermiques',
        desc: 'Caméras thermiques à bord du camion.',
      },
      rfid: {
        label: 'RFID + GPS',
        desc: 'Indiquent quand le camion entre dans le tunnel et en sort, et par quelle entrée et quelle sortie.',
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
        desc: 'Repère l’entrée et la sortie grâce au RFID et au GPS, ce qui lance l’acquisition et les triggers.',
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
        desc: 'Lit les panneaux le long du tunnel, pour que chaque image ait la position où elle a été prise et que l’opérateur voie où en est le passage.',
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
        desc: 'L’application tablette de l’opérateur : tout ce qu’il doit vérifier et suivre pendant le passage.',
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
        desc: 'Une grande application multi-écrans pour relire les séquences, avec toutes les caméras synchronisées et une base de données derrière.',
      },
      history: {
        label: 'Historique',
        desc: 'Met des passages côte à côte : le même endroit, vu par la même caméra, à deux dates différentes.',
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
    summary: 'J’ai travaillé seul, en binôme et dans des équipes plus grandes, selon les projets. J’installe ce que je livre et j’en fais le support ensuite.',
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
