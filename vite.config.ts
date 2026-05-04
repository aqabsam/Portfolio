import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const deployTarget = process.env.DEPLOY_TARGET;

export default defineConfig({
  plugins: [react()],
  base: deployTarget === 'github-pages' ? '/Portfolio/' : '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
