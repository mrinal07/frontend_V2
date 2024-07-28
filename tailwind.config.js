/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // charcoal and yellow
        // "primary":"#101820",
        // "secondary" :"#FEE715" ,
        // "tertiary":"#faef8c",

        // dark , gold , neon blue
        // "primary":"#0A1828",
        // "secondary" :"#FEE715" ,
        // "tertiary":"#549ae9",

        // Dark Blue (#1B263B) Light Gray (#F5F5F5) Teal (#38B2AC)/ Gold
        // "primary":"#1B263B",
        // "secondary" :"#FFFAFA" ,
        // "tertiary":"#38B2AC",
        // "tertiary":"#FFD700",

        // black(000000) , gold , neon blue
        "primary":"#171616",
        "secondary" :"#FFD700" ,        
        "tertiary":"#38B2AC",


        // "primary":"#228B22",
        // "secondary" :"#F5F5DC" ,
        // "tertiary":"#228B22",

        // Charcoal and yellow
        // "primary":"#101820",
        // "secondary" :"#FEE715" ,
        // "tertiary":"#54D6BB ", 

        // "primary":"#2C5F2D",
        // "secondary" :"#FFD700" ,
        // "tertiary":"#FFFDD0 ", 


        // original
        // "primary":"#0A192F",
        // "secondary" :"#F97316" ,
        // "tertiary":"#54D6BB",
      }
    },
    screens: {
    '2xl': '1536px',
    'xl': '1280px',
    'md': '768px',
     lg:{max :"2023px"},
     sm:{max :"639px"},
    },
  },
  plugins: [],
} ;
