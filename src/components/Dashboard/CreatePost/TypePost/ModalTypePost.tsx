import { Type_post } from "@/utils/enums";
import { X } from "lucide-react";

const ModalTypePost = ({
  handleOpenTypePost,
  typePost,
}: {
  handleOpenTypePost: (type_post?: string | undefined) => void;
  typePost: string;
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
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post.NOTICIA ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post.NOTICIA)}
        >
          Notícia
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post.POST ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post.POST)}
        >
          Post
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post.CURIOSITY ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post.CURIOSITY)}
        >
          Curiosidade
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post.EVENTO ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post.EVENTO)}
        >
          Evento
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post.FOTOGRAFIA ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post.FOTOGRAFIA)}
        >
          Fotografia
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post.DICAS ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post.DICAS)}
        >
          Dicas
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post.PERGUNTA ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post.PERGUNTA)}
        >
          Pergunta
        </li>
        <li
          className={`text-md text-slate-800 hover:bg-gray-300/40 cursor-pointer px-1 ${
            typePost === Type_post.OUTRO ? "selected-item" : ""
          }`}
          onClick={() => handleOpenTypePost(Type_post.OUTRO)}
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
