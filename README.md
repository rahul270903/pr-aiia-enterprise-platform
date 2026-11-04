# Pr AiiA Enterprise Platform Prototype

Vite + React + TypeScript project wrapper for the existing Pr AiiA interactive prototype. The original application has been moved into `src/App.tsx`; its screens, mock records, Golden Thread flow, UI, and client-side interactions are retained.

> **Prototype note:** This is an interactive front-end prototype. State changes are simulated in the browser and persisted in that browser's `localStorage`. It does not connect to a production backend, execute real endpoint remediation, or provide real enterprise security controls.

## Requirements

- Node.js 20.19+
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production-ready static site is generated in `dist/`.

## Push to GitHub

1. Create an empty repository on GitHub (do not add a README or other files if you already have this project locally).
2. From the project directory, run:

   ```bash
   git init
   git add .
   git commit -m "Add Pr AiiA enterprise platform prototype"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git push -u origin main
   ```

3. Replace the remote URL with your GitHub repository URL.

## Deploy to Vercel

1. Sign in to [Vercel](https://vercel.com/) and choose **Add New → Project**.
2. Import the GitHub repository you created above.
3. Vercel should detect **Vite** automatically. Confirm these settings if needed:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Select **Deploy**. After the build completes, Vercel provides a live URL you can share.
5. Future pushes to the connected branch trigger a new deployment automatically.

The included `vercel.json` sets the Vite framework, build command, and `dist` output directory. No environment variables are required by the current prototype.

## Project structure

```text
pr-aiia-vercel/
├── src/
│   ├── App.tsx       # Complete original prototype source
│   ├── main.tsx      # React application entry point
│   └── index.css     # Tailwind directives and minimal root sizing
├── public/           # Static assets (currently none required)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
├── postcss.config.js
├── tailwind.config.js
├── .gitignore
└── README.md
```

## Prototype state and browser storage

The prototype uses `localStorage` under the key `pr_aiia_enterprise_state_v2`. Changes made during a session remain in that browser profile. To restore the initial sample state, clear that key in the browser's developer tools. This does not affect other users' browsers.

## Notes

- `lucide-react` supplies the icons imported by the original source.
- Tailwind CSS 3 is configured to scan the complete TSX application, including utility classes in template literals.
- The app has no backend/API integration in this project; do not treat mock approvals, remediation progress, audit records, or sample security events as real operational activity.
