"use client";

import { GamesTable } from "@/entities/game";
import { useAuthQuery } from "@/entities/user";
import { CreateGame } from "@/features/createGame";
import { haveFeatureAccess } from "@/shared/lib/roleHelpers";
import { UserRoles } from "@/shared/types/user";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import React, { useState } from "react";

export interface GamesPageProps {}

const GamesPage: React.FC<GamesPageProps> = ({}) => {
  const [onlyRequested, setRequested] = useState(true);
  const { data: user, isSuccess } = useAuthQuery();

  return (
    <div className="space-y-5">
      <div className="flex gap-5 justify-between">
        <div className="flex items-center space-x-2">
          {isSuccess &&
            haveFeatureAccess(
              "admin.games.approving",
              user.roles as UserRoles[]
            ) && (
              <>
                <Switch
                  id="onlyRequested"
                  checked={onlyRequested}
                  onCheckedChange={setRequested}
                />
                <Label htmlFor="onlyRequested">Только заявки на создание</Label>
              </>
            )}
        </div>
        <CreateGame />
      </div>
      <GamesTable onlyApproved={!onlyRequested} />
    </div>
  );
};

export default React.memo(GamesPage);
