import logo from "@/assets/brand/logo.svg";

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

import { userRegister } from "@/types/user.types";
import { userRegisterSchema } from "@/schemas/user.schemas";

import { registerUser } from "@/services/user.services";
import Popup from "@/components/common/Popup/Popup";

import { LucideIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";

const Register = () => {
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState<LucideIcon>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userRegister>({
    resolver: zodResolver(userRegisterSchema),
  });

  const handleData = async (data: FieldValues) => {
    const resData = await registerUser(data as userRegister);

    if (resData === 409) {
      setMessage("Esse e-mail já está cadastrado!");
      setIcon(X);
      return;
    }

    if (resData === 400 || resData == 500) {
      setMessage("Algo deu errado, tente novamente");
      setIcon(X);
      return;
    } else if (resData) {
      setMessage("Cadastrado com sucesso!");
      setIcon(undefined);
      setTimeout(() => {
        if (window.location.href !== undefined) {
          window.location.href = "/login";
        }
      }, 1000);
    }
  };

  return (
    <StarsLayout>
      <div className="glass mx-4 my-8 w-full max-w-md animate-fade-in p-8 sm:p-10">
        <img src={logo} alt="Astromaniaka" className="mx-auto w-48" />
        <h1 className="mt-8 text-center text-2xl font-semibold text-white">
          Criar uma conta
        </h1>
        <p className="mt-1 text-center text-sm text-slate-400">
          Junte-se a quem também vive olhando pro céu.
        </p>
        <form
          onSubmit={handleSubmit(handleData)}
          className="mt-8 flex flex-col gap-1"
        >
          <Input
            label="Nome"
            name={"name"}
            register={register}
            type="text"
            errors={errors.name?.message}
            placeholder="Como devemos te chamar?"
          />
          <Input
            label="E-mail"
            name={"email"}
            register={register}
            type="text"
            errors={errors.email?.message}
            placeholder="voce@exemplo.com"
          />
          <div className="grid gap-x-3 sm:grid-cols-2">
            <Input
              name="password"
              label="Senha"
              type="password"
              errors={errors.password?.message}
              register={register}
              placeholder="Crie uma senha"
            />
            <Input
              name="confirm_password"
              label="Confirme a senha"
              type="password"
              errors={errors.confirm_password?.message}
              register={register}
              placeholder="Repita a senha"
            />
          </div>

          <Button className="mt-4 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Já tem uma conta?{" "}
          <Link to={"/login"} className="link">
            Faça seu login
          </Link>
        </p>

        <Popup message={message} setMessage={setMessage} Icon={icon} />
      </div>
    </StarsLayout>
  );
};

export default Register;
