# Mukul Nidhe — Portfolio

Personal portfolio for **Mukul Nidhe — Data Analyst | Business Analyst | Power BI Developer**.

Built with React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Recharts and Lucide icons.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Deploy to Vercel (free)

1. Create a GitHub repository (for example `mukulnidhe/portfolio`) and push this folder to it.
2. Go to https://vercel.com → **Add New… → Project** → import the repository.
3. Vercel detects **Vite** automatically (build command `npm run build`, output `dist`). Click **Deploy**.
4. Optional: add a custom domain under **Project → Settings → Domains**.

The build uses relative asset paths, so `dist/` also works on Netlify, GitHub Pages or any static host.

## Contact form

By default the form opens the visitor's email app with the message pre-filled (no backend needed).
To receive messages straight in your inbox instead:

1. Create a free form at https://formspree.io and copy its ID (the part after `/f/`).
2. In Vercel → **Settings → Environment Variables**, add `VITE_FORMSPREE_ID` = that ID, then redeploy.

## Editing content

| What | Where |
| --- | --- |
| All text: summary, experience, projects, skills, education | `src/data/profile.ts` |
| GitHub / live-demo links for each project | `projectLinks` at the top of `src/components/Projects.tsx` |
| Resume PDF (Download buttons) | replace `public/Mukul_Nidhe_Resume.pdf` |
| Social preview image | `public/og-image.png` (1200×630) |
| Colours (dark & light) | CSS variables at the top of `src/index.css` |

All dashboard visuals use **illustrative sample data** (`src/data/sample.ts`); no real NMMC, company or citizen data is included.
After deploying, set `og:image` in `index.html` to the full URL (e.g. `https://your-site.vercel.app/og-image.png`) so LinkedIn previews show the image.
