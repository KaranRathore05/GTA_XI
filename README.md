# 🎮 GTA 6 Landing Page

A cinematic, **GSAP–powered** landing page tribute to Grand Theft Auto VI.<br>
Built with **React 19 + Vite** and deployed on **Firebase Hosting**, it features
reload-triggered title cinematics and immersive mouse‑move parallax effects
that bring Vice City’s neon vibe to life.

<p align="center">
  <img src="screens/demo.gif" alt="GTA 6 landing page demo" width="700">
</p>

---

## ✨ Features

| ⚡️  | Description |
|-----|-------------|
| **Reload intro** | GSAP timeline choreographs a logo reveal, glitch flashes and background zoom on every hard refresh. |
| **Mouse‑move parallax** | Cursor position drives subtle X/Y translation and skew on sky, palms and title layers for depth. |
| **Responsive** | CSS clamp + viewport units keep the layout pixel‑perfect from mobile to ultrawide. |
| **One‑scroll reveal** | ScrollTrigger animates content cards into view with fade‑up & slide‑left motion. |
| **Firebase Hosting** | CI‑friendly deploy to `dist/`, SPA rewrites configured. |

---

## 🔧 Tech Stack

| Category | Packages / Tools |
|----------|------------------|
| **Frontend** | React 19, Vite 5, Tailwind CSS |
| **Animation** | GSAP 3 (`gsap`, `ScrollTrigger`, `MotionPathPlugin`) |
| **Icons & Fonts** | RemixIcon, custom *Pricedown* OTF |
| **Deployment** | Firebase CLI, Firebase Hosting |

---

Preview: ![Uploading image.png…]()


## 🖥️  Local Development

> **Prerequisites:** Node ≥ 18, npm ≥ 9

```bash
# 1. Clone the repo
git clone https://github.com/<your‑user>/gta6-landing.git
cd gta6-landing

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# ➜ open http://localhost:5173
