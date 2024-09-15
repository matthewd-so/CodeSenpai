/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{tsx,ts,js,jsx}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--bg-color)",
                // bg_2: "var(--bg-2-color)",
                text: "var(--text-color)",
                text_2: "var(--text-2-color)",
                // text_3: "var(--text-3-color)",
                borders: "var(--borders-color)",
                code: "var(--code-color)",
                // primary: "var(--primary-color)",
            },
            keyframes: {
                slideInRight: {
                  '0%': { transform: 'translateX(100%)' },
                  '100%': { transform: 'translateX(0)' },
                },
            },
            animation: {
                slideInRight: 'slideInRight 0.5s ease-out',
            },
            animationDelay: {
                '2s': '2s',
            },
        },
    },
    variants: {},
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.delay-2s': {
          'animation-delay': '2s',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
