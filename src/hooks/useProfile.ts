import {
  UsersService,
  UpdateUserDto,
  ChangePasswordDto,
  AuthenticationService,
} from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";

// Fetch current user profile
export const useProfile = (options?: { enabled?: boolean }) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.userId],
    queryFn: async () => {
      const response = await UsersService.usersControllerGetUserProfile();
      console.log(response);

      if (!response) throw new Error("Failed to fetch profile");
      return response;
    },
    enabled: (options?.enabled ?? true) && !!user, // Default to true if not specified
  });
};

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
