import type PostInterface  from "./Post.interface";
export interface UserInterface {
    _id: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    createdAt?: Date;
    updatedAt?: Date;
    followers?: Array<string>;
    followees?: Array<string>;
    profilePicture?: string;
    posts?: Array<string>;
  }

  export type UserFormInterface = Partial<UserInterface>;

export interface SigninFormInterface {
  email: string;
  password: string;
  profilePicture?: string;
}