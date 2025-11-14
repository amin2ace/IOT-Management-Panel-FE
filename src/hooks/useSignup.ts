import { AuthenticationService, SignupInputDto } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  return useMutation({
    mutationFn: (payload: SignupInputDto) =>
      AuthenticationService.authControllerSignup(payload),
  });
}
