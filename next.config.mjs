/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: "loose", // <-- add this
        serverComponentsExternalPackages: ["mongoose"],
        instrumentationHook: true,
    },
    reactStrictMode: false
};

export default nextConfig;
