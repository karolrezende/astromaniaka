/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useAuth } from "@/providers/AuthProvider";
import { useData } from "@/providers/DataProvider";
import { createHistory } from "@/services/history.services";
import { useRef, useState } from "react";

const ModalNewHistory = ({
  handleModalHistory,
}: {
  handleModalHistory: () => void;
}) => {
  const { userData } = useData();
  const { token } = useAuth();
  const [postBody, setPostBody] = useState({ title: "", description: "" });
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível criar o post"
  );

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostBody((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostBody((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  };

  const handleCreateHistory = async () => {
    const data: any = {
      userId: userData?.id!,
      title: postBody.title,
      description: postBody.description,
    };
    if (!data.description || !data.title) {
      setPopup(true);
      setPopupMessage(
        "Os campos de título e descrição precisam ser preenchidos!"
      );
      return;
    }

    try {
      const newPost = await createHistory(token, data as any);

      if (newPost) {
        setPopup(true);
        setPopupMessage("Post criado com sucesso!");
      }

      setTimeout(() => {
        handleModalHistory();
      }, 2000);
    } catch (error) {
      setPopup(true);
      console.error("Error creating post:", error);
    }
  };

  return (
    <ModalPostLayout handleModalPost={handleModalHistory}>
      <div>
        <h1 className="text-lg font-semibold text-white">Novo fato histórico</h1>
        <p className="mt-1 text-sm text-slate-400">
          Ele aparecerá na linha do tempo para toda a comunidade.
        </p>
        <div className="mt-5 flex flex-col gap-4">
          <div>
            <label className="field-label" htmlFor="new-history-title">
              Título
            </label>
            <input
              id="new-history-title"
              className="field"
              placeholder="Ex.: Lançamento do Sputnik 1"
              value={postBody.title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="new-history-description">
              Descrição
            </label>
            <textarea
              id="new-history-description"
              ref={inputRef}
              rows={5}
              value={postBody.description}
              onChange={handleDescriptionChange}
              className="field resize-none"
              placeholder="Deixe suas ideias brilharem como estrelas ☆"
            ></textarea>
          </div>

          <Button onClick={handleCreateHistory}>Publicar</Button>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default ModalNewHistory;
