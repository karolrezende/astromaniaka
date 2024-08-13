import Button from "@/components/common/Button/Button";
import DeletePost from "@/components/Dashboard/Feed/DeletePost/DeletePost";
import { postType } from "@/types/post.types";
import { getInitials } from "@/utils/getInitials";
import { useState } from "react";

const Post = ({ post }: { post: postType }) => {
  const [postSelected, setPostSelected] = useState<postType>();
  const [modalDeletePost, setModalDeletePost] = useState<boolean>(false);

  const handleDeletePost = () => {};
  const handleDeletePostModal = () => {
    setModalDeletePost(!modalDeletePost);
  };

  return (
    <div className="bg-white/40 py-2 mr-3 rounded-lg">
      <div className="px-4 flex justify-between items-center">
        <div className="">
          <div className="flex items-center gap-3 ">
            <div className="bg-gray-800 text-white rounded-full p-2 px-4">
              {getInitials(post.user?.name)}
            </div>
            <h3 className="font-bold text-xl text-white">{post.user.name}</h3>
          </div>
          <div className="text-white mt-2">
            <h3 className="font-bold  text-md text-white">{post.title}</h3>
            <h5>{post.description}</h5>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className={"px-2 bg-green-800 font-medium hover:bg-green-800/80"}
          >
            Aceitar
          </Button>
          <Button
            className={"px-2 bg-red-800 font-medium hover:bg-red-800/80"}
            onClick={() => (handleDeletePostModal(), setPostSelected(post))}
          >
            Excluir
          </Button>
        </div>
      </div>

      {modalDeletePost && (
        <DeletePost
          handleDeletePostModal={handleDeletePostModal}
          post={postSelected!}
        />
      )}
    </div>
  );
};

export default Post;
