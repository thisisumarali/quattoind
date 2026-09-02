const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultProducts = [
  {
    category: "filmtec",
    name: "FILMTEC BW30 PRO-400",
    desc: "High Rejection and High Performance Industry-Standard Brackish Water Reverse Osmosis Membrane Element",
    specLink: "/pdfs/RO-FilmTec-BW30-PRO-400-PDS-45-D03742-en.pdf"
  },
  {
    category: "filmtec",
    name: "FILMTEC SW30HRLE-400",
    desc: "High Rejection, Seawater Reverse Osmosis Element",
    specLink: "/pdfs/SW30HRLE-400.pdf"
  },
  {
    category: "filmtec",
    name: "FILMTEC SW30HRLE-440i",
    desc: "High Rejection, Seawater Reverse Osmosis Element with iLEC™ Interlocking Endcaps",
    specLink: "/pdfs/SW30HREL-440i.pdf"
  },
  {
    category: "filmtec",
    name: "FILMTEC SW30HRLE-4040",
    desc: "4″ Seawater Reverse Osmosis Element",
    specLink: "/pdfs/SW30HRLE-4040.pdf"
  },
  {
    category: "filmtec",
    name: "FILMTEC BW30-400",
    desc: "High Rejection, High Surface Area Brackish Water RO Element",
    specLink: "/pdfs/SW30HRLE-400-1.pdf"
  },
  {
    category: "toray",
    name: "TORAY TM710D",
    desc: "4″ High Rejection BWRO, enhanced chemical tolerance",
    specLink: "/pdfs/TM700D.pdf"
  },
  {
    category: "toray",
    name: "TORAY TM720D-400",
    desc: "High Rejection, high performance brackish water RO membrane.",
    specLink: "/pdfs/TM700D.pdf"
  },
  {
    category: "toray",
    name: "TORAY TM720D-440",
    desc: "40 sq.ft of extra membrane for higher flow rate",
    specLink: "/pdfs/TM700D.pdf"
  },
  {
    category: "toray",
    name: "TORAY TM820V-400",
    desc: "Exceptional seawater membrane by Toray",
    specLink: "/pdfs/TM800V.pdf"
  },
  {
    category: "toray",
    name: "TORAY TMG20D-400",
    desc: "Low energy variable membrane – Highest Rated",
    specLink: "/pdfs/TMGD.pdf"
  },
  {
    category: "toray",
    name: "TORAY TML720D-400",
    desc: "Low fouling TORAY TML720D-400",
    specLink: "/pdfs/TMLD.pdf"
  },
  {
    category: "awc",
    name: "AWC A-100",
    desc: "Reverse Osmosis Membrane Antiscalant General Purpose",
    specLink: "/pdfs/AWC-A-100-PDS-2017_.pdf"
  },
  {
    category: "awc",
    name: "AWC C-205",
    desc: "Low pH Membrane Cleaning Compound",
    specLink: "/pdfs/AWC-C-205-PDS-2017.pdf"
  },
  {
    category: "awc",
    name: "AWC C-226",
    desc: "High pH Membrane Cleaning Compound",
    specLink: "/pdfs/AWC-C-226-PDS-2017.pdf"
  },
  {
    category: "media",
    name: "BIRM",
    desc: "Granular Filter Media. Highly efficient and cost-effective iron and manganese removal media.",
    specLink: "/pdfs/birm_2350.pdf"
  },
  {
    category: "media",
    name: "CS-HAC",
    desc: "Clack Granular Activated Carbon. Designed for chlorine, taste, and odor reduction.",
    specLink: "/pdfs/coconut_shell_high_activated_carbon_2820.pdf"
  },
  {
    category: "media",
    name: "ANTHRACITE",
    desc: "Ideal for single bed, dual bed or multi-media filtration systems.",
    specLink: "/pdfs/anthracite_2354.pdf"
  },
  {
    category: "media",
    name: "FILTER-AG",
    desc: "Silica, Crystalline Quartz Media. Less pressure loss and high particulate load capacity.",
    specLink: "/pdfs/filter-ag_2351.pdf"
  },
  {
    category: "media",
    name: "FILTER-AG PLUS",
    desc: "Clinoptilolite Natural Media. Premium filtration media with high surface area and 5-micron rating.",
    specLink: "/pdfs/filter-ag_plus_2718.pdf"
  }
];

async function main() {
  console.log("Synchronizing PostgreSQL database products...");
  try {
    // Delete existing products
    const deleted = await prisma.product.deleteMany({});
    console.log(`Deleted ${deleted.count} old products.`);
    
    // Create new products
    const created = await prisma.product.createMany({
      data: defaultProducts
    });
    console.log(`Created ${created.count} live synchronized products.`);
    console.log("Database synchronization completed successfully!");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
