import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import { useAuth } from "@/providers/AuthProvider";
import { registerAstronomer } from "@/services/astronomer.services";
import { useEffect, useState } from "react";

const AstronomersRegister = () => {
  const { token } = useAuth();
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível cadastrar astronomo"
  );

  const [astronomer, setAstronomer] = useState({
    name: "",
    description: "",
    birthday: "",
  });

  const handleRegisterAstronomer = async () => {
    try {
      if(  astronomer.name ==''||
        astronomer.description ==''||
        astronomer.birthday ==''){
          setPopup(true)
          setPopupMessage("Todos os campos são obrigatórios!");
          return
        }
      if (token) {
        const newAstronomer = await registerAstronomer(astronomer, token);
        console.log(newAstronomer)
        console.log(newAstronomer)
        if (newAstronomer.name) {
          setPopupMessage("Astronomo cadastrado com sucesso!");
        } else {
          setPopupMessage("Não foi possível cadastrar astronomo");
        }
        setPopup(true);
      }
    } catch (error) {
      setPopupMessage("Não foi possível cadastrar astronomo");
      setPopup(true);
    }
  };

  return (
    <section className="mt-10 lg:w-[60%]">
      <div className=" rounded-lg w-full flex flex-col overflow-y-auto ">
        <div className="text-white border-2  p-10 rounded-2xl">
          <div className="">
            <header>
              <h1 className="text-2xl">Cadastrar astronomo</h1>
            </header>
            <div>
              <div className="flex flex-col mt-2">
                <label className="text-xs ml-1" htmlFor="name">
                  Nome
                </label>
                <div className="flex border-2 rounded-2xl items-center px-2 py-1 border-zinc-700">
                  <input
                    id="name"
                    placeholder="Digite um nome"
                    value={astronomer.name}
                    onChange={(e) =>
                      setAstronomer({ ...astronomer, name: e.target.value })
                    }
                    className=" rounded-lg p-1 px-2 outline-none bg-transparent "
                  />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <label className="text-xs ml-1" htmlFor="email">
                  Descrição
                </label>
                <div className="flex border-2 rounded-2xl items-center px-2 py-1 border-zinc-700">
                  <input
                    id="email"
                    placeholder="Digite uma descrição"
                    value={astronomer.description}
                    onChange={(e) =>
                      setAstronomer({
                        ...astronomer,
                        description: e.target.value,
                      })
                    }
                    className=" rounded-lg p-1 px-2 outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <label className="text-xs ml-1" htmlFor="email">
                  Data de nascimento
                </label>
                <div className="flex border-2 rounded-2xl items-center px-2 py-1 border-zinc-700">
                  <input
                    id="description"
                    type="date"
                    placeholder="Escolha a data de nascimento"
                    value={astronomer.birthday}
                    onChange={(e) =>
                      setAstronomer({
                        ...astronomer,
                        birthday: e.target.value,
                      })
                    }
                    className=" rounded-lg p-1 px-2 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            <Button
              className="px-2 w-full mt-4 border-white border-2"
              onClick={() => handleRegisterAstronomer()}
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </section>
  );
};

export default AstronomersRegister;
