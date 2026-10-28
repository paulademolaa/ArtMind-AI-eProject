import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite settings. The React plugin lets us write JSX in .jsx files.
export default defineConfig({
  plugins: [react()],
  server: {
    // Always use http://localhost:5173. Without this, Vite quietly moves to
    // 5174, 5175… when 5173 is busy, and the browser keeps a separate storage
    // for each address — so saved accounts and favourites seem to "disappear".
    port: 5173,
    strictPort: true,
  },
});
