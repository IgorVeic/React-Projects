/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        "mobile-sm": "320px", // Custom breakpoint for small mobile devices
        "mobile-md": "375px", // Custom breakpoint for medium mobile devices
        "mobile-lg": "425px", // Custom breakpoint for large mobile devices
        tablet: "640px", // Custom breakpoint for tablets
        "tablet-md": "768px", // Custom breakpoint for medium tablets
        "tablet-lg": "900px", // Custom breakpoint for large tablets
        laptop: "1024px", // Custom breakpoint for laptops
        "laptop-md": "1280px", // Custom breakpoint for medium laptops
        "laptop-lg": "1440px", // Custom breakpoint for large laptops
        desktop24: "1920px", // Custom breakpoint for 24-inch monitors
        desktop27: "2560px", // Custom breakpoint for 27-inch monitors
        desktop32: "3840px", // Custom breakpoint for 32-inch monitors
      },
    },
  },
  plugins: [],
};
