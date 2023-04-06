import { defineStore } from 'pinia';
import { createUser, fecthCurrentUser, showAllUsers, getUser, follow, showFollowees, showFollowers, createPost, updateProfilePicture } from '../shared/services/user.service';
import { signIn, signOut } from '../shared/services/auth.service';
import type {
  UserInterface,
  UserFormInterface,
  SigninFormInterface
} from '../shared/interface/User.interface';
import type {
  FollowInterface
} from '../shared/interface/Follow.interface';


interface UserState {
  currentUser: UserInterface | null | undefined;
  error: any;
  users: any;
  user: UserFormInterface | null | undefined;
  newUsers: any
  followers: any
  followees: any
}
export const useUser = defineStore('user', {
  state: (): UserState => ({
    currentUser: undefined,
    error: null,
    users: undefined,
    user: undefined,
    newUsers: [],
    followers: [],
    followees: [],
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this.currentUser;
    }
  },
  actions: {
    async createUser(data: UserFormInterface) {
      try {
        console.log('CreateUser', this.currentUser);
        this.currentUser = await createUser(data);
        this.error = null;
      } catch (error: any) {
        this.currentUser = undefined;
        this.error = error;
      }
    },
    async signIn(data: SigninFormInterface) {
      try {
        this.currentUser = await signIn(data);
        this.error = null;
      } catch (error: any) {
        this.currentUser = undefined;
        this.error = error;
      }
    },

    async fecthCurrentUser() {
      try {
        this.currentUser = await fecthCurrentUser();
        this.error = null;
      } catch (error: any) {
        this.currentUser = undefined;
        this.error = error;
      }
    },

    async signOut() {
      try {
        await signOut();
        this.currentUser = null;
        this.error = null;
        console.log('signOut', this.currentUser);
      } catch (error: any) {
        this.error = error;
      }
    },
    
    async showAllUsers() {
      try {
        this.users = await showAllUsers();
        this.newUsers = this.users
        this.error = null;
      } catch (error: any) {
        this.users = undefined;
        this.error = error;
      }
    },
    
    async getUser(_id: string) {
      try {
        this.user = await getUser(_id);
        this.error = null;
      } catch (error: any) {
        this.user = undefined;
        this.error = error;
      }
    },

    async follow(followers: string, followees:string, action: string) {
      try {
        this.currentUser = await follow(followers, followees, action);
        console.log(followers, followees, action);
        this.error = null;
      } catch (error: any) {
        this.currentUser = undefined;
        this.error = error;
      }
    },
    
    async showFollowers() {
      try {
        this.users = await showFollowers();
        this.followers = this.users
        this.error = null;
      } catch (error: any) {
        this.users = undefined;
        this.error = error;
      }
    },

    async showFollowees() {
      try {
        this.users = await showFollowees();
        this.followees = this.users
        this.error = null;
      } catch (error: any) {
        this.users = undefined;
        this.error = error;
      }
    },

    async createPost(post: string, user: string , date : string) {
      try {
        this.currentUser = await createPost(post, user, date);
        this.error = null;
      } catch (error: any) {
        this.currentUser = undefined;
        this.error = error;
      }
    },

    //if the user as no profile picture, give him a random color
    randomColor() {
      const colors = [
        'bg-red-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-blue-500',
        'bg-indigo-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-gray-500',
        'bg-red-600',
        'bg-yellow-600',
        'bg-green-600',
        'bg-blue-600',
        'bg-indigo-600',
        'bg-purple-600',
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return randomColor;
    },

    //get the users profile picture from followers or followees
    getProfilePicture( profilePicture: string) {
      if (this.users) {
        return profilePicture;
      }
    },

    async updateProfilePicture(user:string | undefined, profilePicture: string) {
      try {
        this.currentUser = await updateProfilePicture(user, profilePicture);
        this.error = null;
      } catch (error: any) {
        this.currentUser = undefined;
        this.error = error;
      }
    },
  }
});
