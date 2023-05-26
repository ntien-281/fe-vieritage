import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import axios from "axios";
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
