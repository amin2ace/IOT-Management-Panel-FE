import { CreateUserDto, UpdateUserDto, UsersService } from "@/api";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await UsersService.usersControllerFindAll();
      return res;
    },
  });
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (payload: CreateUserDto) =>
      UsersService.usersControllerCreate(payload),
  });
}

export function useUpdateUser(id: string) {
  return useMutation({
    mutationFn: (payload: UpdateUserDto) =>
      UsersService.usersControllerUpdate(id, payload),
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: (id: string) => UsersService.usersControllerRemove(id),
  });
}
