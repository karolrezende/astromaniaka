import { Type_post_enum } from "@/utils/enums";
import { X } from "lucide-react";

const ModalTypePost = ({
  handleOpenTypePost,
  typePost,
}: {
  handleOpenTypePost: (Type_post_enum?: string | undefined) => void;
  typePost: string;
}) => {
  return (
    <div className="bg-white shadow-lg flex absolute right-20 top-[21rem] sm:right=[22rem] lg:right-[34rem] flex-col rounded-md p-3 px-4">
      <X
        onClick={() => handleOpenTypePost()}
        className="self-end cursor-pointer"
      ></X>
      <ul>
        <h1 className="font-bold">Tipo da postagem</h1>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post_enum.NOTICIA ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post_enum.NOTICIA)}
        >
          Notícia
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post_enum.POST ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post_enum.POST)}
        >
          Post
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post_enum.CURIOSITY ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post_enum.CURIOSITY)}
        >
          Curiosidade
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post_enum.EVENTO ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post_enum.EVENTO)}
        >
          Evento
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post_enum.FOTOGRAFIA ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post_enum.FOTOGRAFIA)}
        >
          Fotografia
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post_enum.DICAS ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post_enum.DICAS)}
        >
          Dicas
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post_enum.PERGUNTA ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post_enum.PERGUNTA)}
        >
          Pergunta
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post_enum.OUTRO ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post_enum.OUTRO)}
        >
          Outro
        </li>
      </ul>
      <style>{`
        .selected-item {
          font-weight: bold;
          color: #1a202c; /* Um tom mais escuro para o texto */
          background-color: #e2e8f0; /* Um tom claro para o fundo */
        }
      `}</style>
    </div>
  );
};

export default ModalTypePost;
