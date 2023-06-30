import { Post } from '@/atoms/PostAtom';
import { Business } from '@/atoms/businessesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePosts';
import { query, collection, where, orderBy, getDocs, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Stack } from '@chakra-ui/react';
import PostItem from './PostItem';
import PostLoader from './PostLoader';

type PostsProps = {
  businessData: Business;
};

const Posts: React.FC<PostsProps> = ({ businessData }) => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onPlaceOrder
  } = usePosts();

  const getPosts = async () => {
    try {
      setLoading(true);
      // Get posts for this business
      const postsQuery = query(
        collection(firestore, 'posts'),
        where('businessId', '==', businessData.id),
        orderBy('createdAt', 'desc')
      );

      const postDocs = await getDocs(postsQuery);

      // Store in post state
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));

      console.log('posts', posts);
    } catch (error) {
      console.log('getPosts error', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, [businessData]);

  const handlePlaceOrder = async (post: Post, quantity: number) => {
    try {
      const order = {
        itemID: post.id,
        itemName: post.title,
        itemDescription: post.body,
        price: post.price,
        businessId: post.businessId,
        quantity: quantity,
        totalPrice: post.price * quantity,
      };
      await addDoc(collection(firestore, 'orders'), order);
      console.log('Order placed successfully');
    } catch (error) {
      console.log('Error placing order:', error);
    }
  };

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((item) => (
            <PostItem
              key={item.id}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
              onPlaceOrder={onPlaceOrder}
              userLatitude={0}
              userLongitude={0}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Posts;
