import { Dropdown, DropdownItem } from "flowbite-react";
import DeleteModal from "../deleteModal/deleteModal";
import { memo, useCallback, useState } from "react";
import { env } from "../../environment/environment";
import UpdateModal from "../updateModal/updateModal";
import { PostsProvider } from "../../contexts/postsContext";

function PostCardDropdown({ post }) {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);
  // useEffect(()=>{
  //   const savedPosts = localStorage.getItem("savedPosts");
  //   if(savedPosts) {
  //     const savedPostsArr = JSON.parse(savedPosts);
  //     savedPostsArr.
  //   }
  // },[])
  const handleSavePost = useCallback(() => {
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || [];
    savedPosts.push(post);
    localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
  }, [post]);
  return (
    <>
      <Dropdown
        inline
        label={
          <span className="text-[#5D6778]font-bold text-[18px] cursor-pointer">
            ...
          </span>
        }
        arrowIcon={false}
        style={{
          backgroundColor: "white",
        }}
        className="*:bg-white "
      >
        {post.user._id == env.loggedUserId && (
          <>
            <DropdownItem
              className="hover:!bg-[#F1F4F9] !bg-white"
              onClick={() => {
                setUpdateModalIsOpen(true);
              }}
            >
              <span className="block px-2 py-1 text-sm text-[#27364B] cursor-pointer">
                Edit
              </span>
            </DropdownItem>
            <DropdownItem
              className="hover:!bg-[#F1F4F9] !bg-white"
              onClick={() => {
                setDeleteModalIsOpen(true);
              }}
            >
              <span className="block px-2 py-1 text-sm text-[#27364B] cursor-pointer">
                Delete
              </span>
            </DropdownItem>
          </>
        )}
        <DropdownItem
          className="hover:!bg-[#F1F4F9] !bg-white"
          onClick={handleSavePost}
        >
          <span className="block px-2 py-1 text-sm text-[#27364B] cursor-pointer">
            Save
          </span>
        </DropdownItem>
      </Dropdown>
      {deleteModalIsOpen && (
        <DeleteModal
          isOpen={deleteModalIsOpen}
          setIsOpen={setDeleteModalIsOpen}
          id={post._id}
          modalMode={"post"}
        />
      )}
      {updateModalIsOpen && (
        <UpdateModal
          isOpen={updateModalIsOpen}
          setIsOpen={setUpdateModalIsOpen}
          post={post}
        />
      )}
    </>
  );
}
export default memo(PostCardDropdown);
