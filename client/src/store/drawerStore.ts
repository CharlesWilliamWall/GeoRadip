import { defineStore } from 'pinia';

export const useDrawerStore = defineStore('drawer', {
    state: () => ({
        activeDrawer: '' as string,
        isVisible: false as boolean,
        SignInOpen: false as boolean,
        SignUpOpen: false as boolean,
    }),
    getters: {},
    actions: {
        openDrawer(drawerType: string) {
            this.activeDrawer = drawerType;
            this.isVisible = true;
        },
        closeDrawer() {
            this.isVisible = false;
        },
        toggleSignIn() {
            this.SignInOpen = !this.SignInOpen;
        },
        toggleSignUp() {
            this.SignUpOpen = !this.SignUpOpen;
        },
    },
});