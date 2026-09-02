"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

// Admin Authentication Check
export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "true";
}

// Admin Login
export async function adminLogin(password) {
  if (!password) {
    return { success: false, error: "Password is required" };
  }

  const expectedPassword = process.env.ADMIN_PASSWORD || "admin123_change_me";

  if (password === expectedPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid password" };
}

// Admin Logout
export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}

// Submit Contact Form Inquiry (Public)
export async function submitInquiry(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const company = formData.get("company");
  const message = formData.get("message");

  if (!name || !email || !phone || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    await prisma.inquiry.create({
      data: {
        name: String(name),
        email: String(email),
        phone: String(phone),
        company: company ? String(company) : null,
        message: String(message),
        status: "pending",
      },
    });

    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

// Create Product (Admin Only)
export async function createProduct(formData) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  const category = formData.get("category");
  const name = formData.get("name");
  const desc = formData.get("desc");
  const pdfFile = formData.get("pdfFile");

  if (!category || !name || !desc) {
    return { success: false, error: "Category, Name, and Description are required." };
  }

  if (!pdfFile || pdfFile.size === 0) {
    return { success: false, error: "PDF datasheet file is required for new products." };
  }

  try {
    const bytes = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = pdfFile.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const destDir = path.join(process.cwd(), "public", "pdfs");

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const filePath = path.join(destDir, fileName);
    await fs.promises.writeFile(filePath, buffer);
    const specLink = `/pdfs/${fileName}`;

    await prisma.product.create({
      data: {
        category: String(category),
        name: String(name),
        desc: String(desc),
        specLink,
      },
    });

    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Database or file system error occurred." };
  }
}

// Update Product (Admin Only)
export async function updateProduct(id, formData) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  const category = formData.get("category");
  const name = formData.get("name");
  const desc = formData.get("desc");
  const pdfFile = formData.get("pdfFile");

  if (!category || !name || !desc) {
    return { success: false, error: "Category, Name, and Description are required." };
  }

  try {
    const existing = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return { success: false, error: "Product not found." };
    }

    let specLink = existing.specLink;

    if (pdfFile && pdfFile.size > 0) {
      const bytes = await pdfFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = pdfFile.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const destDir = path.join(process.cwd(), "public", "pdfs");

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      const filePath = path.join(destDir, fileName);
      await fs.promises.writeFile(filePath, buffer);
      specLink = `/pdfs/${fileName}`;
    }

    await prisma.product.update({
      where: { id: Number(id) },
      data: {
        category: String(category),
        name: String(name),
        desc: String(desc),
        specLink,
      },
    });

    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error: "Database or file system error occurred." };
  }
}

// Delete Product (Admin Only)
export async function deleteProduct(id) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Database error occurred." };
  }
}

// Update Inquiry Status (Admin Only)
export async function updateInquiryStatus(id, status) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.inquiry.update({
      where: { id: Number(id) },
      data: { status },
    });

    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("Failed to update inquiry status:", error);
    return { success: false, error: "Database error occurred." };
  }
}

// Get All Categories
export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

// Create Category (Admin Only)
export async function createCategory(name) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  if (!name || !name.trim()) {
    return { success: false, error: "Category name is required." };
  }

  const trimmedName = name.trim();
  const slug = trimmedName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (!slug) {
    return { success: false, error: "Invalid category name." };
  }

  try {
    await prisma.category.create({
      data: {
        name: trimmedName,
        slug,
      },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to create category:", error);
    if (error.code === "P2002") {
      return { success: false, error: "A category with this name already exists." };
    }
    return { success: false, error: "Database error occurred." };
  }
}

// Delete Category (Admin Only)
export async function deleteCategory(id) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.category.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: "Database error occurred." };
  }
}
