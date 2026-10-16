import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { formatDate } from "@/utils/formatDate";

//TODO TIPAR ANY
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostAllComments = ({ comment }: any) => {
  return (
    <div className="flex gap-3 rounded-xl bg-white/[0.03] p-3">
      <ProfilePic size="sm" name={comment?.user?.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-sm font-medium text-slate-100">
            {comment.user.name}
          </p>
          <p className="shrink-0 text-[11px] text-slate-500">
            {formatDate(comment.createdAt)}
          </p>
        </div>
        <p className="mt-0.5 text-sm text-slate-300">{comment.description}</p>
      </div>
    </div>
  );
};

export default PostAllComments;
