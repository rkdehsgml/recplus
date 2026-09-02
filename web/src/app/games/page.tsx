import { eventContexts, gameOrigins, gameSeries, type EventContext, type GameOrigin, type GameSeries } from "@/lib/game-types";
import GamesContent from "./games-content";

type GamesPageProps = {
  searchParams: Promise<{ context?: string | string[]; origin?: string | string[]; series?: string | string[] }>;
};

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const { context, origin, series } = await searchParams;
  const initialContext = typeof context === "string" && eventContexts.includes(context as EventContext) ? context as EventContext : "all";
  const initialSeries = typeof series === "string" && gameSeries.includes(series as GameSeries) ? series as GameSeries : "all";
  // 프로그램과 포맷은 하나의 라이브러리 컬렉션 축입니다. 오래된 URL에 둘 다 있으면 프로그램을 우선합니다.
  const initialOrigin = initialSeries === "all" && typeof origin === "string" && gameOrigins.includes(origin as GameOrigin) ? origin as GameOrigin : "all";
  return <GamesContent initialContext={initialContext} initialOrigin={initialOrigin} initialSeries={initialSeries} />;
}
