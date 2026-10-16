import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";
import { editPassword } from "@/services/user.services";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
      setIsLoading(false);
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

  const fields: {
    id: keyof typeof passwordData;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    { id: "email", label: "E-mail", type: "email", placeholder: "voce@exemplo.com" },
    { id: "password", label: "Nova senha", type: "password", placeholder: "Digite a nova senha" },
    { id: "confirmPassword", label: "Repetir senha", type: "password", placeholder: "Repita a nova senha" },
  ];

  return (
    <StarsLayout>
      <div className="glass mx-4 w-full max-w-md animate-fade-in p-8 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-accent text-white shadow-glow">
          <KeyRound size={22} />
        </span>
        <h1 className="mt-6 text-2xl font-semibold text-white">Alterar senha</h1>
        <p className="mt-1 text-sm text-slate-400">
          Informe seu e-mail e escolha uma nova senha.
        </p>
        <div className="mt-8 flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label className="field-label" htmlFor={field.id}>
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={passwordData[field.id]}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    [field.id]: e.target.value,
                  }))
                }
                className="field"
              />
            </div>
          ))}
        </div>

        <Button className="mt-8 w-full" onClick={handleEditPost} disabled={isLoading}>
          {isLoading ? "Aguarde..." : "Alterar senha"}
        </Button>
        <p className="mt-6 text-center text-sm text-slate-400">
          Lembrou?{" "}
          <Link to={"/login"} className="link">
            Voltar para o login
          </Link>
        </p>

        {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
      </div>
    </StarsLayout>
  );
};

export default Password;
