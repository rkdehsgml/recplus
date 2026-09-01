import ItemPackContent from "./items-content";

export default async function GameItemsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ItemPackContent id={id} />;
}
