/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            scrollbarTrack: (theme) => ({
                "background-color": "black",
            }),
            scrollbarThumb: (theme) => ({
                "background-color": "#3d3d3d",
                "&:hover": {
                    "background-color": "#1e1e1e",
                },
            }),
        },
    },
    plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};
