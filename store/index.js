import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Khai báo store với immer middleware
export const useCountStore = create(
  immer((set) => ({
    count: 0,
    increment: () =>
      set((state) => {
        state.count += 1;
      }),
    decrement: () =>
      set((state) => {
        state.count -= 1;
      }),
  }))
);

// Lưu tab/path đang ở hiện tại
export const useCurrentTab = create(
  immer((set) => ({
    currentTab: "",
    setTab: (newTab) =>
      set((state) => {
        state.currentTab = newTab;
      }),
  }))
);
