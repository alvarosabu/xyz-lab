const { transform } = require('windicss/helpers')

import animations from '@windicss/plugin-animations'
import aspectRatio from 'windicss/plugin/aspect-ratio'
import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [transform('daisyui'), animations, aspectRatio],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        display: ['Signika', 'Georgia', 'serif'],
        typewrite: ['iA Writer Duo S', 'Georgia', 'serif'],
        body: ['Roboto'],
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.primary.400'),
            a: {
              color: theme('colors.secondary.400'),
              fontWeight: 'bold',
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.secondary.500'),
              },
            },
          },
        },
      }),
    },
  },
})
