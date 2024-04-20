import { create } from "zustand";

interface ICount {
  count: number;
  onIncreaseCount: () => void;
  onDecreaseCount: () => void;
}

export const useCounterStore = create<ICount>((set) => ({
  count: 0,
  onIncreaseCount: () => set((state) => ({ count: state.count + 1 })),
  onDecreaseCount: () => set((state) => ({ count: state.count - 1 })),
}));
