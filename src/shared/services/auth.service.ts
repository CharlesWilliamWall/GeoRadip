import type { SigninFormInterface, UserInterface } from "../interface/User.interface";
import axios from "axios";

const BASE_URL = "/api/auth";

export async function signIn(data: SigninFormInterface): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL, data);
  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Client error in signIn() : " + response.data.error);
  }
}

export async function signOut(): Promise<void> {
  await axios.delete(BASE_URL);
}