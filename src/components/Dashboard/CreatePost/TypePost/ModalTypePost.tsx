import { Type_post } from "@/utils/enums";
import { X } from "lucide-react";

const ModalTypePost = ({
  handleOpenTypePost,
}: {
  handleOpenTypePost: (type_post?: string | undefined) => void;
}) => {
  return (
    <div className="bg-white shadow-lg flex absolute right-24 top-[21rem] md:right-[27rem] flex-col rounded-md p-3 px-4">
      <X
        onClick={() => handleOpenTypePost()}
        className="self-end cursor-pointer"
      ></X>
      <ul>
        <h1 className="font-bold">Tipo da postagem</h1>
        <li
          className="text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1"
          value={"NOTICIA"}
          onClick={() => handleOpenTypePost(Type_post.NOTICIA)}
        >
          Notícia
        </li>
        <li
          className="text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1"
          value={"POST"}
          onClick={() => handleOpenTypePost(Type_post.POST)}
        >
          Post
        </li>
        <li
          className="text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1"
          value={"CURIOSITY"}
          onClick={() => handleOpenTypePost(Type_post.CURIOSITY)}
        >
          Curiosidade
        </li>
        <li
          className="text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1"
          value={"EVENTO"}
          onClick={() => handleOpenTypePost(Type_post.EVENTO)}
        >
          Evento
        </li>
        <li
          className="text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1"
          value={"FOTOGRAFIA"}
          onClick={() => handleOpenTypePost(Type_post.FOTOGRAFIA)}
        >
          Fotografia
        </li>
        <li
          className="text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1"
          value={"DICAS"}
          onClick={() => handleOpenTypePost(Type_post.DICAS)}
        >
          Dicas
        </li>
        <li
          className="text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1"
          value={"PERGUNTA"}
          onClick={() => handleOpenTypePost(Type_post.PERGUNTA)}
        >
          Pergunta
        </li>
        <li
          className="text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1"
          value={"OUTRO"}
          onClick={() => handleOpenTypePost(Type_post.OUTRO)}
        >
          Outro
        </li>
      </ul>
    </div>
  );
};

export default ModalTypePost;
