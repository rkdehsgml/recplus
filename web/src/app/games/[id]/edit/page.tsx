import EditCustomGameContent from "./edit-custom-game-content";

export default async function EditCustomGamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditCustomGameContent id={id} />;
}
