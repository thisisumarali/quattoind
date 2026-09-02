import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/app/actions";
import InquiriesList from "./InquiriesList";

export const metadata = {
  title: "Admin Inquiries | Quattro Industries",
};

export default async function AdminInquiriesPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  let inquiries = [];
  try {
    inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch inquiries in admin panel:", error);
  }

  // Format Date times to standard JSON string objects so they pass cleanly to Client Components
  const serializedInquiries = inquiries.map((inq) => ({
    ...inq,
    createdAt: inq.createdAt.toISOString(),
  }));

  return <InquiriesList initialInquiries={serializedInquiries} />;
}
