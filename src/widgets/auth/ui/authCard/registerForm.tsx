"use client";

import { useRegisterMutation } from "@/entities/user";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "./registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Alert, AlertTitle } from "@/shared/ui/alert";

export interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const [errorMessage, setError] = useState("");
  const { mutate, isPending, error, isError } = useRegisterMutation();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isError && error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.title) setError(error.response.data.title);
      }
    }
  }, [isError, error]);

  const onSubmit = (data: RegisterSchema) => {
    setError("");
    mutate({
      email: data.email,
      password: data.password,
    });
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
                  autoComplete="new-password"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Введите пароль ещё раз"
                  autoComplete="new-password"
                  disabled={isPending}
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Зарегистрироваться</Button>
        {errorMessage && (
          <Alert className="bg-red-400/20">
            <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        )}
      </form>
    </Form>
  );
};

export default React.memo(RegisterForm);
