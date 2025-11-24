import {
  UsersService,
  UpdateUserDto,
  ChangePasswordDto,
  AuthenticationService,
} from "@/api";
import { useQuery, useMutation } from "@tanstack/react-query";

// Fetch current user profile
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => UsersService.usersControllerGetUserProfile(),
  });
}

// Update profile data
export function useUpdateProfile() {
  return useMutation({
    mutationFn: (payload: UpdateUserDto) =>
      UsersService.usersControllerUpdateUserProfile(payload),
  });
}

// Change password
export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordDto) =>
      AuthenticationService.authControllerChangePassword(payload),
  });
}

// Upload profile picture
export function useUploadProfilePhoto() {
  return useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      return await UsersService.usersControllerUploadProfilePhoto(form);
    },
  });
}
