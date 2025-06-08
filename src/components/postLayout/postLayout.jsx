import React, { useCallback, useEffect, useRef, useState } from "react";
import PostCard from "../postCard/postCard";
import { getAllPosts } from "../../utils/loaders";
import { Alert } from "flowbite-react";
import { Info } from "lucide-react";
import LoadingSkeleton from "../loadingSkeleton/loadingSkeleton";

const PostLayout = () => {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const scrollTimeoutRef = useRef(null);

  // Memoized fetch function
  const fetchPosts = useCallback(
    async (page) => {
      if (isFetching) return;

      setIsFetching(true);
      setIsLoading(true);

      try {
        const response = await getAllPosts(page);
        setPosts((prevPosts) => {
          // Filter out duplicates before adding new posts
          const existingIds = new Set(prevPosts.map((p) => p.id));
          const newPosts = response.posts.filter((p) => !existingIds.has(p.id));
          return [...prevPosts, ...newPosts];
        });
        setPaginationInfo(response.paginationInfo);
        setHasMore(page < response.paginationInfo.numberOfPages);
      } catch {
        setHasError(true);
      } finally {
        setIsFetching(false);
        setIsLoading(false);
      }
    },
    [isFetching]
  );

  // Load more posts with debounce
  const loadMorePosts = useCallback(() => {
    if (!isFetching && hasMore) {
      setCurrPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  // Optimized scroll handler with debounce
  const onScroll = useCallback(() => {
    if (!listInnerRef.current || isFetching || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

    // Clear any pending timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set new timeout with debounce
    scrollTimeoutRef.current = setTimeout(() => {
      if (scrollHeight - (scrollTop + clientHeight) < 300) {
        loadMorePosts();
      }
    }, 200); // 200ms debounce delay
  }, [isFetching, hasMore, loadMorePosts]);

  // Initial load and page change effect
  useEffect(() => {
    fetchPosts(currPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  if (hasError) {
    return (
      <Alert color="failure" icon={Info}>
        <span className="font-medium">Error!</span> Failed to load posts. Please
        try again later.
      </Alert>
    );
  }

  if (posts.length === 0 && isLoading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div
      className="space-y-4 overflow-y-auto"
      onScroll={onScroll}
      ref={listInnerRef}
      style={{ maxHeight: "100vh" }}
    >
      {posts.map((post) => (
        <PostCard
          key={`${post.id}-${post.updatedAt || post.createdAt}`}
          setPosts={setPosts}
          post={post}
        />
      ))}

      {isLoading && <LoadingSkeleton />}

      {!hasMore && (
        <div className="text-center py-4 text-gray-500">
          You've reached the end of the list
        </div>
      )}
    </div>
  );
};

export default React.memo(PostLayout);
