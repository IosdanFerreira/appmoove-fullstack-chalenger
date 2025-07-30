/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, Loader2, UserPlus } from "lucide-react";
import { CreateUserDTO, createUserSchema } from "./schema/register-user.schema";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/api/modules/user/create-user";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// src/pages/users/create.tsx
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateUserPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserDTO>({
    resolver: zodResolver(createUserSchema),
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Usuário criado com sucesso!");
      reset();
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Erro ao criar usuário");
    },
  });

  const onSubmit = (data: CreateUserDTO) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto p-4 overflow-x-hidden">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <UserPlus className="h-6 w-6 text-blue-600" />
          Novo Usuário
        </h1>
      </div>

      <Card className="p-6 shadow-sm border-0 bg-gradient-to-br from-white to-gray-50">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Nome e Sobrenome</Label>
            <Input
              id="name"
              placeholder="Digite o nome e sobrenome"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite o e-mail"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando...
                </span>
              ) : (
                "Cadastrar Usuário"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
