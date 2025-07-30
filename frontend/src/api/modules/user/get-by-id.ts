/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/modules/user/get-by-id.ts

import { ApiResponse } from "@/api/interfaces/api-response.interface";
import { User } from "@/api/interfaces/user.interface";
import { api } from "../../lib/axios";

export async function getUserById(id: string): Promise<ApiResponse<User>> {
  try {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erro ao buscar o usuário');
    }

    return response.data;
  } catch (error) {
    const apiError = error as any;
    throw new Error(apiError.response?.data?.message || 'Erro desconhecido');
  }
}
