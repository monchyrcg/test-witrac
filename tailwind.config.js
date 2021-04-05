module.exports = {
  // darkMode: 'media',
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      'nutriwell': ['Muller-Regular']
    },
    inset: {
      '0': 0,
      auto: 'auto',
      '1/5': '20px',
      '1/2': '50px',
      '1/2%': '50%'
    },
    extend: {
      colors: {
        nutriwell: {
          DEFAULT: '#006C5B',
          stone: '#86897E',
          sansivera: '#6FBFA4',
          mustela: '#256741',
          sand: '#E1915D',
          sun: '#EEAE64'
        }
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
