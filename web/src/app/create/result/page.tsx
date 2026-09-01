import { Suspense } from "react";
import ResultContent from "./result-content";

export default function ResultPage() {
  return (
    <Suspense fallback={<main style={{ padding: 40 }}>큐시트를 만들고 있어요…</main>}>
      <ResultContent />
    </Suspense>
  );
}
