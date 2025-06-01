"use client";

import { Presentation } from "@/shared/types/presentation";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/modal";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import { CreateSlideForm } from "@/features/presentation";

export interface CreateSlideProps {
  presentationId: Presentation["id"];
}

const CreateSlide: React.FC<CreateSlideProps> = ({ presentationId }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Modal
      trigger={
        <Button variant="outline" className="aspect-video w-40 h-auto">
          <IconPlus />
        </Button>
      }
      open={isOpen}
      onOpenChange={setOpen}
      title="Создать слайд презентации"
      content={
        <CreateSlideForm
          presentationId={presentationId}
          onSuccess={() => setOpen(false)}
        />
      }
    />
  );
};

export default React.memo(CreateSlide);
