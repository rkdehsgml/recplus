import type { Metadata } from "next";
import "./globals.css";
import PwaRuntime from "./pwa-runtime";
import SiteHeader from "./site-header";

export const metadata: Metadata = {
  title: "레크플러스 | 5분 만에 완성하는 레크레이션",
  description: "레크리에이션 진행자를 위한 큐시트와 현장 진행 도구",
  appleWebApp: { capable: true, title: "레크플러스", statusBarStyle: "black-translucent" },
  icons: { apple: "/icons/recplus-icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body><SiteHeader /><PwaRuntime />{children}</body>
    </html>
  );
}
