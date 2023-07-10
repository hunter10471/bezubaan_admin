/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				heading: '#127357',
				primary: '#40B37C',
				secondary: '#1ED96F',
				text: '#40B37C',
				subheading: '#010B40',
				white: '#fff',
				black: '#000',
				gray: '#535256',
				accent: '#DA6525',
				lightBlack: '#454545',
			},
			backgroundImage: {
				'login-background': "url('/assets/login-background.jpg')",
			},
		},
	},
};
