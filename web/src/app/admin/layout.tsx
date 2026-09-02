import { redirect } from "next/navigation";
import { hasServerAdminAccess } from "@/lib/admin-access-server";
import AdminSessionGuard from "./admin-session-guard";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  if (!await hasServerAdminAccess()) redirect("/");

  return <AdminSessionGuard>{children}</AdminSessionGuard>;
}
