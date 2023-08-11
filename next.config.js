/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['bezubaan.s3.amazonaws.com'],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
