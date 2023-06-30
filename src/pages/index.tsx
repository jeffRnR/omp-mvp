import { Post } from '@/atoms/PostAtom';
import CreatePostLink from '@/components/Business/CreatePostLink';
import PageContent from '@/components/Layout/PageContent';
import PostItem from '@/components/Posts/PostItem';
import PostLoader from '@/components/Posts/PostLoader';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePosts';
import { Stack } from '@chakra-ui/react';
import { collection, doc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';




const Home: NextPage = () => { 
  const [user, loadingUser] =useAuthState(auth)
  const [loading, setLoading] = useState(false);
  const { postStateValue ,setPostStateValue, onSelectPost, onDeletePost, onPlaceOrder } = usePosts();
  const  buildUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, 'posts'), 
        orderBy('createdAt', 'desc'), 
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPostStateValue(prev => ({
        ...prev,
        posts: posts as Post[],
      }))
      //setPostState
    } catch (error) {
      console.log('buildNoUserHomeFeed error', error)
    }
    setLoading(false);
  };

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, 'posts'), 
        orderBy('createdAt', 'desc'), 
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPostStateValue(prev => ({
        ...prev,
        posts: posts as Post[],
      }))
      //setPostState
    } catch (error) {
      console.log('buildNoUserHomeFeed error', error)
    }
    setLoading(false);
  };

  // useEffects

  useEffect(() => {
    if(!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  useEffect(() => {
    if(user && !loadingUser) buildUserHomeFeed();
  }, [user, loadingUser])


  return (
    <PageContent>
      <>
        
        {loading ? (
          <PostLoader />
        ): (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem 
                key={post.id}
                post={post}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                onPlaceOrder={onPlaceOrder}
                userLatitude={0}
                userLongitude={0} 
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <></>
    </PageContent>
  );
};

export default Home;


