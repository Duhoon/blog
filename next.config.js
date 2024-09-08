const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions:{
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/v0/b/blog-9afa3.appspot.com/o/**'
            }
        ]
    }
}

module.exports = nextConfig
