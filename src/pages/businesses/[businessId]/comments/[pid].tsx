import About from "@/components/Business/About";
import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Posts/PostItem";
import { auth } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { postStateValue, onDeletePost, onPlaceOrder } = usePosts();

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onDeletePost={onDeletePost}
            onPlaceOrder={onPlaceOrder}
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
            userLatitude={0}
            userLongitude={0}
          />
        )}
        {/* Comments */}
      </>

      <>
        {/* about */}
      </>
    </PageContent>
  );
};

export default PostPage;
