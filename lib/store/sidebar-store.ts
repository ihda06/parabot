import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  isMinimized: boolean;
  toggle: () => void;
  setMinimized: (minimized: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isMinimized: false,
      toggle: () => set((state) => ({ isMinimized: !state.isMinimized })),
      setMinimized: (minimized: boolean) => set({ isMinimized: minimized }),
    }),
    {
      name: "sidebar-state",
    }
  )
);

