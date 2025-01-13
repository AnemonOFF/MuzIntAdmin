import React from "react";

export interface GamesPageProps {}

const GamesPage: React.FC<GamesPageProps> = ({}) => {
  return <span>Games page</span>;
};

export default React.memo(GamesPage);
