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
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
              },
              {
                protocol: 'https',
                hostname: 'images.unsplash.com',
               pathname :'/broken'
              },
        ]
    },


};

export default nextConfig;
