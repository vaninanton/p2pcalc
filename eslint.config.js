import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import configPrettier from '@vue/eslint-config-prettier'
import globals from 'globals'

export default [
  {
    ignores: ['dist/', 'node_modules/', '.git/'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  configPrettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
  },
]
