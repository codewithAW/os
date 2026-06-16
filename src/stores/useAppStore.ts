import { create } from 'zustand';

export type TopicCategory = 'cpu' | 'processor' | 'process' | 'thread' | 'instruction';

interface AppState {
  theme: 'dark' | 'light';
  searchQuery: string;
  visited: string[];
  setTheme: (theme: 'dark' | 'light') => void;
  setSearchQuery: (query: string) => void;
  markVisited: (topicSlug: string) => void;
}

function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export const useAppStore = create<AppState>((set) => ({
  theme: getInitialTheme(),
  searchQuery: '',
  visited: [],
  setTheme: (theme) => {
    if (typeof window !== 'undefined') localStorage.setItem('theme', theme);
    set(() => ({ theme }));
  },
  setSearchQuery: (searchQuery) => set(() => ({ searchQuery })),
  markVisited: (topicSlug) =>
    set((state) => ({
      visited: state.visited.includes(topicSlug) ? state.visited : [...state.visited, topicSlug],
    })),
}));
