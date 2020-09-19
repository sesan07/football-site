module.exports = {
  purge: {
    enabled: false,
    content: [
      './src/**/*.html',
      './src/**/*.scss'
    ]
  },
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1600px'
    },
    extend: {
      colors: {
        dark: {
          '100': '#666666',
          '200': '#555555',
          '300': '#4A4A4A',
          '400': '#404040',
          '500': '#353535',
          '600': '#2B2B2B',
          '700': '#202020',
          '800': '#151515',
          '900': '#0B0B0B',
        }
      }
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
}
