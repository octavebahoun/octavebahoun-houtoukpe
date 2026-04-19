# Octave Bahoun — Premium Portfolio v4

Welcome to the source code of my personal portfolio. This project represents a modern, highly interactive, and premium web experience designed to showcase my skills as a Software Engineer and AI Specialist.

## 🌟 Key Features

- **Midnight-Tech Design System**: A bespoke color palette featuring Deep Navy backgrounds (`#070B14`) with vibrant Cyan (`#22D3EE`) and Emerald (`#10B981`) glowing accents.
- **Aurora Borealis Background**: A fully CSS-animated mesh gradient background featuring drifting orbs that create an immersive, organic feel.
- **Glassmorphism UI**: Components utilizing `backdrop-blur`, semi-transparent backgrounds, and interactive glowing conic-gradient borders.
- **Smooth Page Transitions**: Seamless navigation between routes using `framer-motion` (Fade, Slide, and Blur effects).
- **Dynamic Projects**: Portfolio projects fetched dynamically via Supabase.
- **Interactive Animations**: Tilt-effect cards, infinite skill carousels, and staggered entrance animations.

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database / Backend**: Supabase
- **Icons**: Lucide React
- **Routing**: React Router v6

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/octavebahoun/Portefeuille.git
   cd Portefeuille
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Variables:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `/src/components`: Main page components (Accueil, About, Project, Contact).
- `/src/UI`: Reusable UI elements (Navbar, Footer, Hero, Glass Cards, SectionTitles).
- `/src/index.css`: Core design system, CSS variables, and Aurora background animations.
- `/src/config`: Supabase client configuration.

## 🎨 Design Philosophy

The v4 redesign focuses on a "Premium Tech" aesthetic. Instead of flat colors, the UI relies heavily on depth, lighting, and motion:
- **Depth**: Achieved via `backdrop-blur` and multi-layered backgrounds.
- **Lighting**: Simulated using large blurred gradient orbs and glowing borders on hover.
- **Motion**: Every interaction has a micro-animation (spring physics for layout shifts, infinite scroll for carousels).

## 📄 License
This project is proprietary. © 2026 Octave Bahoun. All rights reserved.
