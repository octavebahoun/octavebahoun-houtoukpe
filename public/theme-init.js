// Applique le thème avant le premier rendu pour éviter le flash clair/sombre.
// Fichier externe (et non script en ligne) pour rester compatible avec la CSP.
try {
  var stored = localStorage.getItem('oktav-theme')
  var dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
  document.documentElement.classList.toggle('dark', dark)
} catch {}
