import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "레크플러스 | 5분 만에 완성하는 레크레이션",
  description: "레크리에이션 진행자를 위한 큐시트와 현장 진행 도구",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
