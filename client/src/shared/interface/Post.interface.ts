export default interface PostInterface {
    _id: string;
    post: string;
    user: string;
    date: string;
    createdAt?: Date;
    updatedAt?: Date;
}
//