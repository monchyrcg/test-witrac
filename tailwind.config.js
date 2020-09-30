module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      'nutriwell': ['slim-joe, big-jhon', 'monserrat'],
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
          default: '#004d44'
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
  plugins: [],
}
