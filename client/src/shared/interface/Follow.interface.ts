export interface FollowInterface {
    _id: string;
    name: string;
    email: string;
    profilePicture?: string;
    posts?: Array<string>;
}