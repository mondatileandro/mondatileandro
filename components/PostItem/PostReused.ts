import { ClientUser } from 'types/models/User';
import { PostWithAuthor } from 'types/models/Post';

// pages/[username]/post/[id].tsx - page
// views/Post/Post.tsx - view
// components/PostItem/PostItem.tsx - component
export type PostProps = {
  post: PostWithAuthor;
};

export const getIsPostOwner = (user: ClientUser, post: PostWithAuthor) =>
  user?.id === post.author?.id;

export const getIsAdmin = (user: ClientUser) => user?.role === 'admin';
