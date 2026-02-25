import { create } from 'zustand';

export const useChatStore = create((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));

export const useWhiteboardStore = create((set) => ({
  elements: [],
  setElements: (elements) => set({ elements }),
}));
