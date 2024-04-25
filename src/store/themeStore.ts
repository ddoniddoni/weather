import { StateCreator, create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

type Persist<T> = (
  config: StateCreator<T>,
  options: PersistOptions<T>
) => StateCreator<T>;

interface ThemeState {
  theme: "Light" | "Dark";
  toggleTheme: () => void;
}

// export const useThemeStore = create<ThemeState>((set) => ({
//   theme: "Light", // 기본 테마 설정
//   toggleTheme: () =>
//     set((state) => ({ theme: state.theme === "Light" ? "Dark" : "Light" })),
// }));

export const useThemeStore = create<ThemeState>(
  (persist as Persist<ThemeState>)(
    (set, get) => ({
      theme: "Light",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "Light" ? "Dark" : "Light" })),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
