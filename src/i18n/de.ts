// German strings. Same shape as en.ts (type-checked against `Strings`).
import type { Strings } from './en'

export const de: Strings = {
  name: 'Ayoub ADIL',
  ui: {
    meta: {
      title: 'Ayoub ADIL · Softwareentwickler, 3D',
      description: 'Ayoub ADIL, Softwareentwickler mit Hintergrund in 3D. Ich baue Anwendungen und betreue sie, wenn sie in Produktion sind.',
    },
    skip: 'Zum Inhalt springen',
    home: 'Ayoub ADIL, Startseite',
    menu: 'Menü',
    close: 'Schließen',
    language: 'Sprache',
    nav: {
      about: 'Über mich',
      experience: 'Erfahrung',
      education: 'Ausbildung',
      projects: 'Projekte',
      skills: 'Kenntnisse',
      cv: 'Lebenslauf',
      contact: 'Kontakt',
    },
    hero: {
      seeProjects: 'Meine Projekte ansehen',
      viewCv: 'Lebenslauf ansehen',
      scroll: 'Scrollen',
      scrollAria: 'Zu „Über mich“ scrollen',
    },
    about: {
      languages: 'Sprachen',
      outsideWork: 'Außerhalb der Arbeit',
      portraitAlt: 'Porträt von Ayoub ADIL',
    },
    whatIDo: 'Was ich mache',
    experience: {
      eyebrow: 'Erfahrung',
      title: ['Vom Masterpraktikanten', 'zum Softwareentwickler.'],
      lede: 'Ich kam für mein Abschlusspraktikum im Master zu R&D Vision, und danach haben sie mich eingestellt.',
    },
    present: 'heute',
    education: {
      eyebrow: 'Ausbildung',
      title: ['Von der Mathematik', 'zum Master in 3D.'],
      earlier: 'Davor',
      recommendationLetter: 'Empfehlungsschreiben',
    },
    projects: {
      eyebrow: 'Projekte',
      title: ['Was ich gebaut habe,', 'und mein Anteil daran.'],
      lede: 'Zuerst die Industriesysteme, an denen ich gearbeitet habe, und was ich jeweils gebaut habe, dann meine Masterprojekte. Die Kunden darf ich nicht nennen, und die Bilder sind synthetische Renderings.',
      industrial: 'Industrieprojekte',
      academic: 'Studium & Privat',
      academicNote: 'Rendering, Virtual Reality, Full-Stack',
      myRole: 'Meine Rolle',
      more: '+ {n} weitere',
      details: 'Details',
      detailsArchitecture: 'Details + Architektur',
      showDetails: 'Details anzeigen',
      projectOf: 'Projekt {i} von {n}',
      previousProject: 'Vorheriges Projekt',
      nextProject: 'Nächstes Projekt',
      syntheticRender: 'synthetisches Rendering',
      stack: 'Stack',
      architecture: 'Architektur',
      hoverHint: 'Fahren Sie über einen anderen Dienst oder tippen Sie ihn an, um zu sehen, was ihn speist.',
      media: 'Medien',
      showMedia: 'Element {i} von {n} anzeigen',
      previousMedia: 'Vorheriges Medium',
      nextMedia: 'Nächstes Medium',
    },
    skills: {
      eyebrow: 'Kenntnisse',
      title: ['Mein Werkzeugkasten,', 'von Shadern bis Sensoren.'],
    },
    contact: {
      eyebrow: 'Kontakt',
      title: ['Offen für', '3D-Softwarestellen.'],
      line: 'Am schnellsten erreichen Sie mich per E-Mail oder LinkedIn.',
      backToTop: 'Nach oben',
    },
    cv: {
      site: 'Website',
      print: 'Drucken',
      download: 'PDF herunterladen',
      experience: 'Berufserfahrung',
      industrial: 'Industrieprojekte · 2024 – heute',
      academic: 'Masterpraktikum & Studienprojekte',
      education: 'Ausbildung',
      skills: 'Kenntnisse',
      languages: 'Sprachen',
    },
  },
  status: {
    'In production': 'In Produktion',
    Delivered: 'Ausgeliefert',
    'In progress': 'In Arbeit',
    'Proof of concept': 'Proof of Concept',
  },
  location: 'Großraum Paris, Frankreich',
  languageNames: {
    Arabic: 'Arabisch',
    French: 'Französisch',
    English: 'Englisch',
    German: 'Deutsch',
  },
  languageLevels: {
    Native: 'Muttersprache',
    Fluent: 'Fließend',
    Conversational: 'Konversationssicher',
    Learning: 'Lerne ich gerade',
  },
  hero: {
    title: ['Softwareentwickler,', 'mit 3D-Expertise.'],
    lede: 'Ich baue Softwareanwendungen, angefangen bei der Architektur, und kümmere mich auch nach der Auslieferung weiter um sie. Ein Teil meiner Arbeit ist 3D, vor allem Punktwolken und die Viewer, die sie anzeigen. Der Rest sind größere Systeme aus vielen Diensten, dazu die Anwendungen für ihre Bediener. Mehrere davon laufen heute in Produktion.',
    facts: [
      ['Aktuell', 'Softwareentwickler, industrielle Bildverarbeitung'],
      ['Ausbildung', 'Master, Image & 3D'],
      ['Was ich mache', 'Anwendungen bauen und warten'],
      ['Code', 'C++ · C# · Python'],
    ],
  },
  about: {
    eyebrow: 'Über mich',
    title: ['Software, die ich baue', 'und am Laufen halte.'],
    body: [
      'Ich bin Ayoub, Softwareentwickler. Angefangen habe ich mit Mathematik und Informatik, dann kam der Master Image & 3D an der Université de Strasbourg, wo ich Rendering, geometrische Modellierung und Virtual Reality studiert habe.',
      'Seit 2024 baue ich Anwendungen und Dienste für Industriekunden, von Plattformen aus mehreren Diensten bis zu 3D-Viewern und Bedien-Apps. Ich installiere sie auch vor Ort und warte sie danach. Viele dieser Projekte drehen sich um Kameras oder LiDAR, und meine Aufgabe ist die Software drumherum.',
    ],
    outside: {
      category: 'Gaming',
      mode: 'Competitive',
      percentile: 'Top 9 % aller Spieler im Ranglistenmodus',
    },
  },
  steps: {
    capture: {
      verb: 'Ich erfasse',
      object: 'die Szene.',
      body: 'Viele meiner Projekte beginnen mit Sensoren: Zeilen-, Flächen-, Time-of-Flight- und Wärmebildkameras sowie LiDAR. Ich schließe sie an, richte sie ein und sorge dafür, dass sie synchron mit dem restlichen System erfassen.',
      refs: ['Tunnelinspektionsplattform', 'Gleisinspektion', 'LiDAR-Sicherheitsbarriere'],
    },
    reconstruct: {
      verb: 'Ich rekonstruiere',
      object: 'die Geometrie.',
      body: 'Dann kommen die 3D-Daten. Ich habe mit Punktwolken, Tiefenbildern, Stereokalibrierung und Visual SLAM gearbeitet, und ich schreibe die Viewer, die das Ergebnis zeigen.',
      refs: ['3D-Tunnelrekonstruktion', 'Teigüberwachung', 'LiDAR-Sicherheitsbarriere'],
    },
    detect: {
      verb: 'Ich erkenne,',
      object: 'was zählt.',
      body: 'Am Ende will der Kunde eine Zahl oder eine Entscheidung, etwa die Höhe des Teigs oder einen Alarm, wenn jemand auf einen ladenden Bus zugeht. Ich kalibriere die Sensoren und schreibe die Verarbeitung. Das muss vor Ort halten, im Regen und wenn der Bus sich bewegt.',
      refs: ['LiDAR-Sicherheitsbarriere', 'Teigüberwachung', 'Nischenerkennung'],
    },
    interface: {
      verb: 'Ich baue',
      object: 'die Oberfläche.',
      body: 'Diesen Teil sehen die Leute wirklich. Ich habe eine Stellwerksanwendung auf drei Bildschirmen gebaut, eine Tablet-App für Bediener und Werkzeuge, um vergangene Fahrten abzuspielen und zu vergleichen. Ich versuche, sie einfach bedienbar zu halten.',
      refs: ['Stellwerksassistent', 'Tunnelinspektionsplattform', 'Stofffehlerprüfung'],
    },
    ship: {
      verb: 'Ich bringe es',
      object: 'in Produktion.',
      body: 'Mit der Auslieferung ist es nicht vorbei. Ich installiere meine Anwendungen vor Ort, behebe, was auftaucht, und refaktoriere, wenn ein Produkt wachsen muss. So wurde aus der Gleisinspektionssoftware eine App für drei Fahrzeugkonfigurationen.',
      refs: ['Gleisinspektion'],
    },
  },
  projects: {
    'tunnel-platform': {
      title: 'Tunnelinspektionsplattform',
      client: 'Betreiber eines Eisenbahntunnels',
      summary: 'Ein Inspektions-Lkw fährt auf einem Zug durch den Tunnel und filmt die Ausrüstung an Wänden und Decke, damit sie gewartet werden kann. Hinten deckt jede der 22 Kameras ihre eigene Zone ab. Zwei Seitenkameras lesen die Positionsschilder, und mehr als 100 Leuchten decken je einen Abschnitt ab. Dazu kommen Wärmebildkameras, RFID und GPS, Batterien und eine Brandmelderzentrale. Dreizehn Dienste und Anwendungen steuern die Erfassung an Bord, danach Upload, Archivierung, Mehrbildschirm-Inspektion und den Vergleich zwischen Fahrten.',
      did: [
        'Großteil der Dienste und die Kommunikation zwischen ihnen entwickelt',
        'Alle Anwendungen entwickelt: Bediener-Tablet, Mehrbildschirm-Inspektion, Verlaufsvergleich',
      ],
    },
    'lidar-barrier': {
      title: 'LiDAR-Sicherheitsbarriere für das Hochvoltladen von E-Bussen',
      client: 'Hersteller aus dem Verkehrssektor',
      summary: 'Der Bus lädt von unten mit Hochspannung, also darf niemand in die Nähe kommen. Zwei LiDARs oben am Bus scannen eine Linie vor ihm und entlang seiner rechten Seite. Alles, was sich nähert, selbst ein Gehstock, wird erkannt, ohne Fehlalarme durch Regen, Schnee oder Erschütterungen und Neigung des Busses. Der Fahrer bekommt eine Warnung, dann wird der Strom abgeschaltet.',
      did: [
        'Punktwolkenverarbeitung geschrieben, die echte Eindringlinge von Regen, Schnee und Busbewegungen unterscheidet',
        'LiDARs integriert und kalibriert',
        'Bedienoberfläche entwickelt',
      ],
    },
    'dough-tof': {
      title: '3D-Teigüberwachung in einem Industrieofen',
      client: 'Lebensmittelkonzern',
      summary: 'Eine Time-of-Flight-Kamera oben im Ofen liefert Tiefenbilder und eine Punktwolke. Daraus verfolgt die Software Höhe und Volumen des Teigs während des Backens.',
      did: [
        'ToF-Kamera integriert',
        '3D-Viewer und Tiefenbildanzeige entwickelt',
        'Bedienoberfläche entwickelt',
      ],
    },
    'track-inspection': {
      title: 'Gleisinspektionssoftware, 3 Fahrzeugkonfigurationen',
      client: 'Gleisinspektionsunternehmen',
      summary: 'Sechs Zeilenkameras, drei pro Schiene (Draufsicht, Innen- und Außenansicht), nehmen jeweils eine Zeile pro Millimeter Fahrweg auf. Eine nach vorne gerichtete Flächenkamera filmt die Umgebung, damit sich jedes Schienenbild verorten lässt. Prüfer spielen die Sequenzen ab und entscheiden, welche Schiene wo gewartet werden muss.',
      did: [
        'Code eines Kollegen übernommen und Fehlfunktionen behoben',
        'Zu einer modularen Anwendung für die 3 Konfigurationen refaktoriert',
        'Auf Zügen installiert',
        'Support und Wartung',
      ],
    },
    'signal-box': {
      title: 'Assistent für die Fahrstraßeneinstellung im Stellwerk',
      client: 'Bahnbetreiber',
      summary: 'Stellwerksbediener arbeiten damit auf drei Bildschirmen, um Fahrstraßen vorzubereiten und einzustellen. Die Anwendung zeigt, welche Weichen gestellt werden müssen und durch welche Zonen Züge fahren. Alles wird aufgezeichnet, sodass ein Bediener abspielen kann, was auf den Stelltischen passiert ist. Jeder Tisch hat 3 Kameras und Leuchten, jedes Stellwerk 2 Tische.',
      did: [
        'Die komplette Anwendung entwickelt',
        'Aufzeichnung, Verlauf und Replay-Modus',
      ],
    },
    'slam-tunnels': {
      title: '3D-Rekonstruktion von Eisenbahn- und U-Bahn-Tunneln aus Bildern',
      client: 'Masterpraktikum',
      summary: 'Ich habe Visual SLAM (ORB-SLAM und PLVS) auf reale Aufnahmen von Eisenbahntunneln, Zügen und der U-Bahn angewandt, um zu sehen, wie gut es sie in 3D nachbilden kann. Dazu gehörten Stereokalibrierung, Punktwolken, Rekonstruktion und Visualisierung.',
      did: [
        'Literaturrecherche zu Visual SLAM',
        'ORB-SLAM und PLVS implementiert und ausgeführt',
        'Auf reale Eisenbahn- und U-Bahn-Aufnahmen angewandt und die Ergebnisse analysiert',
      ],
    },
    fabric: {
      title: 'Stofffehlerprüfung',
      client: 'Luxusmodehaus',
      summary: 'Der Stoff wird auf einen Prüftisch gelegt. Sobald keine Hände mehr im Bild sind, nimmt das System das Bild auf, richtet es aus, erkennt die Form und sucht mit einem trainierten Modell nach Fehlern. Mein Teil war die Bedienoberfläche, samt den Werkzeugen, mit denen die Trainingsdatensätze des Modells entstehen.',
      did: [
        'Bedienoberfläche entwickelt',
        'Werkzeuge zur Datensatzerstellung entwickelt',
      ],
    },
    'train-passage': {
      title: 'Erkennung von Zugdurchfahrten',
      client: 'Bahnbetreiber',
      summary: 'Das System erkennt vorbeifahrende Züge. Ich habe die Anwendung geschrieben, mit der man seine Daten durchsucht, und den Dienst, der diese Daten an andere Anwendungen und an eine Weboberfläche weitergibt.',
      did: [
        'Anwendung zum Durchsuchen der Daten entwickelt',
        'Datendienst entwickelt',
      ],
    },
    'metro-niches': {
      title: 'Nischenerkennung in U-Bahn-Tunneln',
      client: 'Betreiber des städtischen Nahverkehrs',
      summary: 'In U-Bahn-Tunneln sind Nischen kleine Schutzräume in der Wand auf Bodenhöhe, groß genug für zwei Personen, in denen Techniker warten, während ein Zug vorbeifährt. Ich habe den Code eines Kollegen übernommen und die Anwendung fertiggestellt, die sie erkennt.',
      did: [
        'Code eines Kollegen übernommen',
        'Anwendung zur Nischenerkennung fertiggestellt',
      ],
    },
  },
  academic: {
    'path-tracing': {
      title: 'Monte-Carlo-Path-Tracing',
      context: 'Kursprojekt im Master',
      summary: 'Ein GPU-Path-Tracer, den ich geschrieben habe, um Monte-Carlo-Sampling zu untersuchen, getestet an Szenen mit Reflexionen, Schatten und transparenten Objekten.',
      alts: [
        'Path-Tracer, der auf einer Szene mit Säulen und Kugeln konvergiert',
        'Path-Tracer neben seinem Einstellungsfenster',
      ],
    },
    'vr-protocols': {
      title: 'Experimentelle Protokolle in Virtual Reality',
      context: 'Masterprojekt · Labor ICube',
      summary: 'Ich habe virtuelle Umgebungen für die psychologische Forschung entworfen und gebaut und VR in Therapieanwendungen eingebracht.',
      alts: ['Virtuelle Umgebungen für die psychologische Forschung'],
    },
    'vr-interaction': {
      title: 'Interaktion mit Objekten in Virtual Reality',
      context: 'Forschungsprojekt · Labor ICube',
      summary: 'Ein Framework in Unreal Engine 5, mit dem sich 3D-Objekte über Handgesten und Körperhaltung handhaben lassen.',
      alts: [
        'Im Projekt verwendete Motion-Capture-Handschuhe',
        'Ich im Motion-Capture-Anzug, der einen 3D-Avatar in Echtzeit steuert',
      ],
    },
    'smart-home': {
      title: 'Smart Home',
      context: 'Bachelorpraktikum · FST Mohammedia',
      summary: 'Eine Web-App, eine Android-App, eine Konsole und eine API, um Smart Homes aus der Ferne zu verwalten.',
      alts: ['Startbildschirm der Smart-Home-App'],
    },
  },
  architecture: {
    eyebrow: 'Fallstudie · Tunnelinspektionsplattform',
    title: ['Ein Lkw,', 'dreizehn Dienste.'],
    lede: 'Das ist das größte System, an dem ich gearbeitet habe. Die Hardware habe ich nicht gemacht. Ich habe den Großteil der Dienste geschrieben und die Art, wie sie miteinander kommunizieren, dazu jede Anwendung, von der Erfassung auf dem Lkw bis zu den Werkzeugen, die Prüfer nach der Fahrt nutzen.',
    layers: {
      hw: 'Auf dem Lkw',
      rt: 'Erfassungsdienste',
      sup: 'Überwachung',
      post: 'Nach der Fahrt',
    },
    nodes: {
      rear: {
        label: '22 Heckkameras',
        desc: '22 Kameras hinten am Lkw. Jede zeigt in ihre eigene Richtung und filmt eine Zone des Tunnels, in der Ausrüstung an den Wänden oder der Decke montiert ist.',
      },
      side: {
        label: '2 Seitenkameras',
        desc: 'Zwei Kameras an der Seite des Lkw filmen die Schilder, an denen man sieht, wo im Tunnel der Lkw gerade ist.',
      },
      lights: {
        label: '100+ Leuchten',
        desc: 'Mehr als 100 Leuchten, jede beleuchtet ihren eigenen Tunnelabschnitt.',
      },
      thermal: {
        label: 'Wärmebildkameras',
        desc: 'Wärmebildkameras an Bord des Lkw.',
      },
      rfid: {
        label: 'RFID + GPS',
        desc: 'Zeigen an, wann der Lkw in den Tunnel ein- und wieder ausfährt, und durch welche Ein- und Ausfahrt.',
      },
      batt: {
        label: 'Batterien',
        desc: 'Batterien, die das Bordsystem versorgen.',
      },
      fire: {
        label: 'Brandmelderzentrale',
        desc: 'Brandmelderzentrale mit ihren Meldern und Auslösern.',
      },
      tunnel: {
        label: 'Tunnelein-/-ausfahrt',
        desc: 'Erkennt über RFID und GPS die Ein- und Ausfahrt, und damit starten die Erfassung und die Trigger.',
      },
      sync: {
        label: 'Synchronisation',
        desc: 'Sendet die Trigger gleichzeitig an Kameras und Leuchten, mit der gewählten Frequenz.',
      },
      acq: {
        label: 'Videoerfassung',
        desc: 'Erfasst die Videosequenzen der Kameras.',
      },
      light: {
        label: 'Beleuchtung',
        desc: 'Konfiguriert das Blitzen der Leuchten, prüft, ob jede funktioniert, und warnt den Bediener bei einem Ausfall.',
      },
      pos: {
        label: 'Positionierung',
        desc: 'Liest die Schilder entlang des Tunnels. So bekommt jedes Bild die Position, an der es aufgenommen wurde, und der Bediener sieht, wie weit die Fahrt ist.',
      },
      therm: {
        label: 'Wärmebild',
        desc: 'Dienst für die Wärmebildkameras.',
      },
      battery: {
        label: 'Batterie',
        desc: 'Meldet den Zustand der Batterien und ob sie für die gesamte Fahrt reichen.',
      },
      firesvc: {
        label: 'Brandschutz',
        desc: 'Meldet den Zustand der Brandauslöser und -melder.',
      },
      tablet: {
        label: 'Bediener-Tablet',
        desc: 'Die Tablet-App des Bedieners: alles, was er während der Fahrt prüfen und verfolgen muss.',
      },
      upload: {
        label: 'Upload ins Depot',
        desc: 'Lädt am Ende einer Tour die Aufnahmen ins Netzwerk des Depots hoch.',
      },
      archive: {
        label: 'Archivierung',
        desc: 'Komprimiert die Aufnahmen und speichert sie auf dem Archiv-NAS.',
      },
      inspect: {
        label: 'Inspektions-App',
        desc: 'Eine große Mehrbildschirm-App zum Abspielen der Sequenzen, mit allen Kameras synchron und einer Datenbank dahinter.',
      },
      history: {
        label: 'Verlauf',
        desc: 'Stellt Fahrten nebeneinander: dieselbe Stelle, von derselben Kamera, an zwei verschiedenen Tagen.',
      },
    },
  },
  experience: {
    place: 'Industrielle Bildverarbeitung',
    roles: [
      {
        title: 'Software Engineer',
        note: 'Gleiche Stelle, umbenannt, als das Unternehmen seine Berufsbezeichnungen spezialisierte',
      },
      {
        title: 'Application Engineer',
        note: '',
      },
      {
        title: 'F&E-Praktikant',
        note: 'Abschlusspraktikum im Master: 3D-Rekonstruktion aus Bildern',
      },
    ],
    summary: 'Je nach Projekt habe ich allein, zu zweit und in größeren Teams gearbeitet. Was ich ausliefere, installiere ich und betreue es danach.',
  },
  education: [
    {
      title: 'Master Image & 3D',
      org: 'UFR Math-Info · Université de Strasbourg',
      body: 'Schwerpunkt Computergrafik (I3D): geometrische Modellierung, Virtual Reality, Rendering und Bildverarbeitung. Forschungs- und Masterprojekte mit dem Labor ICube.',
    },
    {
      title: 'Bachelor (3. Studienjahr, L3) Informatik',
      org: 'INP-ISIMA · Université Clermont Auvergne',
      body: 'Letztes Jahr eines französischen Bachelors: Algorithmen, Netzwerke, Datenbanken.',
    },
    {
      title: 'Bachelor Informatik, Netzwerke & Multimedia',
      org: 'FST Mohammedia · Université Hassan II',
      body: 'Softwareentwicklung, Netzwerke und Multimedia.',
    },
    {
      title: 'DEUG Mathematik, Informatik & Physik',
      org: 'FST Mohammedia · Université Hassan II',
      body: 'Zweijähriges allgemeines Hochschuldiplom (MIP).',
    },
    {
      title: 'Abitur (Baccalauréat), Schwerpunkt Mathematik',
      org: 'Lycée Ben Msik',
      body: '',
    },
  ],
  recommendationAuthor: 'Abdellah ADIB, Professor, Université Hassan II',
  skills: {
    categories: {
      languages: 'Sprachen',
      '3D & graphics': '3D & Grafik',
      'vision & data': 'Bildverarbeitung & Daten',
      frameworks: 'Frameworks',
      tools: 'Werkzeuge',
      hardware: 'Hardware',
    },
    items: {
      'OpenGL / shaders': 'OpenGL / Shader',
      'Point clouds': 'Punktwolken',
      'Visual SLAM': 'Visual SLAM',
      'Stereo calibration': 'Stereokalibrierung',
      'Line-scan cameras': 'Zeilenkameras',
      'Area-scan cameras': 'Flächenkameras',
      'ToF cameras': 'ToF-Kameras',
      'Thermal cameras': 'Wärmebildkameras',
    },
  },
}
