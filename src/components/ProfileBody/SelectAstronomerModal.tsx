/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useAuth } from "@/providers/AuthProvider";
import {
  getAllAstronomers,
  postUserAstronomer,
} from "@/services/astronomer.services";
import { useEffect, useState } from "react";
import Popup from "../common/Popup/Popup";

const SelectAstronomerModal = ({
  handleSelectAstronomerModal,
  userId,
}: {
  handleSelectAstronomerModal: () => void;
  userId: string;
}) => {
  const [astronomers, setAstronomers] = useState();
  const { token } = useAuth();
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível criar o post"
  );
  useEffect(() => {
    const fetchPosts = async () => {
      if (token) {
        const astronomers = await getAllAstronomers(token!);
        setAstronomers(astronomers);
      }
    };

    fetchPosts();
  }, [token]);

  const handlePostUserAstronomer = async (astronomerId: string) => {
    const data: any = {
      userId,
      astronomerId: astronomerId,
    };
    if (!userId || !astronomerId) {
      setPopup(true);
      setPopupMessage("Ocorreu um erro ao cadastrar astronomo!");
      return;
    }
    try {
      const astronomer = await postUserAstronomer(token!, data as any);

      if (astronomer == 409) {
        setPopup(true);
        setPopupMessage("Esse astrônomo já está vinculado ao seu perfil!");
        return;
      }
      if (astronomer == 422) {
        setPopup(true);
        setPopupMessage("Você já possui 3 astrônomos");
        return;
      }
      if (astronomer.userId) {
        setPopup(true);
        setPopupMessage("Astronomo selecionado com sucesso!");
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setPopup(true);
      console.error("Error creating post:", error);
    }
  };

  return (
    <ModalPostLayout handleModalPost={handleSelectAstronomerModal}>
      <div className="min-w-[400px]">
        <h1 className="font-bold text-2xl">Selecione um astrônomo</h1>
        <div className="flex flex-col gap-3 max-h-[300px] overflow-auto">
          {astronomers ? (
            astronomers.map((astronomer: any) => {
              return (
                <p
                  onClick={() => {
                    handlePostUserAstronomer(astronomer.id);
                  }}
                  className="uppercase  rounded-md cursor-pointer p-2 hover:bg-gray-200"
                >
                  {astronomer.name}
                </p>
              );
            })
          ) : (
            <p>Nenhum astronomo cadastrado ainda! :/</p>
          )}
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default SelectAstronomerModal;
