import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite settings. The React plugin lets us write JSX in .jsx files.
export default defineConfig({
  plugins: [react()],
});
