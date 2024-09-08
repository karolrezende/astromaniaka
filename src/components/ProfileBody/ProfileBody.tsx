import { useData } from "@/providers/DataProvider";
import { getInitials } from "@/utils/getInitials";
import SelectAstronomerModal from "./SelectAstronomerModal";
import { useState } from "react";
import RemoveAstronomerModal from "./RemoveAstronomerModal";

const ProfileBody = () => {
  const { userData } = useData();
  const [isModal, setIsModal] = useState(false);
  const [astronomerSelected, setAstronomerSelected] = useState(false);
  const [isModalRemoveAstronomer, setIsModalRemoveAstronomer] = useState(false);
  const handleSelectAstronomerModal = () => {
    setIsModal(!isModal);
  };
  const handleRemoveAstronomerModal = () => {
    setIsModalRemoveAstronomer(!isModalRemoveAstronomer);
  };
  return (
    <section className="lg:ml-[19rem] min-h-screen pt-32 flex justify-center">
      <div className="mx-4 lg:mx-4 rounded-lg w-full flex flex-col overflow-y-auto h-[calc(100vh-8rem)]">
        <div className="bg-white p-10 mx-32 rounded-xl">
          <header>
            <h1 className="text-2xl font-bold">Meu perfil</h1>
          </header>

          <div className="mt-10">
            <h1 className="text-xl font-semibold">Me chamo</h1>

            <h1 className=" text-xl mt-1">{userData?.name}</h1>
            <h1 className="text-xl font-semibold mt-3">Sobre mim</h1>
            <h3 className="mt-1">
              {userData?.description ? userData?.description : "Sem descrição"}
            </h3>

            <div className="mt-4 font-semibold text-xl">
              Meus astrônomos favoritos
            </div>
            <div className="flex w-full gap-2 justify-around mt-2">
              {[...Array(3)].map((_, index) => {
                const astronomer = userData?.astronomers?.[index];

                return (
                  <div
                    key={index}
                    className="p-3 px-5 font-bold text-xl rounded-full relative"
                  >
                    {astronomer ? (
                      <div
                        className="bg-gray-100 p-3 rounded-full"
                        title={`${astronomer.name}`}
                      >
                        <button
                          className="absolute top-4 right-3 text-sm rounded-full text-white font-normal bg-red-500 px-1.5 cursor-pointer"
                          onClick={() => {
                            handleRemoveAstronomerModal(),
                              setAstronomerSelected(astronomer);
                          }}
                        >
                          X
                        </button>

                        {getInitials(astronomer.name)}
                      </div>
                    ) : (
                      <div
                        className="bg-gray-200 cursor-pointer p-4 px-6 rounded-full"
                        onClick={() => handleSelectAstronomerModal()}
                      >
                        +
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isModal && (
        <SelectAstronomerModal
          userId={userData!.id}
          handleSelectAstronomerModal={handleSelectAstronomerModal}
        />
      )}
      {isModalRemoveAstronomer && (
        <RemoveAstronomerModal
          userId={userData!.id}
          astronomer={astronomerSelected}
          handleRemoveAstronomerModal={handleRemoveAstronomerModal}
        />
      )}
    </section>
  );
};

export default ProfileBody;
