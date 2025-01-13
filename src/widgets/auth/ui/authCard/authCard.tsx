import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import React from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export interface AuthCardProps {}

const AuthCard: React.FC<AuthCardProps> = ({}) => {
  return (
    <Tabs defaultValue="login" className="max-w-[400px]">
      <TabsList className="grid w-full grid-cols-2 max-md:h-auto max-md:grid-cols-1 max-md:grid-rows-2">
        <TabsTrigger value="login">Войти</TabsTrigger>
        <TabsTrigger value="register">Зарегистрироваться</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Войти</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Зарегистрироваться</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default React.memo(AuthCard);
