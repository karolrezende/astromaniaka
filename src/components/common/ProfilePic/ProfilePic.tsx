import { getInitials } from "@/utils/getInitials";

type ProfilePicSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeClass: Record<ProfilePicSize, string> = {
  xs: "h-7 w-7 text-[10px]",
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-24 w-24 text-3xl",
};

// Gradientes "planetários" escolhidos de forma estável pelo nome
const gradients = [
  "from-violet-500 to-fuchsia-500",
  "from-indigo-500 to-sky-400",
  "from-fuchsia-500 to-rose-400",
  "from-sky-500 to-emerald-400",
  "from-amber-400 to-rose-500",
  "from-purple-600 to-indigo-400",
];

const gradientFor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return gradients[Math.abs(hash) % gradients.length];
};

const ProfilePic = ({
  name,
  size = "md",
  className = "",
}: {
  name?: string | null;
  size?: ProfilePicSize;
  className?: string;
}) => {
  return (
    <div
      className={`${sizeClass[size]} ${
        name ? `bg-gradient-to-br ${gradientFor(name)}` : "bg-white/10"
      } flex shrink-0 select-none items-center justify-center rounded-full font-display font-semibold text-white shadow-[inset_0_-4px_12px_rgba(0,0,0,0.25)] ring-2 ring-white/10 ${className}`}
    >
      {name ? getInitials(name) : <span className="text-[10px] uppercase">astro</span>}
    </div>
  );
};

export default ProfilePic;
