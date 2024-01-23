/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "encrypted-tbn3.gstatic.com"
            }
        ]
    },
}

module.exports = nextConfig
