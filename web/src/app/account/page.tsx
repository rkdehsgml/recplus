import AccountContent from "./account-content";

export default function AccountPage() {
  return <AccountContent supportEmail={process.env.NEXT_PUBLIC_SUPPORT_EMAIL} />;
}
