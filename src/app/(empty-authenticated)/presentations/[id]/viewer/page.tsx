import { PresentationViewerPage } from "@/view/presentation";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const idInt = parseInt(params.id);
  if (isNaN(idInt)) notFound();

  return <PresentationViewerPage id={idInt} />;
}
