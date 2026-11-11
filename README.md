# Kgotso Dlamini — Developer Portfolio

A responsive portfolio website built with **React, Vite, and CSS**, ready to deploy on Vercel.

## Requirements
- Node.js (LTS recommended)
- npm

## Run locally
1. Extract this folder.
2. Open the folder in VS Code.
3. Open Terminal in VS Code and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL shown by Vite, usually `http://localhost:5173`.

## Check production build
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Create a GitHub account if you do not already have one.
2. Create a new repository and upload the contents of this project folder.
3. Sign in at https://vercel.com/ using GitHub.
4. Choose **Add New → Project** and import your repository.
5. Vercel should detect Vite automatically.
6. Use `npm run build` as the build command and `dist` as the output directory if prompted.
7. Click **Deploy**.

Every new push to the connected repository can trigger a new deployment.

## Personalise before publishing
Search in `src/App.jsx` and replace:
- `YOUR_EMAIL@example.com` with your real professional email.
- GitHub and LinkedIn links with your actual profile URLs.
- `Update graduation year` with your expected graduation year.
- Project descriptions/statuses so they accurately reflect what is completed, in progress, or only planned.
- Add project repository/demo links and real screenshots where available.

## Notes
- This is a static frontend. It does not require PHP or a database to deploy.
- Do not publish passwords, API keys, private credentials, or confidential project data.
- The Google Fonts import needs an internet connection; the site will fall back to system fonts if unavailable.
