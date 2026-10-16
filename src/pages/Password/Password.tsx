import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import AuthGuard from "@/guards/AuthGuard";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";
import { useAuth } from "@/providers/AuthProvider";
import { editPassword } from "@/services/user.services";
import { userPassword } from "@/types/user.types";
import axios from "axios";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Password = () => {
  const { token } = useAuth();
  const [passwordData, setPasswordData] = useState<userPassword>({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível alterar a senha"
  );

  const showMessage = (message: string) => {
    setPopupMessage(message);
    setPopup(true);
  };

  const handleEditPassword = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.password ||
      !passwordData.confirmPassword
    ) {
      showMessage("Preencha todos os campos");
      return;
    }
    if (passwordData.password !== passwordData.confirmPassword) {
      showMessage("As senhas não coincidem");
      return;
    }
    if (!token) return;

    setIsLoading(true);
    try {
      await editPassword(passwordData, token);
      setPasswordData({ currentPassword: "", password: "", confirmPassword: "" });
      showMessage("Senha alterada com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        showMessage("Senha atual incorreta");
      } else {
        showMessage("Não foi possível alterar a senha");
      }
    }
    setIsLoading(false);
  };

  const fields: {
    id: keyof typeof passwordData;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    { id: "currentPassword", label: "Senha atual", type: "password", placeholder: "Digite sua senha atual" },
    { id: "password", label: "Nova senha", type: "password", placeholder: "Digite a nova senha" },
    { id: "confirmPassword", label: "Repetir senha", type: "password", placeholder: "Repita a nova senha" },
  ];

  return (
    <AuthGuard>
      <StarsLayout>
        <div className="glass mx-4 w-full max-w-md animate-fade-in p-8 sm:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-accent text-white shadow-glow">
            <KeyRound size={22} />
          </span>
          <h1 className="mt-6 text-2xl font-semibold text-white">Alterar senha</h1>
          <p className="mt-1 text-sm text-slate-400">
            Confirme sua senha atual e escolha uma nova.
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

          <Button className="mt-8 w-full" onClick={handleEditPassword} disabled={isLoading}>
            {isLoading ? "Aguarde..." : "Alterar senha"}
          </Button>
          <p className="mt-6 text-center text-sm text-slate-400">
            <Link to={"/configs"} className="link">
              Voltar para as configurações
            </Link>
          </p>

          {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
        </div>
      </StarsLayout>
    </AuthGuard>
  );
};

export default Password;
