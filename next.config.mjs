/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        dangerouslyAllowSVG:true,
        remotePatterns:[
            {
                protocol:'https',
                hostname:'img.itch.zone'
            },
            {
                protocol:'https',
                hostname:'placehold.co'
            }
        ]
    }
};

export default nextConfig;
