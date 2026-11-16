import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  {
    ignores: ['.cache/**', '.secrets/**', 'reports/**', 'public/new/**', 'experiments/room/**'],
  },
  ...nextVitals,
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
]

export default config
