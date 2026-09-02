import { redirect } from "next/navigation";

/** 문제팩 운영 현황은 관리자 대시보드로 통합했습니다. */
export default function ItemPacksPage() {
  redirect("/admin");
}
