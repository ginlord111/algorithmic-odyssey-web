/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'img.itch.zone'
            }
        ]
    }
};

export default nextConfig;
