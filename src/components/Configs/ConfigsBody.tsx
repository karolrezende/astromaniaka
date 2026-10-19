import { useAuth } from "@/providers/AuthProvider";
import Button from "../common/Button/Button";
import { useEffect, useState } from "react";
import { useData } from "@/providers/DataProvider";
import { editUser } from "@/services/user.services";
import Popup from "../common/Popup/Popup";
import { KeyRound, Sparkles, TriangleAlert } from "lucide-react";
import { isDemoAccount } from "@/environments/demo";
import { Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";

const ConfigsBody = () => {
  const { token } = useAuth();
  const { userData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível editar o perfil"
  );

  const [name, setName] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);
  const [description, setDescription] = useState(userData?.description);

  const [deleteUser, setDeleteUser] = useState(false);
  // Contas da demo: e-mail, senha e exclusão travados para a entrada automática continuar funcionando
  const isLocked = isDemoAccount(userData?.email);
  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setDescription(userData.description);
    }
  }, [userData]);

  const handleEditUser = async () => {
    setIsLoading(true);
    try {
      if (userData && token) {
        const editedPost = await editUser(
          userData.id,
          { name, email, description },
          token
        );
        if (editedPost) {
          setPopupMessage("Perfil editado com sucesso!");
        } else {
          setPopupMessage("Não foi possível editar o perfil");
        }
        setPopup(true);
      }
    } catch (error) {
      setPopupMessage("Não foi possível editar o perfil");
      setPopup(true);
    }
    setIsLoading(false);
  };

  if (!userData) {
    return (
      <section className="page">
        <p className="text-slate-400">Carregando...</p>
      </section>
    );
  }

  const handleDeleteUser = () => {
    setDeleteUser(!deleteUser);
  };

  return (
    <section className="page">
      <div className="page-inner max-w-2xl">
        <header>
          <h1 className="page-title">Configurações</h1>
          <p className="page-subtitle">Atualize suas informações de perfil.</p>
        </header>
        <div className="glass p-6 sm:p-8">
          <div className="flex flex-col gap-4">
            <div>
              <label className="field-label" htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                value={name ?? ""}
                onChange={(e) => setName(e.target.value)}
                className="field"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                value={email ?? ""}
                disabled={isLocked}
                title={isLocked ? "O e-mail das contas da demonstração não pode ser alterado" : undefined}
                onChange={(e) => setEmail(e.target.value)}
                className="field"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="description">
                Sobre mim
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Conte um pouco sobre sua relação com o céu"
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
                className="field resize-none"
              />
            </div>
          </div>

          <Button className="mt-6 w-full sm:w-auto" onClick={handleEditUser} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>

        {isLocked ? (
          <div className="glass flex gap-3 p-6 sm:p-8">
            <Sparkles className="mt-0.5 shrink-0 text-nebula-300" size={20} />
            <div>
              <h2 className="font-semibold text-white">Conta de demonstração</h2>
              <p className="text-sm text-slate-400">
                Nome e descrição podem ser editados à vontade. E-mail, senha e exclusão do
                perfil ficam desativados para a demonstração continuar funcionando para todos.
              </p>
            </div>
          </div>
        ) : (
        <>
        <div className="glass p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <KeyRound className="mt-0.5 shrink-0 text-nebula-300" size={20} />
              <div>
                <h2 className="font-semibold text-white">Senha</h2>
                <p className="text-sm text-slate-400">
                  Para trocar a senha, confirme a atual.
                </p>
              </div>
            </div>
            <Link to={"/password"} className="btn-secondary shrink-0">
              Alterar senha
            </Link>
          </div>
        </div>

        <div className="glass border-rose-500/20 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <TriangleAlert className="mt-0.5 shrink-0 text-rose-300" size={20} />
              <div>
                <h2 className="font-semibold text-white">Zona de perigo</h2>
                <p className="text-sm text-slate-400">
                  Excluir o perfil é permanente e não pode ser desfeito.
                </p>
              </div>
            </div>
            <Button variant="danger" className="shrink-0" onClick={handleDeleteUser}>
              Excluir perfil
            </Button>
          </div>
        </div>
        </>
        )}
      </div>
      {deleteUser && <DeleteUser handleDeleteUser={handleDeleteUser} />}
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </section>
  );
};

export default ConfigsBody;
