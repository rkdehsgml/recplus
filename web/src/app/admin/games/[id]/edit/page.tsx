import GameEditor from "../../game-editor";

export default async function AdminEditGamePage({ params }: PageProps<"/admin/games/[id]/edit">) {
  const { id } = await params;
  return <GameEditor mode="edit" gameId={id} />;
}
