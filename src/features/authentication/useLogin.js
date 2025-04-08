import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginApi({ email, password });
    },
    onSuccess: (user) => {
      //   console.log(user);
      toast.success(`successfully login`);
      navigate("/dashboard");
    },
    onError: () => toast.error("Email or Password Wrong"),
  });

  return { login, isPending };
}
