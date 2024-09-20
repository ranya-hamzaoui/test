import { User } from './user';
import { Post } from './post';
export interface Comment {
  _id: string;
  author: User;
  post: Post;
  text: string;
  createdAt: string;
}
