/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '/index.html',
    './src/**/*.{html,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      'animation': {
        'text': 'text 10s ease infinite'
      },
      'keyframes': {
        'text': {
          '0%, 100%': {
            'background-size':'200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size':'200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['dark','synthwave', 'acid', 'corporate']
  }
}

