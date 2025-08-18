// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import oxlint from 'eslint-plugin-oxlint'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default withNuxt(
  ...oxlint.configs['flat/recommended'],
  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'app/assets/css/main.css',
      },
    },
  },
)
