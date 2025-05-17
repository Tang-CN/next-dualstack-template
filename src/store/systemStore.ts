import { createPersistStore } from "./index";

export const useSystemStore = createPersistStore(
  (set) => ({
    loading: false,
    showNavbar: true,
    showMenu: true,
    showFooter: true,
    MenuWidth: 200,

    setNavbar: (status: boolean) => set({ showNavbar: status }),
    setMenu: (status: boolean) => set({ showMenu: status }),
    setMenuWidth: (width: number) => set({ MenuWidth: width }),
    setFooter: (status: boolean) => set({ showFooter: status }),
    setLoading: (status: boolean) => set({ loading: status }),
  }),
  {
    name: "system",
    partialize: (state) => ({
      loading: state.loading,
      showNavbar: state.showNavbar,
      setMenu: state.showMenu,
      MenuWidth: state.MenuWidth,
      showFooter: state.showFooter,
    }),
  },
);
