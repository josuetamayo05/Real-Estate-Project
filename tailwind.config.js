/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0A0A0A',
        'brand-bg': '#F8F8F8',
        'brand-gold': '#C9A961',
        'brand-gold-dark': '#B89750',
        'brand-gold-gradient': '#D4AF37',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}