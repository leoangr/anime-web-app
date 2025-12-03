import { create } from "zustand";

interface searchState {
    query: string;
    setQuery: (value: string) => void;
}

export const useSearchQuery = create<searchState>((set) =>({
    query: "",
    setQuery: (value) => set({ query: value })
}))