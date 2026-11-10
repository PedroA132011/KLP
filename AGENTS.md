# KLP Show Web App

React + Vite + Tailwind CSS v4 project.

## Development

- Start dev server: `npm run dev`
- Build production: `npm run build`
- Preview production build: `npm run preview`

## Project Structure

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into `#root`
- `src/App.tsx` - Main landing page component with all sections (Hero, Sobre, Repertório, Integrantes, Galeria, Contato)
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 styling
- `index.html` - Clean standard Vite HTML entrypoint
- `package.json` - Dependencies and build scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and `@` alias
