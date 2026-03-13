import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { VitePWA } from '@vite-pwa/astro';

export default defineConfig({
  integrations: [
    starlight({
      customCss: ['./src/styles/global.css'],
      title: 'Glib',
      description: 'Chords, Riffs, and Wisdom—documented for the modern player.',
      sidebar: [
        {
          label: 'Library',
          items: [
            { label: 'Home', link: '/' },
            {
              label: 'Theory',
              autogenerate: { directory: 'theory' }
            },
            {
              label: 'Chords',
              autogenerate: { directory: 'chords' }
            },
            {
              label: 'Licks',
              autogenerate: { directory: 'licks' }
            }
          ]
        }
      ]
    }),
    react(),
    tailwind(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Glib',
        short_name: 'Glib',
        description: 'Offline guitar reference library with theory, chords, and licks.',
        theme_color: '#0b1020',
        background_color: '#0b1020',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/icons/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}'],
        navigateFallback: '/',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/i\.ytimg\.com\/.*$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ytimg-assets',
              expiration: {
                maxEntries: 64,
                maxAgeSeconds: 60 * 60 * 24 * 14
              }
            }
          }
        ]
      }
    })
  ]
});
