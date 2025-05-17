import { useUserStore } from "@/store/userStore";

export const useUserActions = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  return {
    user,
    token,
    setUser,
  };
};
