/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useAuth } from "@/providers/AuthProvider";
import {
  getAllAstronomers,
  postUserAstronomer,
} from "@/services/astronomer.services";
import { useEffect, useState } from "react";
import Popup from "../common/Popup/Popup";
import ProfilePic from "../common/ProfilePic/ProfilePic";

const SelectAstronomerModal = ({
  handleSelectAstronomerModal,
  userId,
}: {
  handleSelectAstronomerModal: () => void;
  userId: string;
}) => {
  const [astronomers, setAstronomers] = useState<any[]>();
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
      <div>
        <h1 className="text-lg font-semibold text-white">Selecione um astrônomo</h1>
        <p className="mt-1 text-sm text-slate-400">
          Ele aparecerá entre os seus favoritos.
        </p>
        <div className="mt-4 flex max-h-[320px] flex-col gap-1 overflow-auto pr-1">
          {astronomers && astronomers.length > 0 ? (
            astronomers.map((astronomer: any) => {
              return (
                <button
                  type="button"
                  key={astronomer.id}
                  onClick={() => {
                    handlePostUserAstronomer(astronomer.id);
                  }}
                  className="flex items-center gap-3 rounded-xl p-2 text-left text-sm text-slate-200 transition hover:bg-white/[0.06]"
                >
                  <ProfilePic name={astronomer.name} size="sm" />
                  {astronomer.name}
                </button>
              );
            })
          ) : (
            <p className="py-6 text-center text-sm text-slate-500">
              Nenhum astrônomo cadastrado ainda! :/
            </p>
          )}
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default SelectAstronomerModal;
