import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_LOCATION_API_KEY': JSON.stringify(import.meta.env.VITE_LOCATION_API_KEY),
  },
});
