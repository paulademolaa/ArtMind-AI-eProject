import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite settings. The React plugin lets us write JSX in .jsx files.
// Note: the site normally runs at http://localhost:5173. If that port is busy,
// Vite moves to 5174, 5175… Saved accounts and favourites are kept per address,
// so they will only show again when you are back on 5173.
export default defineConfig({
  plugins: [react()],
});
