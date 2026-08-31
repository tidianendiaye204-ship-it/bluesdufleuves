# The Village Podor - Site Web du Centre Culturel

Site web moderne pour le centre culturel The Village à Podor, Sénégal, initié par Baaba Maal. Ce projet présente le festival Blues du Fleuve, les formations NANN-k, et les activités culturelles de la vallée du fleuve Sénégal.

## 🚀 Stack Technique

- **Framework**: TanStack Start (React avec SSR)
- **Build**: Vite 7.3.1
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.2.1
- **Database**: Drizzle ORM avec SQLite/D1 (Cloudflare)
- **Auth**: Custom avec bcryptjs
- **UI Components**: Radix UI + shadcn/ui
- **i18n**: i18next (Français/Anglais)
- **Animations**: Framer Motion
- **Testing**: Playwright (E2E), Vitest (Unit)
- **Deployment**: Cloudflare Pages/Workers
- **Security**: Cloudflare Turnstile (Captcha), Rate Limiting

## 📋 Prérequis

- Node.js 18+
- npm ou pnpm
- Compte Cloudflare (pour le déploiement en production)

## 🛠️ Installation

```bash
# Cloner le repository
git clone <repository-url>
cd bluesdufleuve

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env
```

## ⚙️ Configuration des Variables d'Environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes:

```env
# Cloudflare Turnstile (Captcha)
VITE_TURNSTILE_SITE_KEY=votre_site_key
TURNSTILE_SECRET_KEY=votre_secret_key

# Database (Cloudflare D1)
# Ces variables sont automatiquement configurées par Cloudflare en production
DB=your_database_binding
```

**Pour obtenir les clés Turnstile:**

1. Créez un compte sur [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Allez dans Turnstile > Add Site
3. Configurez le site et copiez les clés

## 📦 Scripts Disponibles

```bash
# Développement
npm run dev              # Lance le serveur de développement

# Build
npm run build            # Build pour production
npm run build:vercel     # Build optimisé pour Vercel
npm run build:dev        # Build de développement

# Preview
npm run preview          # Preview du build de production

# Linting & Formatting
npm run lint             # ESLint
npm run format           # Prettier

# Database
npm run db:generate      # Génère les migrations Drizzle
npm run db:push          # Pousse le schema vers la DB

# Tests
npm run test             # Lance les tests unitaires (Vitest)
npm run test:e2e         # Lance les tests E2E (Playwright)
```

## 🗄️ Database

Le projet utilise Drizzle ORM avec SQLite en développement et Cloudflare D1 en production.

### Structure de la Base de Données

- **inscriptions**: Inscriptions aux formations
- **contacts**: Messages du formulaire de contact
- **newsletter**: Abonnés à la newsletter
- **admins**: Administrateurs du site
- **sessions**: Sessions d'authentification admin
- **articles**: Articles et actualités

### Migrations

```bash
# Générer une nouvelle migration
npm run db:generate

# Appliquer les migrations (Cloudflare D1)
npx wrangler d1 migrations apply bluesdufleuve-db --remote

# Appliquer les migrations (local)
npx wrangler d1 migrations apply bluesdufleuve-db --local
```

## 🔐 Administration

### Créer un Administrateur

```bash
# En local
npm run create-admin

# En production (Cloudflare)
npx wrangler d1 execute bluesdufleuve-db --remote --command="INSERT INTO admins (id, email, password_hash) VALUES ('$(uuidgen)', 'admin@example.com', '$2a$12$hash')"
```

### Accéder à l'Admin

1. Allez sur `/admin/login`
2. Connectez-vous avec vos identifiants
3. Accédez au tableau de bord sur `/admin`

## 🚢 Déploiement

### Cloudflare Pages

```bash
# Installer Wrangler
npm install -g wrangler

# Se connecter
wrangler login

# Déployer
npm run build
wrangler pages publish dist
```

### Configuration Wrangler

Le fichier `wrangler.jsonc` contient la configuration pour:

- La base de données D1
- Le rate limiting
- Les routes custom

## 🧪 Tests

### Tests Unitaires (Vitest)

```bash
npm run test
```

### Tests E2E (Playwright)

```bash
npm run test:e2e
```

## 📁 Structure du Projet

```
bluesdufleuve/
├── src/
│   ├── components/      # Composants React réutilisables
│   ├── db/             # Schema Drizzle
│   ├── hooks/          # Custom React hooks
│   ├── i18n/           # Configuration i18n
│   ├── lib/            # Utilitaires (auth, db, csrf, etc.)
│   ├── routes/         # Routes TanStack Router
│   ├── server.ts       # Point d'entrée serveur
│   └── styles.css      # Styles globaux
├── drizzle/            # Migrations database
├── public/             # Assets statiques
├── scripts/            # Scripts utilitaires
└── tests/              # Tests
```

## 🔒 Sécurité

Le projet implémente plusieurs mesures de sécurité:

- **CSRF Protection**: Tokens CSRF pour tous les formulaires
- **Session Validation**: Validation côté serveur des sessions admin
- **Rate Limiting**: Limitation des requêtes via Cloudflare
- **Captcha**: Cloudflare Turnstile pour les formulaires publics
- **Password Hashing**: bcryptjs avec 12 rounds
- **Environment Variables**: Validation des variables d'environnement

## 🌐 i18n

Le projet supporte le français et l'anglais. Les traductions sont dans `src/i18n/locales/`.

Pour ajouter une nouvelle langue:

1. Créez un fichier `src/i18n/locales/xx.json`
2. Ajoutez la langue dans `src/i18n/index.ts`
3. Traduisez toutes les clés

## 🎨 Personnalisation

### Thème

Le thème est configuré dans `tailwind.config.js` et utilise les variables CSS définies dans `styles.css`.

### Composants UI

Les composants shadcn/ui sont dans `src/components/ui/`. Pour en ajouter de nouveaux:

```bash
npx shadcn@latest add [component-name]
```

## 📝 Améliorations Récentes

- ✅ Suppression des secrets codés en dur
- ✅ Implémentation de la protection CSRF
- ✅ Validation des sessions admin côté serveur
- ✅ Amélioration de la gestion des erreurs
- ✅ Ajout d'indexes pour la performance

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est la propriété de The Village Podor.

## 📞 Contact

- **Email**: contact@lesbluesdufleuve.sn
- **Site**: https://lesbluesdufleuve.sn
- **Adresse**: Quartier historique, Podor, Sénégal

---

Développé avec ❤️ pour The Village Podor et le festival Blues du Fleuve.
