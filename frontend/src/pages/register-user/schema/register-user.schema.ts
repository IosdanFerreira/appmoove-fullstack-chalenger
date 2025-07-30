// src/schemas/user.schema.ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(50, "Nome não pode ter mais que 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  
  email: z.string()
    .email("Digite um e-mail válido")
    .max(100, "E-mail muito longo"),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;