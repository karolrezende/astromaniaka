import StarsLayout from "@/layout/StarsLayout/StarsLayout";
import { useAuth } from "@/providers/AuthProvider";
import { Loader2, SatelliteDish } from "lucide-react";

// Na demo não há tela de login: enquanto a entrada automática não termina,
// mostra um carregamento (ou o erro, se a API estiver fora do ar)
const AuthGuard = ({children}:{children: React.ReactNode}) => {

    const { token, demoError, retryDemo } = useAuth()

    if (!token) {
        return (
            <StarsLayout>
                <div className="glass mx-4 flex max-w-sm animate-fade-in flex-col items-center gap-4 p-8 text-center">
                    {demoError ? (
                        <>
                            <SatelliteDish className="text-nebula-300" size={36} />
                            <h1 className="text-lg font-semibold text-white">Sem sinal da API</h1>
                            <p className="text-sm text-slate-400">
                                Não foi possível entrar na demonstração. Confira se o Astroserver e o banco estão rodando.
                            </p>
                            <button type="button" className="btn-primary" onClick={retryDemo}>
                                Tentar de novo
                            </button>
                        </>
                    ) : (
                        <>
                            <Loader2 className="animate-spin text-nebula-300" size={32} />
                            <p className="text-sm text-slate-300">Entrando na demonstração...</p>
                        </>
                    )}
                </div>
            </StarsLayout>
        );
    }

    return (<>
        {children}
    </>);
}

export default AuthGuard;
