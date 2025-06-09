// import { useLoaderData } from "react-router-dom";
import { useContext, useEffect } from "react";
import PostLayout from "../../components/postLayout/postLayout";
import { PostsContext } from "../../contexts/postsContext";

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
      <div className="grid py-7 md:grid-cols-3 gap-x-10">
        <div></div>
        <div className="feed">
          <PostLayout />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Home;
