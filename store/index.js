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

    setUserDetail: (userDetail) => {
      set((state) => {
        state.userDetail = userDetail
      })
    },

    logOut: () => {
      set((state) => {
        state.user = null
      })
    }
  }))
)

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

// State form upload short
export const useUploadShort = create(
  immer((set) => ({
    selectedGenres: [],
    shortDuration: 0,
    addGenre: (genre_id) =>
      set((state) => {
        state.selectedGenres = [...state.selectedGenres, genre_id];
      }),
    removeGenre: (genre_id) =>
      set((state) => {
        state.selectedGenres = state.selectedGenres.filter(genre => genre != genre_id);
      }),
    clearGenres: () =>
      set((state) => {
        state.selectedGenres = [];
      }),
    setDuration: (newDuration) =>
      set((state) => {
        state.shortDuration = newDuration;
      })
  }))
)
