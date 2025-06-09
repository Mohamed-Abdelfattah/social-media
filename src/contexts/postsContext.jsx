import { createContext, useCallback, useState, useRef } from "react";
import { getAllPosts } from "../utils/loaders";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const isFetchingRef = useRef(false);

  const hasMore = paginationInfo
    ? paginationInfo.currentPage < paginationInfo.numberOfPages
    : true;

  const getAllData = useCallback(async (page = 1) => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const response = await getAllPosts(page);

      setPosts((prevPosts) => {
        if (page === 1) return response.posts;

        const existingIds = new Set(prevPosts.map((p) => p.id));
        const newPosts = response.posts.filter((p) => !existingIds.has(p.id));
        return [...prevPosts, ...newPosts];
      });

      setPaginationInfo(response.paginationInfo);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setHasError(true);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        isLoading,
        hasError,
        hasMore,
        isFetching: isFetchingRef.current,
        getAllData,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
