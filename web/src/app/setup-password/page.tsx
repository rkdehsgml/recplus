import { notFound } from "next/navigation";
import SetupPasswordForm from "./setup-password-form";

export const dynamic = "force-dynamic";

export default function SetupPasswordPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return <SetupPasswordForm />;
}
