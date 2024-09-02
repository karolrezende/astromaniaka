import { Pen, Trash } from "lucide-react";
import { useState } from "react";
import ModalEditHistory from "./ModalNewHistory/ModalEditHistory";
import ModalDeleteHistory from "./ModalNewHistory/ModalDeleteHistory";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const History = ({ history }: any) => {
  const [modalDeleteHistory, setModalDeleteHistory] = useState<boolean>(false);
  const [modalEditHistory, setModalEditHistory] = useState<boolean>(false);

  const handleDeleteHistoryModal = () => {
    setModalDeleteHistory(!modalDeleteHistory);
  };

  const handleEditHistoryModal = () => {
    setModalEditHistory(!modalEditHistory);
  };

  return (
    <>
      <div className="bg-white text-gray-800 mt-10 p-6 rounded-lg">
        <div className="flex justify-end gap-2">
          <Pen
            size="16"
            className="cursor-pointer"
            onClick={() => handleEditHistoryModal()}
          />
          <Trash
            size="16"
            className="cursor-pointer"
            onClick={() => handleDeleteHistoryModal()}
          />
        </div>
        <h1 className="text-lg font-bold ">{history.title}</h1>
        <p>{history.description}</p>
      </div>
      {modalDeleteHistory && (
        <ModalDeleteHistory
          handleDeleteHistoryModal={handleDeleteHistoryModal}
          history={history!}
        />
      )}
      {modalEditHistory && (
        <ModalEditHistory
          handleEditHistoryModal={handleEditHistoryModal}
          history={history!}
        />
      )}
    </>
  );
};

export default History;
