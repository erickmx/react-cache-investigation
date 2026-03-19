/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['common', 'components-base'],
  reactStrictMode: true,
  reactCompiler: {
    compilationMode: 'annotation',
  },
}

module.exports = nextConfig
