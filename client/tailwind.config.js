/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Roboto', 'Open Sans', 'sans-serif'],
        body: ['Georgia', 'Merriweather', 'serif'],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      fontSize: {
        base: '1rem', // Default font size (16px)

        // Custom responsive font sizes
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px, for screens sm and up
        md: ['1rem', { lineHeight: '1.5rem' }], // 16px, for screens md and up
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px, for screens lg and up
        xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px, for screens xl and up
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px, for screens 2xl and up
      },
    },
    screens: {
      sm: '640px', // Min-width: 640px
      md: '768px', // Min-width: 768px
      lg: '1024px', // Min-width: 1024px
      xl: '1280px', // Min-width: 1280px
      '2xl': '1536px', // Min-width: 1536px
    },
    colors: {
      'light-pink': '#FDFCFE', // RGB(253, 252, 253)
      black: '#010101', // RGB(1, 1, 1)
      white: '#FFFFFF',
      'bright-pink': '#FE69C5', // RGB(254, 105, 197)
      'medium-blue': '#4E93FF', // RGB(78, 147, 255)
      'medium-gray': '#777777', // RGB(119, 119, 119)
    },
    fontFamily: {
      cnn: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
};
