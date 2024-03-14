import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },

   css: {
      preprocessorOptions: {
         scss: {
            additionalData: `
            @import "./src/shared/scss/base/_vars.scss";
            @import "./src/shared/scss/base/_mixins.scss";
         `,
         },
      },
   },
});
