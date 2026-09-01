import GameDetailContent from "./game-detail-content";

export default async function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GameDetailContent id={id} />;
}
