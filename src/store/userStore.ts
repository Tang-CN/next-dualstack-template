// store/userStore.ts
import { createPersistStore } from "./index";

interface User {
  name?: string;
  email?: string;
}

interface UserState {
  user: User | null;
  token?: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = createPersistStore<UserState>(
  (set) => ({
    user: null,
    token: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    clearToken: () => set({ token: null }),
    clearUser: () => set({ user: null }),
  }),
  {
    name: "user",
    partialize: (state) => ({ user: state.user, token: state.token }),
  },
);
