import { Children, createContext, useCallback, useState } from "react";

export const PostsContent = createContext();
export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState();
  const getSavedData = useCallback(() => {}, []);
  const getAllData = useCallback(() => {}, []);
  const getUserData = useCallback(() => {}, []);
  return (
    <PostsContent.Provider
      value={{ getSavedData, getAllData, getUserData, setPosts, posts }}
    >
      {children}
    </PostsContent.Provider>
  );
};
