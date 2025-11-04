// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import oxlint from 'eslint-plugin-oxlint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default withNuxt(...oxlint.configs['flat/recommended'], eslintConfigPrettier)
