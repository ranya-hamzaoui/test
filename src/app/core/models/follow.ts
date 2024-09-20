import { User } from ".";

export interface Follow {
  _id: string;
  user: string;
  followed: User;
}
