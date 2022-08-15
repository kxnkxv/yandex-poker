/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    screens: {
      'sm': '500px',
      'md': [
        {'min': '668px', 'max': '767px'},
        {'min': '868px'}
      ],
      'lg': '1100px',
      'xl': '1400px',
    },
    extend: {
      colors: {
        "purple": "var(--color-purple)",
        "white": "var(--color-white)",
        "blue": "var(--color-blue)",
        "dark-blue": "var(--color-dark-blue)",
        "red": "var(--color-red)",
        "crimson": "var(--color-crimson)",
        "light-blue": "var(--color-light-blue)",
        "cyan": "var(--color-cyan)",
        "magenta": "var(--color-magenta)"
      },
    },
  },
  plugins: [],
}
