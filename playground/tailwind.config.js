const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./node_modules/ui-framework-v2/dist/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  safelist: [
    "bg-shiplogic",
    "hover:bg-shiplogic-dark",
    "bg-bobgo",
    "hover:bg-bobgo-dark",
    "max-w-4xl",
    "top-2",
    "-ml-32",
    "right-4",
    "-top-2",
    "-right-2",
    "left-2",
    "bg-primary-100",
    "bg-black",
    "bg-black-100",
    "bg-black-200",
    "bg-black-500",
    "bg-blue",
    "bg-blue-100",
    "bg-blue-200",
    "bg-blue-500",
    "bg-gray",
    "bg-gray-100",
    "bg-gray-200",
    "bg-gray-50",
    "bg-gray-500",
    "bg-green",
    "bg-green-100",
    "bg-green-200",
    "bg-green-50",
    "bg-green-500",
    "bg-pink-100",
    "bg-pink-500",
    "bg-primary",
    "hover:bg-primary",
    "bg-primary-200",
    "bg-primary-50",
    "bg-red",
    "bg-red-100",
    "bg-red-200",
    "bg-red-50",
    "bg-red-500",
    "bg-yellow-100",
    "bg-yellow-200",
    "bg-yellow-50",
    "bg-yellow-500",
    "black-dark",
    "blue-dark",
    "border-b",
    "border-b-2",
    "border-gray-200",
    "border-gray-200",
    "border-gray-300",
    "border-green-200",
    "border-primary",
    "border-primary-200",
    "border-primary-200",
    "border-primary-500",
    "border-red-200",
    "border-transparent",
    "border-yellow-200",
    "font-bold",
    "green-dark",
    "group",
    "h-screen",
    "hover:border-gray-300",
    "hover:text-gray-900",
    "inline-flex",
    "items-center",
    "-pb-7",
    "pb-4",
    "pt-16",
    "pt-6",
    "pt-2.5",
    "py-1.5",
    "red-dark",
    "rounded",
    "sm:flex-nowrap",
    "sm:block",
    "md:ml-4",
    "md:h-32",
    "md:grid-cols-6",
    "md:grid-cols-5",
    "lg:flex-row",
    "lg:mt-12",
    "lg:bg-gray-50",
    "lg:w-3/4",
    "md:mt-12",
    "xl:w-32",
    "xl:w-40",
    "xl:flex-row",
    "space-x-4",
    "text-black",
    "text-black-700",
    "text-blue",
    "text-blue-400",
    "text-blue-500",
    "text-blue-600",
    "text-blue-700",
    "text-gray",
    "text-gray-400",
    "text-gray-500",
    "text-gray-600",
    "text-gray-700",
    "text-green-500",
    "text-green-600",
    "text-green",
    "text-green-400",
    "text-green-700",
    "text-pink",
    "text-pink-400",
    "text-pink-500",
    "text-pink-600",
    "text-pink-700",
    "text-primary",
    "text-primary-400",
    "text-primary-500",
    "text-primary-600",
    "text-primary-700",
    "text-red",
    "text-red-400",
    "text-red-500",
    "text-red-600",
    "text-red-700",
    "text-indigo-800",
    "text-indigo-900",
    "bg-indigo-100",
    "text-yellow",
    "text-yellow-400",
    "text-yellow-500",
    "text-yellow-600",
    "text-yellow-700",
    "w-1/2",
    "w-3/4",
    "w-80",
    "space-x-4"
  ],
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none"
    },
    extend: {
      spacing: {
        120: "30rem"
      },
      transitionProperty: {
        width: "width"
      }
    },
    fontFamily: {
      sans: ["Montserrat"]
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px"
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: { ...colors.red, light: "#FCA5A5", DEFAULT: "#DC2626", dark: "#991B1B" },
      green: {
        ...colors.green,
        100: "rgb(231, 255, 209)",
        500: "#06b73d",
        DEFAULT: "#06b73d"
      },
      pink: {
        ...colors.pink,
        100: "#FFDFDC",
        500: "#FF024E",
        DEFAULT: "#FF024E"
      },
      yellow: {
        ...colors.yellow,
        100: "#FFFBD3",
        500: "#FFB600",
        DEFAULT: "#FFB600"
      },
      blue: {
        ...colors.blue,
        light: "#D6ECFF",
        DEFAULT: "#007BFF",
        dark: "#0060C7",
        100: "rgb(214, 236, 255)",
        500: "#0076fa"
      },
      orange: {
        ...colors.orange,
        100: "#FFE6D3",
        500: "#FF6A00"
      },
      primary: {
        ...colors.pink,
        100: "#fbcfe8",
        500: "#ff318e",
        DEFAULT: "#ff318e",
        dark: "#62062b"
      },
      shiplogic: {
        light: "#D6ECFF",
        DEFAULT: "#007BFF",
        dark: "#0060C7"
      },
      bobgo: {
        light: "#D6ECFF",
        DEFAULT: "#1ABC9C",
        dark: "#148F77"
      }
    }
  },
  variants: {
    extend: {
      opacity: ["disabled"]
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
