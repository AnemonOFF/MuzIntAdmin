"use client";

import { Game } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import CopyText from "@/shared/ui/copyText";
import Modal from "@/shared/ui/modal";
import { IconShare3 } from "@tabler/icons-react";
import React from "react";
import QRCode from "react-qr-code";

export interface ShareGameModalProps {
  id: Game["id"];
}

const ShareGameModal: React.FC<ShareGameModalProps> = ({ id }) => {
  const link = new URL(`/game/${id}`, location.origin).toString();

  return (
    <Modal
      trigger={
        <Button size="icon" variant="outline">
          <IconShare3 />
        </Button>
      }
      title="Поделиться игрой"
      content={
        <div className="space-y-5 md:min-w-[400px]">
          <CopyText text={link} />
          <QRCode value={link} size={256} className="mx-auto" />
        </div>
      }
    />
  );
};

export default React.memo(ShareGameModal);
