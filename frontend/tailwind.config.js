/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',      // Indigo
        secondary: '#3F51B5',    // Deep Blue
        accent: '#9C27B0',       // Purple
        'chart-2': '#10B981',    // Green for trends
      },
    },
  },
  plugins: [],
}
