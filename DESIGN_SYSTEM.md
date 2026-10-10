# Design System — extrait des maquettes (template "Oliver/Olivia")

## Couleurs
| Token          | Hex       | Usage |
|----------------|-----------|-------|
| primary        | `#FE4619` | accents, boutons, mots en italique, icônes, étoiles |
| primary-hover  | `#E03A10` | hover boutons |
| black          | `#0D0D0D` | textes titres, bandeau marquee, boutons "Contact Me", cartes sombres, footer bas |
| white          | `#FFFFFF` | fonds, texte sur sombre |
| bg-soft        | `#F0F0F0` | fonds de sections / cartes grises |
| bg-card        | `#F7F7F7` | cartes légères (FAQ, témoignages, services) |
| border         | `#E0E0E0` | bordures de cartes, inputs |
| text-muted     | `#6B6B6B` | paragraphes, labels secondaires |
| text-light     | `#9A9A9A` | placeholder, dates, meta |

## Typographie
- Famille : sans-serif géométrique → **Plus Jakarta Sans** (Google Fonts), fallback `Inter, sans-serif`
- Le mot accent de chaque titre est en **italique + orange** (ex: "Look *here*", "Let's *Connect* there")
- Échelle :
  - H1 hero : 56–72px / 700 / line-height 1.1
  - H2 section : 40–48px / 700
  - H3 carte : 20–24px / 600
  - Body : 16px / 400 / line-height 1.7
  - Small / label : 13–14px
  - Stats chiffres : 40–48px / 700

## Espacements & formes
- Container : max-width **1240px**, padding latéral 24px
- Sections : padding vertical **90–100px**
- Grille : gap **24px** (cards), 16px (petits éléments)
- Border-radius : cartes **16–24px**, boutons **pill (9999px)**, inputs 12px, images 16px
- Ombres : très légères (`0 4px 20px rgba(0,0,0,.05)`), design quasi flat

## Composants clés
- **Navbar** : fond blanc pill flottant, logo (cercle orange + nom en noir), liens centrés, bouton noir pill "Contact Me"
- **Marquee** : bandeau noir, texte blanc, séparateur = étoile 4 branches orange (✦)
- **Section header** : petit trait orange + label ("— About Me"), puis titre avec mot en orange italique + étoile
- **Boutons** : pill orange (texte blanc) ; variante outline avec flèche dans un cercle ; bouton noir pill
- **Cartes** : grises arrondies, parfois noires (contact, service actif), accordéon services (01→09 avec bouton flèche)
- **Badges/pills** : catégories blog en orange, tags en gris clair
- **Footer** : titre "Let's *Connect* there" + bouton "Contact Us", 4 colonnes (logo/description, Navigation, Contact, Newsletter), icônes sociales en cercles orange, barre noire copyright
