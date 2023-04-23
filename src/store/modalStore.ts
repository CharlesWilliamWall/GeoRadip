import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        isVisible: false
    }),
    getters: {
        getIsVisible(): boolean {
            return this.isVisible;
        }
    },
    actions: {
        setIsVisible(isVisible: boolean) {
            this.isVisible = isVisible;
        }
    }
});
