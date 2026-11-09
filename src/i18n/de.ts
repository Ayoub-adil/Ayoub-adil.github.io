// German strings. Same shape as en.ts (type-checked against `Strings`).
import type { Strings } from './en'

export const de: Strings = {
  name: 'Ayoub ADIL',
  ui: {
    meta: {
      title: 'Ayoub ADIL · Softwareentwickler, 3D',
      description: 'Ayoub ADIL, Softwareentwickler: Ich konzipiere, entwickle und warte Anwendungen, mit einem Hintergrund in 3D (Punktwolken, 3D-Viewer, Rekonstruktion).',
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
      lede: 'Ich kam für mein Abschlusspraktikum im Master zu R&D Vision und wurde danach übernommen.',
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
      lede: 'Industrielle Systeme, an denen ich gearbeitet habe, jeweils mit meinem Beitrag, dann Projekte aus meinem Master. Die Kunden sind anonymisiert; die Bilder sind synthetische Renderings.',
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
    lede: 'Ich konzipiere, entwickle und warte Softwareanwendungen, von der ersten Architektur bis zum Support nach der Auslieferung. Ich arbeite an 3D-Software, etwa Punktwolken, 3D-Viewern und Rekonstruktion, und an größeren Systemen: Plattformen aus mehreren Diensten und den Anwendungen, mit denen ihre Nutzer arbeiten. Mehrere meiner Anwendungen laufen heute in Produktion.',
    facts: [
      ['Aktuell', 'Softwareentwickler, industrielle Bildverarbeitung'],
      ['Ausbildung', 'Master, Image & 3D'],
      ['Was ich mache', 'Konzeption · Entwicklung · Wartung'],
      ['Code', 'C++ · C# · Python'],
    ],
  },
  about: {
    eyebrow: 'Über mich',
    title: ['Software, die ich konzipiere,', 'baue und am Laufen halte.'],
    body: [
      'Ich bin Ayoub, Softwareentwickler mit einem Hintergrund in 3D. Dazu kam ich über Mathematik und Informatik, dann über den Master Image & 3D an der Université de Strasbourg: Rendering, geometrische Modellierung und Virtual Reality.',
      'Seit 2024 konzipiere und entwickle ich als Softwareentwickler Anwendungen und Dienste, von Plattformen aus mehreren Diensten bis zu 3D-Viewern und Bedienanwendungen, installiere sie vor Ort und warte sie nach der Auslieferung. Viele dieser Projekte drehen sich um Kameras und LiDAR; mein Beitrag ist die Software.',
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
      body: 'Ich binde Sensoren in Software ein: Industriekameras (Zeilen-, Flächen-, Time-of-Flight- und Wärmebildkameras) und LiDAR. Ich schließe sie an, konfiguriere sie und synchronisiere ihre Erfassung mit dem restlichen System.',
      refs: ['Tunnelinspektionsplattform', 'Gleisinspektion', 'LiDAR-Sicherheitsbarriere'],
    },
    reconstruct: {
      verb: 'Ich rekonstruiere',
      object: 'die Geometrie.',
      body: 'Ich arbeite mit 3D-Daten: Punktwolken, Tiefenbilder, Stereokalibrierung und 3D-Rekonstruktion, und ich entwickle die Viewer, die sie darstellen.',
      refs: ['3D-Tunnelrekonstruktion', 'Teigüberwachung', 'LiDAR-Sicherheitsbarriere'],
    },
    detect: {
      verb: 'Ich erkenne,',
      object: 'was zählt.',
      body: 'Ich kalibriere die Sensoren, verarbeite ihre Daten und mache daraus das Ergebnis, das der Kunde braucht: eine Messung, eine Erkennung oder einen Alarm, zuverlässig unter den realen Bedingungen vor Ort.',
      refs: ['LiDAR-Sicherheitsbarriere', 'Teigüberwachung', 'Nischenerkennung'],
    },
    interface: {
      verb: 'Ich baue',
      object: 'die Oberfläche.',
      body: 'Ich konzipiere und entwickle die Anwendungen, mit denen Menschen arbeiten: Desktop- und Mehrbildschirmanwendungen, Tablet-Apps, Replay- und Verlaufswerkzeuge, verständlich gestaltet für die Menschen, die sie nutzen.',
      refs: ['Stellwerksassistent', 'Tunnelinspektionsplattform', 'Stofffehlerprüfung'],
    },
    ship: {
      verb: 'Ich bringe es',
      object: 'in Produktion.',
      body: 'Ich installiere meine Anwendungen vor Ort, betreue sie nach der Auslieferung und entwickle sie weiter: Fehlerbehebungen und Refactoring, wenn ein Produkt wachsen muss.',
      refs: ['Gleisinspektion'],
    },
  },
  projects: {
    'tunnel-platform': {
      title: 'Tunnelinspektionsplattform',
      client: 'Betreiber eines Eisenbahntunnels',
      summary: 'Ein Inspektions-Lkw, der per Zug durch den Tunnel gefahren wird, filmt die Ausrüstung an Tunnelwänden und -decke, damit sie gewartet werden kann. 22 Heckkameras decken jeweils ihre eigene Zone ab, 2 Seitenkameras lesen die Positionsschilder und mehr als 100 Leuchten beleuchten jeweils ihren eigenen Abschnitt, dazu Wärmebildkameras, RFID + GPS, Batterien und eine Brandmelderzentrale. Dreizehn Dienste und Anwendungen übernehmen die Erfassung an Bord, dann Upload, Archivierung, Mehrbildschirm-Inspektion und den Vergleich zwischen Fahrten.',
      did: [
        'Großteil der Dienste und die Kommunikation zwischen ihnen entwickelt',
        'Alle Anwendungen entwickelt: Bediener-Tablet, Mehrbildschirm-Inspektion, Verlaufsvergleich',
      ],
    },
    'lidar-barrier': {
      title: 'LiDAR-Sicherheitsbarriere für das Hochvoltladen von E-Bussen',
      client: 'Hersteller aus dem Verkehrssektor',
      summary: 'Erkennt jede Person und jedes Objekt, bis hin zu einem Gehstock, die sich einem Bus nähern, der von unten mit Hochspannung geladen wird, ohne Fehlalarme durch Regen, Schnee oder Erschütterungen und Neigung des Busses. Zwei LiDARs oben am Bus scannen eine Linie vor ihm und entlang seiner rechten Seite. Das System warnt den Fahrer und schaltet dann den Strom ab.',
      did: [
        'Punktwolkenverarbeitung geschrieben, die echte Eindringlinge von Regen, Schnee und Busbewegungen unterscheidet',
        'LiDARs integriert und kalibriert',
        'Bedienoberfläche entwickelt',
      ],
    },
    'dough-tof': {
      title: '3D-Teigüberwachung in einem Industrieofen',
      client: 'Lebensmittelkonzern',
      summary: 'Verfolgt Höhe und Volumen des Teigs während des Backens über die Zeit, anhand der Tiefenbilder und der Punktwolke einer Time-of-Flight-Kamera oben im Ofen.',
      did: [
        'ToF-Kamera integriert',
        '3D-Viewer und Tiefenbildanzeige entwickelt',
        'Bedienoberfläche entwickelt',
      ],
    },
    'track-inspection': {
      title: 'Gleisinspektionssoftware, 3 Fahrzeugkonfigurationen',
      client: 'Gleisinspektionsunternehmen',
      summary: 'Sechs Zeilenkameras, drei pro Schiene (Draufsicht, Innen- und Außenansicht), erfassen jeweils eine Zeile pro Millimeter Fahrweg, und eine nach vorne gerichtete Flächenkamera zeichnet die Umgebung auf, damit jedes Schienenbild verortet werden kann. Prüfer spielen die Sequenzen ab, um zu entscheiden, wo jede Schiene gewartet werden muss.',
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
      summary: 'Eine Anwendung auf drei Bildschirmen für Stellwerksbediener: Fahrstraßen vorbereiten und einstellen, zu stellende Weichen erkennen, Zugdurchfahrten pro Zone erkennen, alles aufzeichnen und das Geschehen auf den Stelltischen erneut abspielen. 3 Kameras und Leuchten pro Tisch, 2 Tische pro Stellwerk.',
      did: [
        'Die komplette Anwendung entwickelt',
        'Aufzeichnung, Verlauf und Replay-Modus',
      ],
    },
    'slam-tunnels': {
      title: '3D-Rekonstruktion von Eisenbahn- und U-Bahn-Tunneln aus Bildern',
      client: 'Masterpraktikum',
      summary: 'Visual SLAM (ORB-SLAM, PLVS), angewandt auf reale Aufnahmen von Eisenbahntunneln, Zügen und U-Bahn: Stereokalibrierung, Punktwolken, 3D-Rekonstruktion und Visualisierung.',
      did: [
        'Literaturrecherche zu Visual SLAM',
        'ORB-SLAM und PLVS implementiert und ausgeführt',
        'Auf reale Eisenbahn- und U-Bahn-Aufnahmen angewandt und die Ergebnisse analysiert',
      ],
    },
    fabric: {
      title: 'Stofffehlerprüfung',
      client: 'Luxusmodehaus',
      summary: 'Ein Prüftisch stellt sicher, dass der Stoff ausgelegt ist und keine Hände im Bild sind, nimmt das Bild auf und registriert es, erkennt seine Form und findet dann Fehler mit einem trainierten Modell. Ich habe die Bedienoberfläche entwickelt, einschließlich der Werkzeuge, mit denen die Trainingsdatensätze erstellt werden.',
      did: [
        'Bedienoberfläche entwickelt',
        'Werkzeuge zur Datensatzerstellung entwickelt',
      ],
    },
    'train-passage': {
      title: 'Erkennung von Zugdurchfahrten',
      client: 'Bahnbetreiber',
      summary: 'Ein System, das vorbeifahrende Züge erkennt. Ich habe die Anwendung zum Durchsuchen seiner Daten entwickelt sowie den Dienst, der die Daten für Drittanwendungen und eine Weboberfläche bereitstellt.',
      did: [
        'Anwendung zum Durchsuchen der Daten entwickelt',
        'Datendienst entwickelt',
      ],
    },
    'metro-niches': {
      title: 'Nischenerkennung in U-Bahn-Tunneln',
      client: 'Betreiber des städtischen Nahverkehrs',
      summary: 'Nischen sind kleine Schutzräume auf Bodenhöhe in den Wänden von U-Bahn-Tunneln, etwa so groß wie zwei Personen, in die Techniker ausweichen, wenn ein Zug vorbeifährt. Ich habe den Code eines Kollegen übernommen und die Anwendung fertiggestellt, die sie erkennt.',
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
      summary: 'Ein GPU-Path-Tracer, entwickelt, um Monte-Carlo-Sampling an Szenen mit Reflexionen, Schatten und Transparenz zu untersuchen.',
      alts: [
        'Path-Tracer, der auf einer Szene mit Säulen und Kugeln konvergiert',
        'Path-Tracer neben seinem Einstellungsfenster',
      ],
    },
    'vr-protocols': {
      title: 'Experimentelle Protokolle in Virtual Reality',
      context: 'Masterprojekt · Labor ICube',
      summary: 'Ich habe virtuelle Umgebungen für die psychologische Forschung konzipiert und gebaut und VR in therapeutische Anwendungen integriert.',
      alts: ['Virtuelle Umgebungen für die psychologische Forschung'],
    },
    'vr-interaction': {
      title: 'Interaktion mit Objekten in Virtual Reality',
      context: 'Forschungsprojekt · Labor ICube',
      summary: 'Ein Entwicklungsframework in Unreal Engine 5, das Gesten und Körperhaltungen der Manipulation von 3D-Objekten zuordnet.',
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
    lede: 'Das größte System, an dem ich gearbeitet habe. Die Hardware war nicht mein Teil: Ich habe den Großteil der Dienste und die Kommunikation zwischen ihnen entwickelt sowie alle Anwendungen, von der synchronisierten Erfassung an Bord des Lkw bis zu den Werkzeugen, die Prüfer nach der Fahrt nutzen.',
    layers: {
      hw: 'Auf dem Lkw',
      rt: 'Erfassungsdienste',
      sup: 'Überwachung',
      post: 'Nach der Fahrt',
    },
    nodes: {
      rear: {
        label: '22 Heckkameras',
        desc: '22 Kameras am Heck des Lkw, jede mit eigener Ausrichtung und eigenem Blickwinkel, filmen eine genau festgelegte Zone des Tunnels, in der Ausrüstung an den Wänden oder der Decke installiert ist.',
      },
      side: {
        label: '2 Seitenkameras',
        desc: 'Zwei Kameras an der Seite des Lkw filmen die Schilder, mit denen der Lkw im Tunnel verortet wird.',
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
        desc: 'Dienen zur Erkennung von Ein- und Ausfahrt in den bzw. aus dem Tunnel, und über welche Ein- und Ausfahrt.',
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
        desc: 'Erkennt Ein- und Ausfahrt über RFID und GPS, um zu wissen, wann Erfassung und Trigger starten.',
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
        desc: 'Liest die Positionsschilder im Tunnel, um die Aufnahmeposition jedes Bildes und den Fortschritt durch den Tunnel zu liefern.',
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
        desc: 'Tablet-Anwendung, mit der der Bediener während der Fahrt alles prüft und verfolgt.',
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
        desc: 'Große Mehrbildschirmanwendung zum Abspielen der Sequenzen: mehrere Kameras, Synchronisation und Datenbank.',
      },
      history: {
        label: 'Verlauf',
        desc: 'Vergleicht mehrere Fahrten: wie eine genaue Stelle aus einer bestimmten Kamera am Datum x und am Datum y aussah.',
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
    summary: 'Je nach Projekt arbeite ich allein, zu zweit oder in einem größeren Team, und ich installiere und betreue, was ich ausliefere.',
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
