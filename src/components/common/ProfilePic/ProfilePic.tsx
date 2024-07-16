import { getInitials } from "@/utils/getInitials";

const ProfilePic = ({ bg, name }: { bg?: string; name?: string | null }) => {
  return (
    <div
      className={`${
        bg ? bg : "bg-white text-slate-900"
      } select-none min-h-14 min-w-14 rounded-full flex items-center justify-center font-bold text-xl`}
    >
      {name ? getInitials(name) : <p className="uppercase text-sm">astro</p>}
    </div>
  );
};

export default ProfilePic;
