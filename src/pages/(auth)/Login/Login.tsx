import jupiter from "@/assets/design/jupiter.png";
import logo from "@/assets/brand/logo.svg";

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

import { userLogin } from "@/types/user.types";
import { userLoginSchema } from "@/schemas/user.schemas";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router-dom";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";

const Login = () => {
  const { signin } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<userLogin>({
    resolver: zodResolver(userLoginSchema),
  });

  const handleData = async (data: FieldValues) => {
    const res = await signin(data as userLogin);

    if (res === 200) {
      if (window !== undefined) {
        window.location.href = "/";
      }
    } else if (res === 400 || res === 500) {
      setError("password", {
        type: "manual",
        message: "E-mail / senha incorretos",
      });
    }
  };
  return (
    <StarsLayout>
      <div className="glass mx-4 my-8 grid w-full max-w-5xl animate-fade-in overflow-hidden lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <img src={logo} alt="Astromaniaka" className="w-56" />
          <h1 className="mt-10 text-3xl font-semibold text-white">
            Bem-vinda(o) de volta
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Entre para continuar explorando o universo com a comunidade.
          </p>
          <form
            onSubmit={handleSubmit(handleData)}
            className="mt-8 flex flex-col gap-1"
          >
            <Input
              label="E-mail"
              name={"email"}
              register={register}
              type="text"
              errors={errors.email?.message}
              placeholder="voce@exemplo.com"
            />
            <Input
              name="password"
              label="Senha"
              type="password"
              errors={errors.password?.message}
              register={register}
              placeholder="Sua senha"
            />
            <Button className="mt-4 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">
            Ainda não possui uma conta?{" "}
            <Link to={"/register"} className="link">
              Cadastre-se
            </Link>
          </p>
        </div>
        <div className="relative hidden items-center justify-center overflow-hidden border-l border-white/[0.06] bg-gradient-to-br from-nebula-600/20 via-transparent to-stardust-600/10 p-12 lg:flex">
          <div className="absolute h-80 w-80 rounded-full bg-nebula-500/30 blur-3xl" />
          <img
            src={jupiter}
            alt="Imagem de Júpiter"
            className="relative w-full max-w-sm drop-shadow-[0_0_60px_rgba(139,92,246,0.35)]"
          />
        </div>
      </div>
    </StarsLayout>
  );
};

export default Login;
