import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import WindiCSS from 'vite-plugin-windicss'
import svgLoader from 'vite-svg-loader'
import copy from 'rollup-plugin-copy'
import PurgeIcons from 'vite-plugin-purge-icons'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    glsl(),
    WindiCSS(),
    PurgeIcons({
      /* PurgeIcons Options */
    }),
    copy({
      targets: [{ src: 'windicss.config.ts', dest: 'dist/' }],
    }),
    svgLoader(),
  ],
})
