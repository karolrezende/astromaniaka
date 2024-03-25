/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        'blue-900': '#100B1F',
        'blue-800': '#111A3A',
        'blue-700': '#333C65',
        'blue-600': '#3F466A',
        'blue-500': '#8D92BF',

        'purple-900': '#210535',
        'purple-800': '#430D4B',
        'purple-700': '#7B337D',
        'purple-600': '#C874B2',
        'purple-500': '#F5D5E0',

        'black-900': '#000000',
        'black-800': '#313131',
        'black-700': '#525252',
        'black-600': '#949494',
        'black-500': '#FFFFFF',

        'red-900': '#f08080' 
      }
    },
  },
  plugins: [],
}
