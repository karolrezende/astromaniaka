# Astromaniaka

Rede social de astronomia feita com React, TypeScript, Vite e Tailwind CSS.
A API fica no repositório [astroserver](https://github.com/karolrezende/astroserver).

## Branch `demo`: sem login

Nesta branch o sistema abre direto, sem tela de login, para qualquer pessoa explorar:

- Ao abrir, o front entra sozinho com a conta de demonstração **Usuário** (Karoline Rezende).
- O seletor **Modo demonstração** alterna entre **Usuário** e **Admin**: na barra lateral no
  desktop e embaixo da tela no celular. O menu do perfil também tem essa opção.
- `/login` e `/register` levam para o feed, e `/password` leva para as configurações.
- Nas contas da demo, e-mail, senha e exclusão do perfil ficam desativados, e o admin não
  pode excluí-las nem mudar o nível de acesso delas. Assim a entrada automática continua
  funcionando para todo mundo.

A API não muda: ela continua exigindo token, e o front faz o login automaticamente com as
contas de teste do seed. Para usar outras contas, defina no `.env.local`:

```
VITE_DEMO_USER_EMAIL=...
VITE_DEMO_USER_PASSWORD=...
VITE_DEMO_ADMIN_EMAIL=...
VITE_DEMO_ADMIN_PASSWORD=...
```

## Rodando

1. Suba a API e o banco seguindo o README do astroserver.
2. Aponte o front para a API e rode:

```bash
echo "VITE_API_URL=http://localhost:3001" > .env.local
npm i
npm run dev
```

Os visitantes mexem nos dados de verdade. Para voltar ao estado original, recrie o banco no
astroserver com `docker compose down -v && docker compose up -d`.
