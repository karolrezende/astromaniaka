// Modo demonstração: o sistema entra sozinho com contas do seed, sem tela de login.
// As credenciais são as de teste do seed do Astroserver (docker/postgres/init/02-seed.sql)
// e podem ser trocadas por variáveis de ambiente.
export type DemoProfile = "user" | "admin";

export const DEMO_ACCOUNTS: Record<
  DemoProfile,
  { label: string; email: string; password: string }
> = {
  user: {
    label: "Usuário",
    email: import.meta.env.VITE_DEMO_USER_EMAIL ?? "karol@astromaniaka.com",
    password: import.meta.env.VITE_DEMO_USER_PASSWORD ?? "123456",
  },
  admin: {
    label: "Admin",
    email: import.meta.env.VITE_DEMO_ADMIN_EMAIL ?? "admin@astromaniaka.com",
    password: import.meta.env.VITE_DEMO_ADMIN_PASSWORD ?? "123456",
  },
};

export const DEMO_EMAILS = Object.values(DEMO_ACCOUNTS).map((a) => a.email);

export const isDemoAccount = (email?: string | null) =>
  Boolean(email && DEMO_EMAILS.includes(email));
