import { Type_post_enum } from "./enums";

// Rótulo e cor de cada tipo de post, usados nos chips e no seletor
export const postTypeMeta: Record<
  Type_post_enum,
  { label: string; chip: string }
> = {
  [Type_post_enum.NOTICIA]: {
    label: "Notícia",
    chip: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  },
  [Type_post_enum.POST]: {
    label: "Post",
    chip: "border-slate-400/30 bg-slate-400/10 text-slate-300",
  },
  [Type_post_enum.CURIOSITY]: {
    label: "Curiosidade",
    chip: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  [Type_post_enum.EVENTO]: {
    label: "Evento",
    chip: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300",
  },
  [Type_post_enum.FOTOGRAFIA]: {
    label: "Fotografia",
    chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
  [Type_post_enum.DICAS]: {
    label: "Dicas",
    chip: "border-teal-400/30 bg-teal-400/10 text-teal-300",
  },
  [Type_post_enum.PERGUNTA]: {
    label: "Pergunta",
    chip: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  },
  [Type_post_enum.OUTRO]: {
    label: "Outro",
    chip: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  },
};

export const getPostTypeMeta = (type?: string | null) =>
  postTypeMeta[type as Type_post_enum] ?? postTypeMeta[Type_post_enum.POST];
