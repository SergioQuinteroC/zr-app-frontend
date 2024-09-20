/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				custom1: "#6c757d",
				customGray: {
					DEFAULT: "#343a40",
					light: "#6c757d",
					dark: "#343a40",
				},
			},
		},
	},
	plugins: [],
};
