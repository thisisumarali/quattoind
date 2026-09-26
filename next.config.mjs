/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/index.php/our-products",
        permanent: true,
      },
      {
        source: "/our-products",
        destination: "/index.php/our-products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
