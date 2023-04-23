import type { UserInterface, UserFormInterface } from "../interface/User.interface";
import type  PostInterface  from "../interface/Post.interface";
import type {FollowInterface}  from "../interface/Follow.interface";
import axios from "axios";

const BASE_URL = "/api/users";

export async function createUser(
  partialUser: UserFormInterface
): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL, partialUser);
  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Client error in createUser() : " + response.data.error);
  }
}

export async function fecthCurrentUser(): Promise<UserInterface | null> {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function showAllUsers(): Promise<UserInterface | null> {
  const response = await axios.get(BASE_URL + "/users");
  return response.data;
}

export async function getUser(_id: string): Promise<UserInterface | null> {
  const response = await axios.get(BASE_URL + "/" + _id);
  return response.data;
}

export async function follow(
  followers : string,
  followees : string,
  action: string
): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL + "/follow", {
    followers,
    followees,
    action,
  });
  return response.data;
}

export async function showFollowers(): Promise<UserInterface | null> {
  const response = await axios.get(BASE_URL + "/followers");
  return response.data;
}

export async function showFollowees(): Promise<UserInterface | null> {
  const response = await axios.get(BASE_URL + "/followees");
  return response.data;
}

export async function createPost(
  post: string,
  user: string | undefined,
  date: string
): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL + "/post", { post, user, date });
  return response.data;
}

export async function updateProfilePicture(
  user: string | undefined,
  profilePicture: string
): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL + "/profilePicture", {
    user,
    profilePicture,
  });
  return response.data;
}

