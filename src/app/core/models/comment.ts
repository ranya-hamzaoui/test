import { User } from './user';
import { Post } from './post';
export interface Comment {
    _id: string;
    user: User;
    post: Post;
    text : string;
    createdAt : string
  }
  