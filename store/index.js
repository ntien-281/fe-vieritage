import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

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


export const useUserStore = create(
  immer((set) => ({
    setUser: (user) =>
      set((state) => {
        state.user = user
      }),
    logOut: () => {
      set((state) => {
        state.user = null
      })
    }
  }))
)
