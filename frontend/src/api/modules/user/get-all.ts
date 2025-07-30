/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiResponse } from "@/api/interfaces/api-response.interface";
import { User } from "@/api/interfaces/user.interface";
import { api } from "../../lib/axios";

// ... (GetAllUsersParams permanece igual)

export async function getAllUsers(
  page: number, 
  search?: string
): Promise<ApiResponse<User[]>> {
  try {
    const params = {
      page,
      perPage: 30,
      sort: 'createdAt',
      sortDirection: 'desc',
      search: search ? search : '',
    };

    const response = await api.get<ApiResponse<User[]>>('/users', { params });
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Erro ao buscar usuários');
    }

    return response.data;
  } catch (error) {
    // Você pode tipar o erro conforme sua API retorna
    const apiError = error as any;
    throw new Error(apiError.response?.data?.message || 'Erro desconhecido');
  }
}