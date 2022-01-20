import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import WindiCSS from 'vite-plugin-windicss'
import svgLoader from 'vite-svg-loader'
import copy from 'rollup-plugin-copy'
import PurgeIcons from 'vite-plugin-purge-icons'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
    PurgeIcons({
      /* PurgeIcons Options */
    }),
    copy({
      targets: [{ src: 'windicss.config.ts', dest: 'dist/' }],
    }),
    svgLoader(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'xyzUI',
      fileName: 'xyz-ui',
    },
    watch: {
      include: [path.resolve(__dirname, 'src')],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
