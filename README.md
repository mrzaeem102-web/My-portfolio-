Zaeem.dev — Portfolio

Production-ready personal portfolio for Muhammad Zaeem Fayyaz.

Stack

- React 19 + TypeScript
- Vite 7
- Custom CSS (olive / off-white design)
- Framer Motion + Lucide icons

This is a static frontend. There is no backend, database, or authentication. The contact form opens a "mailto:" draft to "zaeemfayyaz18@gmail.com".

Scripts

npm install
npm run dev # local development
npm run typecheck # TypeScript
npm run build # typecheck + production build
npm run preview # serve dist/

Profile photo

Place a portrait at "public/images/zaeem-profile-new.jpg", then set "profilePhotoSrc" in "src/App.tsx" to ""/images/zaeem-profile-new.jpg"". Until that file exists, the hero shows the designed MZF monogram (no broken image request).

Deploy to Vercel

1. Push this project to GitHub.
2. Sign in at "vercel.com" (https://vercel.com) with the same GitHub account.
3. Add New Project → import the repository.
4. Framework preset: Vite. Build command: "npm run build". Output: "dist".
5. Deploy. No environment variables are required.

Or from the CLI after "npx vercel login":

npx vercel --prod
