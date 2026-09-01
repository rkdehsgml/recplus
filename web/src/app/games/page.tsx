import { eventContexts, type EventContext } from "@/lib/game-types";
import GamesContent from "./games-content";

type GamesPageProps = {
  searchParams: Promise<{ context?: string | string[] }>;
};

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const { context } = await searchParams;
  const value = typeof context === "string" && eventContexts.includes(context as EventContext) ? context as EventContext : "all";
  return <GamesContent initialContext={value} />;
}
