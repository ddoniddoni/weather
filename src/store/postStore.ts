import { create } from "zustand";

interface IPost {
  data: any[];
  pending: boolean;
}

interface IPosts {
  posts: IPost;
  setPosts: (newPosts: any) => void;
}

export const postStore = create<IPosts>((set) => ({
  posts: {
    data: [],
    pending: false,
  },
  setPosts: (newPosts) => set({ posts: newPosts }),
}));
