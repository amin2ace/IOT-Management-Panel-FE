import { AuthenticationService, SignupInputDto } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (payload: SignupInputDto) =>
      AuthenticationService.authControllerSignup(payload),
    onSuccess: (res) => {
      localStorage.setItem("user", JSON.stringify(res));
      setUser(res);
    },
  });
}
