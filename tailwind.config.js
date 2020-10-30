module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      'nutriwell': ['Muller-Thin'],
    },
    inset: {
      '0': 0,
      auto: 'auto',
      '1/2': '50px',
      '1/2%': '50%',
    },
    extend: {
      colors: {
        nutriwell: {
          default: '#006C5B',
          stone: '#86897E',
          sansivera: '#6FBFA4',
          mustela: '#256741',
          sand: '#E1915D',
          sun: '#EEAE64',
        },
        facebook: {
          default: '#4267b2',
        },
        twitter: {
          default: '#1da0f2',
        },
        github: {
          default: '#333',
        }
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
  ]
}
