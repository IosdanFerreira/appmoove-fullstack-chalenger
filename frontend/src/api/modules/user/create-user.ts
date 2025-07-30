import { api } from "@/api/lib/axios";

export interface CreateUserDTO {
  name: string;
  email: string;
}

export async function createUser(data: CreateUserDTO) {
  const response = await api.post("/users", data);
  
  return response.data;
}
