/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
	},
	output: "export",
	trailingSlash: true,
	skipTrailingSlashRedirect: true,
	assetPrefix: "/",
};

export default nextConfig;
