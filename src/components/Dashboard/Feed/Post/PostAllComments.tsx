import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { formatDate } from "@/utils/formatDate";

//TODO TIPAR ANY
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostAllComments = ({ comment }: any) => {
  console.log(comment);
  return (
    <div className="bg-white/20 rounded-md my-2 mr-3 p-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl">
          <ProfilePic
            bg="bg-gray-400 min-h-8 min-w-8 text-xl text-md  font-normal "
            name={comment?.user?.name}
          />
          {comment.user.name}
        </div>
        <p className="text-xs">{formatDate(comment.createdAt)}</p>
      </div>
      <div className="text-white ml-3">{comment.description}</div>
    </div>
  );
};

export default PostAllComments;
