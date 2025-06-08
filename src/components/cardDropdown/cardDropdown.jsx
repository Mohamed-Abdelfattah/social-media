import { Dropdown, DropdownItem } from "flowbite-react";
import { DeleteModal } from "../deleteModal/deleteModal";
import { useCallback, useEffect, useState } from "react";
import { env } from "../../environment/environment";
import UpdateModal from "../updateModal/updateModal";

function PostCardDropdown({ setPosts, post }) {
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
            <DropdownItem className="hover:!bg-[#F1F4F9] !bg-white">
              <button
                onClick={() => {
                  setUpdateModalIsOpen(true);
                }}
                className="block px-2 py-1 text-sm text-[#27364B] cursor-pointer"
              >
                Edit
              </button>
            </DropdownItem>
            <DropdownItem className="hover:!bg-[#F1F4F9] !bg-white">
              <button
                onClick={() => {
                  setDeleteModalIsOpen(true);
                }}
                href="#"
                className="block px-2 py-1 text-sm text-[#27364B] cursor-pointer"
              >
                Delete
              </button>
            </DropdownItem>
          </>
        )}
        <DropdownItem className="hover:!bg-[#F1F4F9] !bg-white">
          <button
            onClick={handleSavePost}
            className="block px-2 py-1 text-sm text-[#27364B] cursor-pointer"
          >
            Save
          </button>
        </DropdownItem>
      </Dropdown>
      {deleteModalIsOpen && (
        <DeleteModal
          setPosts={setPosts}
          isOpen={deleteModalIsOpen}
          setIsOpen={setDeleteModalIsOpen}
          id={post._id}
          modalMode={"post"}
        />
      )}
      {updateModalIsOpen && (
        <UpdateModal
          setPosts={setPosts}
          isOpen={updateModalIsOpen}
          setIsOpen={setUpdateModalIsOpen}
          post={post}
        />
      )}
    </>
  );
}
export default PostCardDropdown;
