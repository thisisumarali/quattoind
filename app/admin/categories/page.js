import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCategories, isAdminAuthenticated } from "@/app/actions";
import CategoryManager from "./CategoryManager";

export default async function AdminCategoriesPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const categories = await getCategories();

  return <CategoryManager initialCategories={categories} />;
}
