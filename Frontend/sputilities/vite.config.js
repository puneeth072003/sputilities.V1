import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // Enable JSX runtime
      jsxRuntime: 'automatic',
    })
  ],
  server: {
    port: 5173,
    host: true,
    // Ensure unknown routes are redirected to index.html
    historyApiFallback: true,
  },
  build: {
    // Optimize build
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
      'lucide-react',
      'zustand',
      'axios',
      'react-hot-toast',
      'clsx',
    ],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
