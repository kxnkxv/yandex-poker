/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: 'var(--color-purple)',
        white: 'var(--color-white)',
        'dark-blue': 'var(--color-dark-blue)',
        red: 'var(--color-red)',
        crimson: 'var(--color-crimson)',
        magenta: 'var(--color-magenta)',
        grey: 'var(--color-grey)',
      },
    },
  },
  plugins: [],
}
