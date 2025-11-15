import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { AuthenticationService, loginInputDto } from "@/api";

export function useLogin() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (payload: loginInputDto) =>
      AuthenticationService.authControllerLogin(payload),
    onSuccess: (res) => {
      localStorage.setItem("user", JSON.stringify(res));
      setUser(res);
    },
    // onError: () => {
    //   toast.error("error");
    // },
  });
}
