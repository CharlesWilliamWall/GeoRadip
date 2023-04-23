import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import { useUser } from '../store/userStore';
import MapView from '../views/MapView.vue';
import MusicDev from '@/views/MusicDev.vue';
import MusicTest from '@/views/MusicTest.vue';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from '../shared/guards/auth.guards';
import SignIn from '@/components/DrawerRight/SignIn.vue';
import SignUp from '@/components/DrawerRight/SignUp.vue';
import UserProfile from '@/components/DrawerRight/User/UserProfile.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '/',
                    component: MapView,
                    children: [
                        {
                            path: '/signin',
                            component: SignIn,
                            beforeEnter: isNotAuthenticatedGuard
                        },
                        {
                            path: '/signup',
                            component: SignUp,
                            beforeEnter: isNotAuthenticatedGuard
                        },
                        {
                            path: '/profile',
                            component: UserProfile,
                            beforeEnter: isAuthenticatedGuard
                        }
                    ]
                }
            ]
        },
        {
            path: '/music',
            component: MusicDev
        },
        {
            path: '/pointTest',
            component: MusicTest
        }
    ]
});

router.beforeEach(async () => {
    const userUser = useUser();
    if (userUser.currentUser == undefined) {
        await userUser.fecthCurrentUser();
        await userUser.showAllUsers();
    }
});

export default router;
