import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/app/actions";
import ProductsManager from "./ProductsManager";

export const metadata = {
  title: "Admin Products | Quattro Industries",
};

const defaultCategories = [
  { name: "DuPont Filmtec", slug: "filmtec" },
  { name: "Toray Membranes", slug: "toray" },
  { name: "AWC Chemicals", slug: "awc" },
  { name: "CLACK Media", slug: "media" },
];

export default async function AdminProductsPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  let products = [];
  let categories = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { id: "asc" },
    });

    categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    if (categories.length === 0) {
      await prisma.category.createMany({
        data: defaultCategories,
      });
      categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
      });
    }
  } catch (error) {
    console.error("Failed to fetch products/categories in admin panel:", error);
  }

  return <ProductsManager initialProducts={products} initialCategories={categories} />;
}
