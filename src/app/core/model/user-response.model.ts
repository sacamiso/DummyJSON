import { User } from "./user.model";

 

export interface UserResponse {
    limit: number;
    total: number;
    skip: number;
    users: Array<User>
}