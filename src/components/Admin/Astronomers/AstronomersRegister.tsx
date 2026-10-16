import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import { useAuth } from "@/providers/AuthProvider";
import { registerAstronomer } from "@/services/astronomer.services";
import { useState } from "react";

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
        if (newAstronomer.name) {
          setPopupMessage("Astronomo cadastrado com sucesso!");
          setAstronomer({ name: "", description: "", birthday: "" });
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
    <section className="glass max-w-xl animate-fade-in p-6 sm:p-8">
      <header>
        <h2 className="text-xl font-semibold text-white">Cadastrar astrônomo</h2>
        <p className="mt-1 text-sm text-slate-400">
          Ele ficará disponível para todos favoritarem no perfil.
        </p>
      </header>
      <div className="mt-6 flex flex-col gap-4">
        <div>
          <label className="field-label" htmlFor="name">
            Nome
          </label>
          <input
            id="name"
            placeholder="Ex.: Carl Sagan"
            value={astronomer.name}
            onChange={(e) =>
              setAstronomer({ ...astronomer, name: e.target.value })
            }
            className="field"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="description">
            Descrição
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder="Principais contribuições para a astronomia"
            value={astronomer.description}
            onChange={(e) =>
              setAstronomer({
                ...astronomer,
                description: e.target.value,
              })
            }
            className="field resize-none"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="birthday">
            Data de nascimento
          </label>
          <input
            id="birthday"
            type="date"
            value={astronomer.birthday}
            onChange={(e) =>
              setAstronomer({
                ...astronomer,
                birthday: e.target.value,
              })
            }
            className="field"
          />
        </div>
      </div>

      <Button
        className="mt-6 w-full"
        onClick={() => handleRegisterAstronomer()}
      >
        Cadastrar
      </Button>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </section>
  );
};

export default AstronomersRegister;
