# Portfolio API - Inventaire des Routes

Ce document décrit l'ensemble des routes API disponibles dans le projet, avec leurs points d'entrée (inputs) et leurs sorties (outputs).

L'API est divisée en deux parties : **Publique** (accessible à tous) et **Admin** (nécessitant une authentification).

---

## 🌍 Routes Publiques

Préfixe de base: `/api`

### Projets (`/api/projects`)

#### 🔹 `GET /api/projects`

Récupère tous les projets du portfolio.

- **Paramètres (Entrée) :** Aucun
- **Sortie :** `200 OK` (Liste d'objets `Project`) | `500 Erreur serveur`

#### 🔹 `GET /api/projects/:id`

Récupère un projet spécifique grâce à son ID.

- **Paramètres (Entrée) :** `id` (Paramètre d'URL de type string/ObjectId)
- **Sortie :** `200 OK` (Objet `Project`) | `404 Non trouvé` | `500 Erreur serveur`

### Blog (`/api/blog`)

#### 🔹 `GET /api/blog`

Récupère tous les articles publiés.

- **Paramètres (Entrée) :** Aucun
- **Sortie :** `200 OK` (Liste d'objets `Blog`) | `500 Erreur serveur`

#### 🔹 `GET /api/blog/:slug`

Récupère un article spécifique grâce à son slug URL.

- **Paramètres (Entrée) :** `slug` (Paramètre d'URL de type string)
- **Sortie :** `200 OK` (Objet `Blog`) | `404 Non trouvé` | `500 Erreur serveur`

### Certifications (`/api/certs`)

#### 🔹 `GET /api/certs`

Récupère toutes les certifications.

- **Paramètres (Entrée) :** Aucun
- **Sortie :** `200 OK` (Liste d'objets `Cert`) | `500 Erreur serveur`

### A propos & Configuration de contenu

#### 🔹 `GET /api/about`

Récupère la section "À propos" (bio, compétences, liens sociaux).

- **Paramètres (Entrée) :** Aucun
- **Sortie :** `200 OK` (Objet `About`) | `404 Non trouvé` | `500 Erreur serveur`

#### 🔹 `GET /api/landing`

Récupère le contenu de la page d'accueil avec les travaux sélectionnés pré-chargés.

- **Paramètres (Entrée) :** Aucun
- **Sortie :** `200 OK` (Objet `Landing`) | `404 Non trouvé` | `500 Erreur serveur`

---

## 🔐 Routes Admin (Protégées)

Préfixe de base : `/api/admin`
_Toutes les routes (hormis celles d'authentification) nécessitent d'avoir un header `Authorization: Bearer <token>`._

### Authentification

#### 🔹 `GET /api/admin/auth/github`

Redirige vers l'interface de connexion GitHub (OAuth).

- **Paramètres (Entrée) :** Aucun
- **Sortie :** `302 Redistribution` vers GitHub.

#### 🔹 `GET /api/admin/auth/callback`

Callback appelé par GitHub pour valider la connexion.

- **Paramètres (Entrée) :** `code` (Query parameter injecté par GitHub)
- **Sortie :** `302 Redistribution` vers l'application frontend admin avec un `token` en paramètre d'URL.

### Projets (`/api/admin/projects`)

#### 🔹 `POST /api/admin/projects`

Créer un projet.

- **Entrée (Body JSON) :**
  - Requis : `title`, `shortDesc`, `image`
  - Optionnel : `description`, `techStack` (tableau), `links`, `featured` (booléen)
- **Sortie :** `201 Créé` (Objet `Project`) | `400 Erreur champs` | `401 Non autorisé` | `500 Erreur serveur`

#### 🔹 `PUT /api/admin/projects/:id`

Mettre à jour un projet.

- **Entrée (Paramètre d'URL) :** `id` du projet
- **Entrée (Body JSON) :** `title`, `description`, `shortDesc`, `image`, `techStack`, `links`, `featured`
- **Sortie :** `200 OK` (Objet mis à jour) | `404 Non trouvé` | `401 Non autorisé` | `500 Erreur serveur`

#### 🔹 `DELETE /api/admin/projects/:id`

Supprimer un projet.

- **Entrée (Paramètre d'URL) :** `id` du projet
- **Sortie :** `200 OK` | `404 Non trouvé` | `401 Non autorisé` | `500 Erreur serveur`

### Blog (`/api/admin/blog`)

#### 🔹 `POST /api/admin/blog`

Créer un article de blog.

- **Entrée (Body JSON) :**
  - Requis : `title`, `slug`
  - Optionnel : `content`, `excerpt`, `image`, `tags`, `published` (booléen)
- **Sortie :** `201 Créé` | `400 Erreur champs` | `401 Non autorisé` | `500 Erreur serveur`

#### 🔹 `PUT /api/admin/blog/:id`

Mettre à jour un article.

- **Entrée (Paramètre d'URL) :** `id`
- **Entrée (Body JSON) :** Champs similaires à la création (ex: `published` mettra automatiquement à jour la date).
- **Sortie :** `200 OK` | `404 Non trouvé` | `401 Non autorisé` | `500 Erreur serveur`

#### 🔹 `DELETE /api/admin/blog/:id`

Supprimer un article.

- **Entrée (Paramètre d'URL) :** `id`
- **Sortie :** `200 OK` | `404 Non trouvé` | `401 Non autorisé` | `500 Erreur serveur`

### Certifications (`/api/admin/certs`)

#### 🔹 `POST /api/admin/certs`

Créer une certification.

- **Entrée (Body JSON) :**
  - Requis : `title`, `issuer`, `image`
  - Optionnel : `credentialId`, `credentialUrl`, `issueDate`, `expiryDate`
- **Sortie :** `201 Créé` | `400 Erreur champs` | `401 Non autorisé` | `500 Erreur serveur`

#### 🔹 `PUT /api/admin/certs/:id`

Mettre à jour une certification.

- **Entrée (Paramètre d'URL) :** `id`
- **Entrée (Body JSON) :** Champs certification
- **Sortie :** `200 OK` | `404 Non trouvé` | `401 Non autorisé` | `500 Erreur serveur`

#### 🔹 `DELETE /api/admin/certs/:id`

Supprimer une certification.

- **Entrée (Paramètre d'URL) :** `id`
- **Sortie :** `200 OK` | `404 Non trouvé` | `401 Non autorisé` | `500 Erreur serveur`

### Configuration Unique (À propos & Landing)

#### 🔹 `PUT /api/admin/about`

Mettre à jour la section 'À propos'. Crée le document s'il n'existe pas.

- **Entrée (Body JSON) :** `bio`, `skills`, `socialLinks`
- **Sortie :** `200 OK` | `401 Non autorisé` | `500 Erreur serveur`

#### 🔹 `PUT /api/admin/landing`

Mettre à jour le contenu de la page d'accueil globale. Crée le document s'il n'existe pas.

- **Entrée (Body JSON) :** `hero`, `selectedWork`, `skills`, `cta`, `footer`
- **Sortie :** `200 OK` | `401 Non autorisé` | `500 Erreur serveur`
