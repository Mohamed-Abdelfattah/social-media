// import { useLoaderData } from "react-router-dom";
import { useContext, useEffect } from "react";
import PostLayout from "../../components/postLayout/postLayout";
import { PostsContext } from "../../contexts/postsContext";
import CreatePost from "./CreatePost";
import FriendSuggestions from "../../components/FriendSuggestions";
const Home = () => {
  const { getAllData } = useContext(PostsContext);
  useEffect(() => {
    getAllData();
  }, [getAllData]);
  // const posts = useLoaderData();
  // console.log(posts);
  // console.log(navigation);

  return (
    <>
      <div className="container mx-auto">
        <div className="grid py-7 md:grid-cols-12 gap-x-10">
          <div className="col-span-3"></div>
          <div className="feed col-span-6 space-y-4">
            <CreatePost />
            <PostLayout />
          </div>
          <div className="col-span-3">
            <FriendSuggestions />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
