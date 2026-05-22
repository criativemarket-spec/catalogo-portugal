/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta principal premium feminina
        rose: {
          gold: '#B8860B',
          'gold-light': '#D4A843',
          'gold-pale': '#F0D080',
        },
        nude: {
          50:  '#FDF8F5',
          100: '#F9EFE7',
          200: '#F2DDD0',
          300: '#E8C9B5',
          400: '#D9AD90',
          500: '#C49070',
          600: '#A87050',
          700: '#8A5535',
          800: '#6B3D20',
          900: '#4D2A10',
        },
        bege: {
          50:  '#FDFAF6',
          100: '#F7F1E8',
          200: '#EDE2D0',
          300: '#DDD0B5',
          400: '#C8B990',
          500: '#B0A070',
          600: '#958555',
          700: '#786840',
          800: '#5A4C2D',
          900: '#3D321C',
        },
        rosegold: {
          50:  '#FDF2F4',
          100: '#FAE4E8',
          200: '#F5C9D2',
          300: '#EDA5B5',
          400: '#E07A92',
          500: '#CE5070',
          600: '#B03058',
          700: '#8E1E44',
          800: '#6D1033',
          900: '#4D0824',
        },
        cream: {
          DEFAULT: '#FBF7F2',
          dark: '#F5EDE3',
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Jost', 'Helvetica Neue', 'sans-serif'],
        accent: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'texture-cream': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c49070' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'premium': '0 4px 24px rgba(180, 120, 60, 0.12)',
        'premium-hover': '0 8px 40px rgba(180, 120, 60, 0.20)',
        'card': '0 2px 16px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.10)',
        'drawer': '-4px 0 40px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'xl2': '1.25rem',
        'xl3': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
