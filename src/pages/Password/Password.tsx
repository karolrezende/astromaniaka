import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";
import { editPassword } from "@/services/user.services";
import { Pencil } from "lucide-react";
import { useState } from "react";

const Password = () => {
  const [passwordData, setPasswordData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível alterar a senha"
  );

  const handleEditPost = async () => {
    setIsLoading(true);

    if (
      !passwordData.email ||
      !passwordData.password ||
      !passwordData.confirmPassword
    ) {
      setPopupMessage("Preencha todos os campos");
      setPopup(true);
      return;
    }
    try {
      const editedPassword = await editPassword(passwordData);
      setPopup(true);
      if (editedPassword) {
        setPopupMessage("Senha alterada com sucesso!");
      } else {
        setPopupMessage("Não foi possível alterar a senha");
      }
    } catch (error) {
      setPopup(true);
      setPopupMessage("Não foi possível alterar a senha");
    }
    setIsLoading(false);
  };

  return (
    <StarsLayout>
      <div className="mx-4 lg:mx-4 rounded-lg w-full flex flex-col overflow-y-auto h-[calc(100vh-8rem)] items-center justify-center">
        <div className="bg-white p-10 rounded-2xl">
          <header>
            <h1 className="text-2xl">Alterar senha</h1>
          </header>
          <div>
            <div className="flex flex-col mt-2">
              <label className="text-xs ml-1" htmlFor="email">
                Email
              </label>
              <div className="flex border-2 rounded-2xl items-center px-2 py-1 border-zinc-700">
                <input
                  id="email"
                  placeholder="Digite estrelinha..."
                  value={passwordData.email}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="rounded-lg p-1 px-2 outline-none"
                />
                <Pencil className="cursor-pointer" />
              </div>
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-xs ml-1" htmlFor="password">
                Senha
              </label>
              <div className="flex border-2 rounded-2xl items-center px-2 py-1 border-zinc-700">
                <input
                  id="password"
                  placeholder="Aqui também!"
                  value={passwordData.password}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="rounded-lg p-1 px-2 outline-none"
                />
                <Pencil className="cursor-pointer" />
              </div>
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-xs ml-1" htmlFor="confirmPassword">
                Repetir Senha
              </label>
              <div className="flex border-2 rounded-2xl items-center px-2 py-1 border-zinc-700">
                <input
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  placeholder="E aqui também!"
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="rounded-lg p-1 px-2 outline-none"
                />
                <Pencil className="cursor-pointer" />
              </div>
            </div>
          </div>

          <Button className="px-2 w-full mt-4" onClick={handleEditPost}>
            {isLoading ? "Aguarde..." : "Editar perfil"}
          </Button>
          <p className="text-center text-xs mt-2">
            ou
            <br />
            <span
              className="text-sm mt-1 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              Voltar
            </span>
          </p>
        </div>

        {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
      </div>
    </StarsLayout>
  );
};

export default Password;
