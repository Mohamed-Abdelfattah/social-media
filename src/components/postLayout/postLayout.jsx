import React, { useCallback, useContext, useEffect, useRef } from "react";
import PostCard from "../postCard/postCard";
import { Alert } from "flowbite-react";
import { Info } from "lucide-react";
import LoadingSkeleton from "../loadingSkeleton/loadingSkeleton";
import { PostsContext } from "../../contexts/postsContext";

const PostLayout = () => {
  const {
    posts,
    setPosts,
    isLoading,
    hasError,
    hasMore,
    isFetching,
    getAllData,
  } = useContext(PostsContext);

  const listInnerRef = useRef();
  const pageRef = useRef(1);
  const scrollTimeoutRef = useRef(null);

  // Initial load
  useEffect(() => {
    getAllData(1);
    pageRef.current = 1;
  }, [getAllData]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      scrollTimeoutRef.current && clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Optimized scroll handler with debounce
  const handleScroll = useCallback(() => {
    if (!listInnerRef.current || isFetching || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 300;

    if (isNearBottom) {
      scrollTimeoutRef.current && clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        pageRef.current += 1;
        getAllData(pageRef.current);
      }, 200);
    }
  }, [isFetching, hasMore, getAllData]);

  if (hasError) {
    return (
      <Alert color="failure" icon={Info}>
        <span className="font-medium">Error!</span> Failed to load posts. Please
        try again later.
      </Alert>
    );
  }

  return (
    <div
      className="space-y-4 overflow-y-auto"
      onScroll={handleScroll}
      ref={listInnerRef}
      style={{ maxHeight: "100vh" }}
    >
      {posts.map((post) => (
        <PostCard
          key={`${post.id}-${post.updatedAt || post.createdAt}`}
          post={post}
          setPosts={setPosts}
        />
      ))}

      {isLoading && <LoadingSkeleton />}

      {!hasMore && posts.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          You've reached the end of the list
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <div className="text-center py-4 text-gray-500">No posts available</div>
      )}
    </div>
  );
};

export default PostLayout;
