import { api } from "./api";

export interface User {
  userId: string;
  email: string;
  userName: string;
  isActive: boolean;
}

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get("/users/get-all");
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/get-user-by-id${id}`);
    return response.data;
  },

  getUserByEmail: async (email: string): Promise<User> => {
    const response = await api.get(`/users/get-user-by-email${email}`);
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>) => {
    const response = await api.patch(`/users/update-user${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/delete-user${id}`);
    return response.data;
  },
};
