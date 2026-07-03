import { createContext, useContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "user_lang";
const FALLBACK_LANG = "en";

const LOCALE = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.hire": "Hire me",
    "nav.theme.light": "Light",
    "nav.theme.dark": "Dark",

    // Hero
    "hero.greeting": "// fullstack engineer & AI enthusiast",
    "hero.phrase1": "I craft digital",
    "hero.phrase2": "that ship fast.",
    "hero.sub": "Based in Bénin — available worldwide. Web • Systems • AI / LM",
    "hero.cta.work": "View my work",
    "hero.cta.contact": "Get in touch",

    // Rotating words
    "word.0": "Experiences",
    "word.1": "Solutions",
    "word.2": "Products",
    "word.3": "Interfaces",
    "word.4": "Systems",

    // Selected Work
    "selected.title": "Selected Work",
    "selected.featured": "Featured Projects",
    "selected.all": "All projects",

    // Project card
    "card.view_details": "View details",
    "card.demo": "Demo",
    "card.code": "Code",
    "card.live_demo": "Live demo",
    "card.source_code": "Source code",
    "card.no_projects": "No projects in this category yet.",
    "project.back": "Back to projects",

    // Projects page
    "projects.title.prefix": "All",
    "projects.title.highlight": "Projects",
    "projects.desc": "A collection of web apps, IoT systems, and design projects I've shipped.",
    "projects.category.all": "all",

    // Project detail
    "project.overview": "Overview",
    "project.overview_text": "This project is presented as a case study. Use the links below to open the live demo or review the code, then explore the stack and related work for more context.",
    "project.snapshot": "Project Snapshot",
    "project.category": "Category",
    "project.status": "Status",
    "project.stack_size": "technologies",
    "project.stack": "Stack",
    "project.next_step": "Next step",
    "project.next_step_text": "If you want this page to show detailed case study sections like goals, constraints, and results, I can extend it.",
    "project.related": "Related projects",
    "project.notfound": "Project not found",

    // About page
    "about.kicker": "Get to know me",
    "about.title": "About",
    "about.title.suffix": "Me",
    "about.lead": "I build useful interfaces, ship practical systems, and keep pushing the craft forward. The goal is to create clarity, speed, and products that feel intentional.",
    "about.mission": "My mission",
    "about.build": "What I love to build",
    "about.journey": "My developer journey",
    "about.online": "Find me online",
    "about.cta_label": "Ready to collaborate?",
    "about.cta_text": "If you want a product that feels considered from first pixel to last interaction, I can help shape it.",
    "about.cta_btn": "Work with me",
    "about.design_by": "Designed with passion by",
    "about.role": "Software Engineer • AI Enthusiast",

    // Home about
    "homeabout.title": "About",
    "homeabout.title_accent": "Me",
    "homeabout.p1": "As an Electrical and Computer Engineering student at INSTI Lokossa, I am deeply passionate about the intersection of software development and Artificial Intelligence.",
    "homeabout.p2": "My goal is to craft innovative digital solutions that solve real-world problems — from intuitive web apps to embedded IoT systems and AI-powered applications.",
    "homeabout.p3": "Always seeking new challenges, I enjoy exploring cutting-edge technologies and contributing to projects that make a positive impact.",
    "homeabout.cta": "Learn more about me",
    "homeabout.stat1": "Projects Completed",
    "homeabout.stat2": "Technologies",
    "homeabout.stat3": "Internships",
    "homeabout.stat4": "Passion",

    // CTA
    "cta.label": "Ready to collaborate?",
    "cta.title": "Let's build something",
    "cta.title_accent": "great",
    "cta.desc": "I'm currently available for freelance projects and open to new opportunities.",
    "cta.btn": "Hire me",

    // Skills
    "skills.title": "Tech stack",

    // Certifications
    "certs.title": "CERTIF",
    "certs.title_highlight": "CATIONS",
    "certs.desc": "Verified credentials across web development, AI/ML, cybersecurity, and more.",
    "certs.issuer": "Issuer",
    "certs.date": "Date",

    // Blog
    "blog.title": "Dev",
    "blog.title_highlight": "Bento",
    "blog.desc": "Thoughts, tutorials, and write-ups on frontend craft, animation, and AI.",
    "blog.featured": "Featured",
    "blog.why_write_title": "Why I write",
    "blog.why_write_body": "I write to document what I learn, sharpen my thinking, and share practical ways to build faster, cleaner interfaces.",
    "blog.what_find": "What you will find",
    "blog.stat1": "Published notes",
    "blog.stat2": "Bento thinking",
    "blog.stat.label3": "AI & Systems",

    // Contact
    "contact.title_prefix": "Let's",
    "contact.title_highlight": "Connect",
    "contact.desc": "I'm currently available for freelance work and new opportunities. Reach out for a project or just a chat.",
    "contact.info.location": "Location",
    "contact.info.email": "Email",
    "contact.info.phone": "Phone",
    "contact.social_title": "Let's talk!",
    "contact.social_desc": "I usually respond within 24 hours.",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email Address",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.success": "Message sent successfully! I'll get back to you soon.",
    "contact.form.error": "Something went wrong. Please try again.",
    "contact.name_placeholder": "Octave Bahoun",
    "contact.email_placeholder": "octave@example.com",
    "contact.subject_placeholder": "Freelance project, collaboration...",
    "contact.message_placeholder": "Tell me about your project...",

    // Footer
    "footer.tagline": "Crafting interactive digital experiences with a focus on clarity, speed, and precision.",
    "footer.nav": "Navigation",
    "footer.status_title": "Status",
    "footer.available": "Available for hire",
    "footer.status_text": "Open to worldwide freelance opportunities and collaborations.",
    "footer.btt": "Back to top",
    "footer.copyright": "All rights reserved.",
    "footer.credit_prefix": "Designed with",
    "footer.credit_suffix": "in Lokossa",

    // Status
    status_completed: "Completed",
    status_in_progress: "In Progress",
    status_maintenance: "Maintenance",

    // Categories
    cat_web: "web",
    cat_iot: "iot",
    cat_design: "design",
  },

  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.hire": "Engagez-moi",
    "nav.theme.light": "Clair",
    "nav.theme.dark": "Sombre",

    "hero.greeting": "// ingénieur fullstack & passionné d'IA",
    "hero.phrase1": "Je façonne des",
    "hero.phrase2": "livrés rapidement.",
    "hero.sub": "Basé au Bénin — disponible partout. Web • Systèmes • IA / LM",
    "hero.cta.work": "Voir mon travail",
    "hero.cta.contact": "Contactez-moi",

    "word.0": "Expériences",
    "word.1": "Solutions",
    "word.2": "Produits",
    "word.3": "Interfaces",
    "word.4": "Systèmes",

    "selected.title": "Projets sélectionnés",
    "selected.featured": "Projets à la une",
    "selected.all": "Tous les projets",

    "card.view_details": "Voir détails",
    "card.demo": "Démo",
    "card.code": "Code",
    "card.live_demo": "Démo en direct",
    "card.source_code": "Code source",
    "card.no_projects": "Aucun projet dans cette catégorie.",
    "project.back": "Retour aux projets",

    "projects.title.prefix": "Tous",
    "projects.title.highlight": "Projets",
    "projects.desc": "Une collection d'applications web, systèmes IoT, et projets design que j'ai réalisés.",
    "projects.category.all": "tous",

    "project.overview": "Aperçu",
    "project.overview_text": "Ce projet est présenté comme une étude de cas. Utilisez les liens ci-dessous pour ouvrir la démo ou voir le code.",
    "project.snapshot": "Aperçu du projet",
    "project.category": "Catégorie",
    "project.status": "Statut",
    "project.stack_size": "technologies",
    "project.stack": "Technologies",
    "project.next_step": "Prochaine étape",
    "project.next_step_text": "Si vous voulez des sections détaillées dans cette page comme objectifs, contraintes, résultats, je peux les ajouter.",
    "project.related": "Projets similaires",
    "project.notfound": "Projet non trouvé",

    "about.kicker": "Faisons connaissance",
    "about.title": "À",
    "about.title.suffix": "propos",
    "about.lead": "Je construis des interfaces utiles et des systèmes pratiques. L'objectif n'est pas la décoration. C'est la clarté, la rapidité.",
    "about.mission": "Ma mission",
    "about.build": "Ce que j'aime construire",
    "about.journey": "Mon parcours",
    "about.online": "Retrouvez-moi en ligne",
    "about.cta_label": "Prêt à collaborer ?",
    "about.cta_text": "Si vous voulez un produit qui semble pensé du premier pixel à la dernière interaction, je peux vous aider.",
    "about.cta_btn": "Travaillons ensemble",
    "about.design_by": "Conçu avec passion par",
    "about.role": "Ingénieur logiciel • Passionné d'IA",

    "homeabout.title": "À",
    "homeabout.title_accent": "propos",
    "homeabout.p1": "En tant qu'étudiant en Génie Électrique et Informatique à INSTI Lokossa, je suis passionné par l'innovation logicielle et l'intelligence artificielle.",
    "homeabout.p2": "Mon but est de créer des solutions numériques innovantes qui résolvent des problèmes concrets — des apps web intuitives aux systèmes IoT embarqués.",
    "homeabout.p3": "Toujours en quête de nouveaux défis, j'explore les technologies de pointe, contribuant à des projets qui ont un impact positif.",
    "homeabout.cta": "En savoir plus",
    "homeabout.stat1": "Projets réalisés",
    "homeabout.stat2": "Technos maîtrisées",
    "homeabout.stat3": "Stages",
    "homeabout.stat4": "Passion",

    "cta.label": "Prêt à collaborer ?",
    "cta.title": "Construisons",
    "cta.title_accent": "grand",
    "cta.desc": "Je suis disponible pour des projets freelance et ouvert à de nouvelles opportunités.",
    "cta.btn": "Engagez-moi",

    "skills.title": "Technologies",

    "certs.title": "Certifi",
    "certs.title_highlight": "cations",
    "certs.desc": "Certifications vérifiées en développement web, IA/ML, cybersécurité, etc.",
    "certs.issuer": "Émetteur",
    "certs.date": "Date",

    "blog.title": "Articles",
    "blog.title_highlight": "en Bento",
    "blog.desc": "Réflexions, tutoriels et articles sur le frontend, l'animation et l'IA.",
    "blog.featured": "À la une",
    "blog.why_write_title": "Pourquoi j'écris",
    "blog.why_write_body": "J'écris pour documenter mes apprentissages, affiner ma réflexion et partager des façons pratiques de construire plus vite.",
    "blog.what_find": "Ce que vous trouverez",
    "blog.stat1": "Articles publiés",
    "blog.stat2": "Pensée Bento",
    "blog.stat.label3": "IA & Systèmes",

    "contact.title_prefix": "Connectons",
    "contact.title_highlight": "nous",
    "contact.desc": "Je suis disponible pour des projets freelance. Contactez-moi pour un projet ou une discussion.",
    "contact.info.location": "Localisation",
    "contact.info.email": "Email",
    "contact.info.phone": "Téléphone",
    "contact.social_title": "Parlons-en !",
    "contact.social_desc": "Je réponds habituellement sous 24h.",
    "contact.form.name": "Nom complet",
    "contact.form.email": "Email",
    "contact.form.subject": "Sujet",
    "contact.form.message": "Message",
    "contact.form.send": "Envoyer",
    "contact.form.sending": "Envoi...",
    "contact.form.success": "Message envoyé ! Je vous répondrai bientôt.",
    "contact.form.error": "Une erreur est survenue. Veuillez réessayer.",
    "contact.name_placeholder": "Jean Dupont",
    "contact.email_placeholder": "jean@example.com",
    "contact.subject_placeholder": "Freelance, collaboration...",
    "contact.message_placeholder": "Parlez-moi de votre projet...",

    "footer.tagline": "Création d'expériences interactives  avec un souci de clarté, rapidité et précision.",
    "footer.nav": "Navigation",
    "footer.status_title": "Statut",
    "footer.available": "Disponible",
    "footer.status_text": "Ouvert aux opportunités freelance dans le monde entier.",
    "footer.btt": "Revenir en haut",
    "footer.copyright": "Tous droits réservés.",
    "footer.credit_prefix": "Conçu avec",
    "footer.credit_suffix": "à Lokossa",

    status_completed: "Terminé",
    status_in_progress: "En cours",
    status_maintenance: "Maintenance",

    cat_web: "web",
    cat_iot: "iot",
    cat_design: "design",
  },
};

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") return saved;
    const browser = navigator.language || navigator.languages?.[0] || "";
    if (browser.startsWith("fr")) return "fr";
  } catch {}
  return FALLBACK_LANG;
}

export const LangCtx = createContext({
  lang: FALLBACK_LANG,
  t: (s) => s,
  toggleLang: () => {},
  setLang: () => {},
});

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  }, [lang]);

  const setLang = useCallback((next) => {
    if (next === "fr" || next === "en") setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => prev === "fr" ? "en" : "fr");
  }, []);

  const t = useCallback((key) => {
    const texts = LOCALE[lang];
    if (texts && key in texts) return texts[key];
    const fallback = LOCALE[FALLBACK_LANG];
    if (fallback && key in fallback) return fallback[key];
    return key;
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, t, toggleLang, setLang }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  return useContext(LangCtx);
}
