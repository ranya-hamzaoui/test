import { Comment } from './comment';
import { User } from './user';
export interface Post {
  _id: string;
  title: string;
  description: string;
  photo: string;
  createdAt: string;
  user: User;
  comments: Comment[];
  likedByMe?: boolean;
  likeCount?: number;
  content ?: string
}
