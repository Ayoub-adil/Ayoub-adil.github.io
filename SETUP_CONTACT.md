# 📧 Formulaire de Contact - Documentation

## ✅ Configuration : Web3Forms

**Votre portfolio utilise Web3Forms** - Un service gratuit qui gère l'envoi d'emails sans serveur backend !

### Pourquoi Web3Forms ? ✨
- ✅ **Hébergement 100% gratuit** sur GitHub Pages
- ✅ **Pas de backend séparé** à maintenir ou déployer
- ✅ **Limite généreuse** : 250 soumissions/mois gratuitement
- ✅ **Déjà configuré** et prêt à l'emploi
- ✅ **Emails reçus** directement sur `ayoub.adil0406@gmail.com`
- ✅ **URL du site** : https://ayoub-adil.github.io/

---

## 🎯 Comment ça fonctionne

```
Visiteur remplit le formulaire
         ↓
Frontend React (GitHub Pages)
         ↓
API Web3Forms (https://web3forms.com)
         ↓
Email envoyé à ayoub.adil0406@gmail.com
```

**Aucun serveur backend nécessaire !** 🚀

---

## 🔑 Configuration

### 1. Clé Web3Forms

Votre clé Web3Forms est déjà configurée dans le fichier `.env` à la racine du projet :

```env
VITE_WEB3FORMS_KEY=f5c0257d-cde0-4f20-884e-960cb6aeec02
```

✅ **Cette clé est déjà configurée et fonctionnelle !**

### 2. Email de réception

Les emails sont automatiquement envoyés à : `ayoub.adil0406@gmail.com`

---

## 🧪 Tester le Formulaire

### En local :

```bash
# 1. Démarrer le serveur de développement
npm run dev

# 2. Ouvrir http://localhost:5173
# 3. Aller à la section "Contact"
# 4. Remplir et envoyer le formulaire
# 5. Vérifier votre boîte email
```

### En production :

1. Visitez https://ayoub-adil.github.io/
2. Allez à la section "Contact"
3. Remplissez le formulaire :
   - **Nom*** (minimum 3 caractères)
   - **Email*** (format valide)
   - **Société** (optionnel)
   - **Message*** (minimum 5 caractères)
4. Cliquez sur "Send"
5. Vérifiez votre email !

---

## 🔄 Gérer votre compte Web3Forms

### Accéder au Dashboard

1. Allez sur https://web3forms.com
2. Connectez-vous avec l'email : `ayoub.adil0406@gmail.com`
3. Consultez :
   - Historique des messages reçus
   - Nombre de soumissions ce mois-ci
   - Taux de réussite/échec
   - Configuration du formulaire

### Limites du plan gratuit

- **250 soumissions/mois** - Largement suffisant pour un portfolio
- **Stockage illimité** des soumissions
- **Notifications email** instantanées
- **Dashboard complet** avec statistiques

### Si vous dépassez la limite

Vous recevrez un email d'avertissement. Options :
- **Plan Pro** : 5$/mois pour 5000 soumissions
- **Plan Business** : 15$/mois pour 25000 soumissions

---

## 🔧 Modifier la Configuration

### Changer l'email de réception

1. Connectez-vous sur https://web3forms.com
2. Allez dans les paramètres de votre formulaire
3. Modifiez l'email de destination
4. Sauvegardez

### Ajouter des notifications supplémentaires

Vous pouvez configurer plusieurs emails de notification :
1. Dashboard Web3Forms → Settings
2. Ajoutez des emails supplémentaires
3. Configurez les notifications (email/Slack/Discord)

### Personnaliser le message de succès

Dans `src/components/Contact.jsx` ligne 107 :

```javascript
alert("Thank you! Your message has been sent successfully.");
```

Modifiez le texte selon vos préférences.

---

## 🐛 Dépannage

### ❌ "Failed to send" ou "Something went wrong"

**Solutions :**
1. Vérifiez votre connexion internet
2. Ouvrez la console du navigateur (F12) pour voir les erreurs
3. Vérifiez que la clé Web3Forms est correcte dans `.env`
4. Assurez-vous que le fichier `.env` existe à la racine (pas `.env.example`)

### ❌ L'email n'arrive pas

**Solutions :**
1. Vérifiez votre dossier **spam/courrier indésirable**
2. Vérifiez que l'email de réception est correct sur Web3Forms
3. Connectez-vous sur https://web3forms.com pour voir les soumissions dans le dashboard
4. Attendez quelques minutes (peut prendre jusqu'à 5 min)

### ❌ "Invalid Name/Email/Message"

**Validations du formulaire :**
- **Nom** : minimum 3 caractères
- **Email** : format valide (exemple@domain.com)
- **Message** : minimum 5 caractères
- **Société** : optionnel, pas de validation

### ❌ Le bouton reste bloqué sur "Sending..."

**Solutions :**
1. Rechargez la page (F5)
2. Vérifiez la console du navigateur (F12 → Console)
3. Vérifiez votre connexion internet
4. Testez avec un autre navigateur
5. Videz le cache du navigateur

### ❌ Erreur CORS

Si vous voyez une erreur CORS dans la console :
1. Vérifiez que l'URL est bien `https://api.web3forms.com/submit`
2. Web3Forms gère automatiquement CORS
3. Le problème vient probablement d'une autre source

---

## 📊 Statistiques et Monitoring

### Dashboard Web3Forms

Connectez-vous sur https://web3forms.com/dashboard pour voir :

- 📈 **Graphiques** : Soumissions par jour/semaine/mois
- 📧 **Historique** : Tous les messages reçus avec détails
- ✅ **Taux de réussite** : Emails envoyés vs échecs
- 🚫 **Spam bloqué** : Messages filtrés automatiquement
- 📊 **Analytics** : Sources, navigateurs, pays

### Notifications en temps réel

Configurez des notifications pour :
- Chaque nouvelle soumission
- Rapport quotidien/hebdomadaire
- Alertes d'erreur
- Limite de quota atteinte

---

## 🔒 Sécurité

### Protection des données

- ✅ **HTTPS uniquement** : Toutes les requêtes sont sécurisées
- ✅ **Variables d'environnement** : `.env` est dans `.gitignore`
- ✅ **Clés privées** : Jamais commitées sur GitHub
- ✅ **RGPD compliant** : Web3Forms respecte le RGPD

### Protection anti-spam

Web3Forms inclut automatiquement :
- ✅ **Honeypot** : Piège pour les bots
- ✅ **Rate limiting** : Limite le nombre de soumissions
- ✅ **Validation côté serveur** : Vérifie les données
- 🔧 **reCAPTCHA** (optionnel) : Protection Google

### Activer reCAPTCHA (optionnel)

Pour une protection supplémentaire :
1. Allez sur https://www.google.com/recaptcha/admin
2. Créez une nouvelle clé (v3)
3. Dans `src/components/Contact.jsx`, ajoutez reCAPTCHA
4. Configurez sur Web3Forms dashboard

---

## 🎨 Personnalisation

### Modifier les champs du formulaire

Ouvrez [src/components/Contact.jsx](src/components/Contact.jsx) :

**Ajouter un champ "Téléphone" :**

```javascript
// Ligne 15 : Ajouter au state
const [form, setForm] = useState({
  name: "",
  email: "",
  company: "",
  phone: "",  // ← Nouveau champ
  message: "",
});

// Ligne 90 : Ajouter dans le body
body: JSON.stringify({
  access_key: import.meta.env.VITE_WEB3FORMS_KEY,
  name: form.name,
  email: form.email,
  company: form.company || 'N/A',
  phone: form.phone || 'N/A',  // ← Nouveau champ
  message: form.message,
  // ...
}),

// Ligne 198 : Ajouter l'input HTML
<label htmlFor="phone" className="flex flex-col">
  <span className="text-white font-medium mb-4">Téléphone</span>
  <input
    type="tel"
    name="phone"
    id="phone"
    value={form.phone}
    onChange={handleChange}
    placeholder="+33 6 12 34 56 78"
    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
  />
</label>
```

### Modifier le design

Les styles sont dans [src/components/Contact.jsx](src/components/Contact.jsx) avec Tailwind CSS :

- `bg-tertiary` : Couleur de fond des inputs
- `text-white` : Couleur du texte
- `py-4 px-6` : Padding
- `rounded-lg` : Bordures arrondies

Modifiez les classes Tailwind selon vos préférences.

---

## ✅ Checklist de Déploiement

- [x] Clé Web3Forms configurée dans `.env`
- [x] Formulaire testé en local
- [x] Email de réception vérifié
- [x] Pas de backend nécessaire
- [x] Build réussi (`npm run build`)
- [x] Déployé sur GitHub Pages (`npm run deploy`)
- [x] Test en production sur https://ayoub-adil.github.io/
- [x] Email de test reçu

---

## 📞 Support

### Web3Forms
- **Site** : https://web3forms.com
- **Documentation** : https://docs.web3forms.com
- **Support** : https://web3forms.com/support
- **Status** : https://status.web3forms.com

### Votre Portfolio
- **URL** : https://ayoub-adil.github.io/
- **Repository** : https://github.com/Ayoub-adil/Ayoub-adil.github.io
- **Email de contact** : ayoub.adil0406@gmail.com

---

## ❓ FAQ

### Q: Puis-je utiliser un autre service que Web3Forms ?

Oui ! Alternatives :
- **EmailJS** (code déjà présent dans `.env`)
- **Formspree** (5$/mois)
- **Getform** (gratuit jusqu'à 50/mois)

### Q: Combien coûte Web3Forms ?

Plan gratuit : **250 soumissions/mois** (largement suffisant pour un portfolio)

### Q: Les emails arrivent-ils instantanément ?

Généralement oui (quelques secondes). Maximum 5 minutes en cas de forte charge.

### Q: Puis-je voir qui a visité mon site ?

Non, Web3Forms ne fournit que les soumissions du formulaire. Pour analytics complet, utilisez Google Analytics.

### Q: Comment changer mon email de réception ?

Connectez-vous sur Web3Forms dashboard et modifiez l'email dans les settings.

---

**🎉 Votre formulaire de contact est opérationnel et 100% gratuit !**
