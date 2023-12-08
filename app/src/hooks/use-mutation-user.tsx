import { useToast } from "@/components/ui/use-toast";
import { login, register } from "@/lib/api";
import { getAuthenticatedUser, removeAuthenticatedUserToken } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

function useMutationUser() {
  const { toast } = useToast();
  const clearUser = useStore((state) => state.clearUser);
  const setUser = useStore((state) => state.setUser);

  const logoutUser = async () => {
    removeAuthenticatedUserToken();
    await clearUser();
  };

  const registerUser = async (
    username: string,
    displayName: string,
    avatar: string,
    password: string
  ) => {
    try {
      await register(username, displayName, avatar, password);
      toast({
        variant: "default",
        title: "Success",
        description: "Your account has been created. I don't need to teach you to login right??"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to register",
        description:
          (error as Error).message ||
          "There was an error signing in.",
      });
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
      setUser(user);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to sign in",
        description:
          (error as Error).message ||
          "There was an error signing in.",
      });
    }
  }

  useEffect(() => {
    try {
      const user = getAuthenticatedUser();
      setUser(user);
    } catch (error) {
      clearUser();
    }
  }, []);

  return { loginUser, logoutUser, registerUser };
}

export default useMutationUser;
