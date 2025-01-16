import { GamePackPage } from "@/view/gamePacks";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const idInt = parseInt(params.id);
  if (isNaN(idInt)) notFound();

  return <GamePackPage id={idInt} />;
}
