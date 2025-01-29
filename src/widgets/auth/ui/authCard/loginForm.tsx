"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useLoginMutation } from "@/entities/user";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertTitle } from "@/shared/ui/alert";

export interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const router = useRouter();
  const params = useSearchParams();
  const [errorMessage, setError] = useState("");
  const { mutate, isPending, error, isError } = useLoginMutation();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isError && error) {
      if (axios.isAxiosError(error) && error.response) {
        const errors = Object.values(error.response.data.errors) as string[];
        if (Object.keys(error.response.data.errors)[0] === "0")
          setError(error.response.data.title);
        else setError(errors[0]);
      } else {
        setError("Не удалось отправить запрос, попробуйте позже");
      }
    }
  }, [isError, error]);

  const onSubmit = (data: LoginSchema) => {
    setError("");
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          const redirectTo = params.get("redirectTo");
          router.push(redirectTo ?? "/games");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Адрес электронной почты"
                  autoComplete="email"
                  disabled={isPending}
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Пароль от аккаунта"
                  autoComplete="current-password"
                  disabled={isPending}
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Войти</Button>
        {errorMessage && (
          <Alert className="bg-red-400/20">
            <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        )}
      </form>
    </Form>
  );
};

export default React.memo(LoginForm);
