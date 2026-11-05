# 🚀 Portfolio 3D - Ayoub Adil

Portfolio interactif 3D moderne construit avec React, Three.js et Tailwind CSS.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://ayoub-adil.github.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

## 🌟 Aperçu

Portfolio personnel mettant en valeur mes projets, compétences et expériences à travers une interface 3D interactive et immersive.

**🔗 Site en ligne :** [https://ayoub-adil.github.io/](https://ayoub-adil.github.io/)

## ✨ Fonctionnalités

- 🎨 **Design 3D Interactif** - Modèles 3D animés avec Three.js
- 📱 **100% Responsive** - Optimisé pour tous les appareils
- 🌙 **Animations Fluides** - Transitions et effets avec Framer Motion
- 📧 **Formulaire de Contact** - Intégration Web3Forms (gratuit, sans backend)
- ⚡ **Performance Optimisée** - Build Vite pour un chargement rapide
- 🎯 **SEO Friendly** - Meta tags et structure optimisée

## 🛠️ Technologies

### Frontend
- **React 18** - Framework JavaScript
- **Three.js** - Bibliothèque 3D WebGL
- **@react-three/fiber** - Renderer React pour Three.js
- **@react-three/drei** - Helpers pour R3F
- **Framer Motion** - Animations et transitions
- **Tailwind CSS** - Framework CSS utility-first
- **Vite** - Build tool ultra-rapide

### Services Externes
- **Web3Forms** - Gestion du formulaire de contact (gratuit)
- **GitHub Pages** - Hébergement statique gratuit

## 🚀 Installation

### Prérequis
- Node.js 16+ et npm/yarn
- Git

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/Ayoub-adil/Ayoub-adil.github.io.git
cd Portfolio3D

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env à la racine
cp .env.example .env

# 4. Ajouter votre clé Web3Forms dans .env
# Obtenez-la gratuitement sur https://web3forms.com
VITE_WEB3FORMS_KEY=votre-clé-ici

# 5. Lancer le serveur de développement
npm run dev

# 6. Ouvrir http://localhost:5173
```

## 📦 Scripts

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Crée le build de production
npm run preview      # Prévisualise le build

# Déploiement
npm run deploy       # Déploie sur GitHub Pages
```

## 📧 Configuration du Formulaire de Contact

Le portfolio utilise **Web3Forms** pour le formulaire de contact - aucun backend requis !

### Configuration rapide :

1. **Créez un compte gratuit** sur [web3forms.com](https://web3forms.com)
2. **Obtenez votre clé d'accès** (Access Key)
3. **Ajoutez-la dans `.env`** :
   ```env
   VITE_WEB3FORMS_KEY=votre-clé-web3forms
   ```
4. **C'est tout !** Le formulaire est opérationnel

### Avantages :
- ✅ 250 soumissions/mois gratuitement
- ✅ Notifications email instantanées
- ✅ Dashboard pour voir l'historique
- ✅ Protection anti-spam intégrée

📖 **Documentation complète :** [SETUP_CONTACT.md](SETUP_CONTACT.md)

## 🌐 Déploiement sur GitHub Pages

Le site est automatiquement déployé sur GitHub Pages.

### Première configuration :

```bash
# 1. Mettre à jour le package.json avec votre URL GitHub
# "homepage": "https://votre-username.github.io/"

# 2. Build et déploiement
npm run build
npm run deploy

# 3. Activer GitHub Pages dans les settings du repo
# Settings → Pages → Source: gh-pages branch
```

### Déploiements suivants :

```bash
npm run deploy
```

Le site sera accessible sur : `https://votre-username.github.io/`

## 📁 Structure du Projet

```
Portfolio3D/
├── public/               # Assets statiques
│   ├── animations/      # Fichiers 3D (.glb)
│   └── assets/          # Images, CV, etc.
├── src/
│   ├── components/      # Composants React
│   │   ├── canvas/     # Composants 3D (Three.js)
│   │   ├── About.jsx
│   │   ├── Contact.jsx # Formulaire de contact
│   │   ├── Experience.jsx
│   │   ├── Hero.jsx
│   │   └── ...
│   ├── constants/       # Données du portfolio
│   ├── hoc/            # Higher Order Components
│   ├── styles/         # Styles globaux
│   ├── utils/          # Utilitaires
│   ├── App.jsx         # Composant principal
│   └── main.jsx        # Point d'entrée
├── .env                # Variables d'environnement
├── package.json
├── tailwind.config.cjs # Config Tailwind
├── vite.config.js      # Config Vite
└── README.md
```

## 🎨 Personnalisation

### 1. Informations Personnelles
Modifiez `src/constants/index.js` :
```javascript
export const navLinks = [...];  // Liens de navigation
export const services = [...];  // Compétences
export const experiences = [...]; // Expériences
export const projects = [...];   // Projets
```

### 2. Thème et Couleurs
Modifiez `tailwind.config.cjs` :
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#votre-couleur",
        // ...
      }
    }
  }
}
```

### 3. Modèles 3D
Remplacez les fichiers `.glb` dans `public/animations/`

Ressources gratuites :
- [Sketchfab](https://sketchfab.com)
- [Poly Haven](https://polyhaven.com)
- [Ready Player Me](https://readyplayer.me)

## 🐛 Dépannage

### Le site ne se charge pas en local
```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreur de build
```bash
# Nettoyez le cache
npm run build -- --force
```

### Formulaire de contact ne fonctionne pas
1. Vérifiez que `.env` existe et contient `VITE_WEB3FORMS_KEY`
2. Vérifiez la console du navigateur (F12)
3. Testez avec un autre email
4. Voir [SETUP_CONTACT.md](SETUP_CONTACT.md)

## 📄 License

Ce projet est sous license MIT. Voir [LICENSE.md](LICENSE.md) pour plus de détails.

**Note :** Le template original est de [Sanidhya Kr. Verma](https://github.com/sanidhyy/3d-portfolio), modifié et personnalisé par Ayoub Adil.

## 🤝 Contact

- **Email :** [ayoub.adil0406@gmail.com](mailto:ayoub.adil0406@gmail.com)
- **Portfolio :** [https://ayoub-adil.github.io/](https://ayoub-adil.github.io/)
- **LinkedIn :** [Votre LinkedIn](#)
- **GitHub :** [@Ayoub-adil](https://github.com/Ayoub-adil)

## 🙏 Remerciements

- [Three.js](https://threejs.org/) - Bibliothèque 3D
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer pour Three.js
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Web3Forms](https://web3forms.com/) - Service de formulaire
- [GitHub Pages](https://pages.github.com/) - Hébergement gratuit

---

**⭐ Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile !**

Made with ❤️ by Ayoub Adil
