import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "레크플러스 - 현장 레크리에이션 진행 도구",
    short_name: "레크플러스",
    description: "큐시트와 현장 진행 도구를 한 곳에서 준비하는 레크리에이션 진행자용 앱",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#0a0a0f",
    lang: "ko-KR",
    categories: ["productivity", "entertainment"],
    icons: [
      { src: "/icons/recplus-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icons/recplus-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
