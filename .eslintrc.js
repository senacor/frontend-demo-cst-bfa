module.exports = {
  root: true,
  extends: ['airbnb-typescript/base'],
  plugins: ['import', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'coverage/*',
    'dist/*',
    'cypress.config.ts',
    'tailwind.config.js',
    'setup-jest.ts',
  ],
  rules: {
    'no-multiple-empty-lines': 'warn'
  }
};
