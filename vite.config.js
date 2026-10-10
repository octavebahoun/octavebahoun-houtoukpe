import { readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { prerenderMeta } from './scripts/prerender-meta.mjs'

// Les en-têtes de sécurité de production (vercel.json) sont aussi appliqués à
// `pnpm preview` : on teste localement exactement ce qui sera servi.
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'))
const securityHeaders = Object.fromEntries(
  vercel.headers
    .find((rule) => rule.source === '/(.*)')
    .headers.filter((header) => header.key !== 'Strict-Transport-Security')
    // en local on reste en http : pas de mise à niveau forcée vers https
    .map((header) => [header.key, header.value.replace('; upgrade-insecure-requests', '')]),
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderMeta()],
  preview: {
    headers: securityHeaders,
  },
})
