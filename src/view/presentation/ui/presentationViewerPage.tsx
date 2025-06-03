import { Presentation } from "@/shared/types/presentation";
import { PresentationViewer } from "@/widgets/presentation";
import React from "react";

export interface PresentationViewerPageProps {
  id: Presentation["id"];
}

const PresentationViewerPage: React.FC<PresentationViewerPageProps> = ({
  id,
}) => {
  return <PresentationViewer presentationId={id} canGoBack />;
};

export default React.memo(PresentationViewerPage);
