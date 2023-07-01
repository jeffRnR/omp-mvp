import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export type Post = {
  id: string;
  businessId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  price: number;
  body: string;
  numberOfComments: number;
  imageURLs: string[];
  businessImageURL?: string;
  createdAt: Timestamp;
  latitude: number; // Added latitude property
  longitude: number; // Added longitude property
  
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
};

export const postState = atom<PostState>({
  key: 'postState',
  default: defaultPostState,
});
