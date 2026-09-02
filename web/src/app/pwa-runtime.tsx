"use client";

import { useEffect, useState } from "react";

/** 배포 환경에서만 서비스 워커를 등록해 개발 중 오래된 번들 캐시를 방지합니다. */
export default function PwaRuntime() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    function syncConnection() {
      setOnline(navigator.onLine);
    }

    syncConnection();
    window.addEventListener("online", syncConnection);
    window.addEventListener("offline", syncConnection);

    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {
        // 지원하지 않는 환경에서도 기존 웹 흐름은 그대로 이용할 수 있습니다.
      });
    }

    return () => {
      window.removeEventListener("online", syncConnection);
      window.removeEventListener("offline", syncConnection);
    };
  }, []);

  if (online) return null;

  return <p className="networkNotice" role="status">오프라인 모드예요. 이전에 열어둔 행사와 저장된 진행 기록은 계속 사용할 수 있어요.</p>;
}
