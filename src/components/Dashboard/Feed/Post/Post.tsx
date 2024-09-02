import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { postType } from "@/types/post.types";
import { formatDate } from "@/utils/formatDate";
import { Pencil, Trash2 } from "lucide-react";
import DeletePost from "../DeletePost/DeletePost";
import EditPost from "../EditPost/EditPost";
import { useData } from "@/providers/DataProvider";
import { useState } from "react";
import { Access_Level_enum } from "@/utils/enums";
import PostComment from "./PostComment";
import PostAllComments from "./PostAllComments";

const Post = ({ post }: { post: postType }) => {
  const { userData } = useData();
  const [modalDeletePost, setModalDeletePost] = useState<boolean>(false);
  const [modalEditPost, setModalEditPost] = useState<boolean>(false);
  const [postSelected, setPostSelected] = useState<postType>();
  const verifyIsOwnerOrAdmin = (id: string) => {
    return (
      userData?.id === id || userData?.access_level == Access_Level_enum.ADMIN
    );
  };

  const handleDeletePostModal = () => {
    setModalDeletePost(!modalDeletePost);
  };

  const handleEditPostModal = () => {
    setModalEditPost(!modalEditPost);
  };

  return (
    <div
      key={post.id}
      className="flex flex-col rounded-2xl bg-black/40 border-4 p-2"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl">
          <ProfilePic bg="bg-gray-400" name={post.user.name} />
          {post.user.name}
        </div>

        <div className="flex gap-2 items-center">
          <div className="text-white h-auto rounded-md p-1 text-xs">
            {formatDate(post.createdAt)}
          </div>
          <div className="bg-white text-gray-800 h-auto rounded-md p-1 text-xs">
            {post.post_type}
          </div>
          {verifyIsOwnerOrAdmin(post.user.id) && (
            <>
              <Pencil
                size={20}
                className="cursor-pointer"
                onClick={() => (handleEditPostModal(), setPostSelected(post))}
              />
              <Trash2
                size={20}
                onClick={() => (handleDeletePostModal(), setPostSelected(post))}
                className="cursor-pointer"
              />
            </>
          )}
        </div>
      </div>
      <div className="p-3">
        <h2 className="text-2xl border-b-2 border-gray-700 py-2">
          {post.title}
        </h2>
        <div className="py-1">{post.description}</div>
      </div>
      {modalDeletePost && (
        <DeletePost
          handleDeletePostModal={handleDeletePostModal}
          post={postSelected!}
        />
      )}
      {modalEditPost && (
        <EditPost
          handleEditPostModal={handleEditPostModal}
          post={postSelected!}
        />
      )}
      <div className=" border-t-2 border-gray-700 mx-3">
        <h1 className="mt-4 text-lg">Comentários</h1>
        <div className="  max-h-[200px] overflow-x-auto">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <PostAllComments key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="text-gray-200/50">
              Ainda sem comentários, diga algo..
            </p>
          )}
        </div>
      </div>
      <PostComment user={userData!} post={post!} />
    </div>
  );
};

export default Post;
