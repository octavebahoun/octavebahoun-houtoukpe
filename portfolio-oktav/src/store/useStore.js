import { create } from 'zustand'

export const useStore = create((set) => ({
  // Dark mode
  darkMode: false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    return { darkMode: newMode }
  }),

  // RAG
  ragOpen: false,
  toggleRag: () => set((state) => ({ ragOpen: !state.ragOpen })),
  closeRag: () => set({ ragOpen: false }),

  // RAG messages
  ragMessages: [],
  addRagMessage: (msg) => set((state) => ({
    ragMessages: [...state.ragMessages, msg]
  })),
  clearRagMessages: () => set({ ragMessages: [] }),

  // Loading
  ragLoading: false,
  setRagLoading: (loading) => set({ ragLoading: loading }),
}))
