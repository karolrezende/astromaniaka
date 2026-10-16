import { Type_post_enum } from "@/utils/enums";
import { postTypeMeta } from "@/utils/postTypes";

const ModalTypePost = ({
  handleOpenTypePost,
  typePost,
}: {
  handleOpenTypePost: (Type_post_enum?: string | undefined) => void;
  typePost: string;
}) => {
  return (
    <div className="surface animate-fade-in p-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">
        Tipo da postagem
      </p>
      <ul className="flex flex-wrap gap-2">
        {Object.values(Type_post_enum).map((type) => {
          const meta = postTypeMeta[type];
          const selected = typePost === type;
          return (
            <li key={type}>
              <button
                type="button"
                onClick={() => handleOpenTypePost(type)}
                className={`chip cursor-pointer py-1 transition ${
                  selected
                    ? `${meta.chip} ring-2 ring-white/20`
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-200"
                }`}
              >
                {meta.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ModalTypePost;
