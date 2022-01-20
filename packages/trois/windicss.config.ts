const { transform } = require('windicss/helpers')
import plugin from 'windicss/plugin'
import animations from '@windicss/plugin-animations'
import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [transform('daisyui'), animations],
  theme: {
    extend: {
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
