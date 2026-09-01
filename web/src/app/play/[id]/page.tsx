import PlayContent from "./play-content";

export default async function PlayPage({ params }: PageProps<"/play/[id]">) {
  const { id } = await params;
  return <PlayContent id={id} />;
}
