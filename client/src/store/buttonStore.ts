import { defineStore } from 'pinia';

export const useButtonStore = defineStore('button', {
    state: () => ({
        buttonContent: '' as string,
    }),
    getters: {},
    actions: {}
});