import React from "react";

export interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = ({}) => {
  return <main>Hello World! (auth)</main>;
};

export default React.memo(AuthPage);
