# Astromaniaka

Rede social de astronomia feita com React, TypeScript, Vite e Tailwind CSS.
A API fica no repositório [astroserver](https://github.com/karolrezende/astroserver).

## Branch `demo`: roda só no navegador

Esta branch é uma demonstração que **não precisa de API nem de banco**. Todas as requisições
são respondidas por uma API simulada dentro do próprio front (`src/demo/mockApi.ts`), com
dados fictícios (`src/demo/data.ts`). Ela segue as mesmas rotas, regras de permissão e
formatos de resposta do Astroserver.

- **Sem login:** o sistema abre direto, já com a conta **Usuário** (Karoline Rezende).
- **Troca de perfil:** o seletor **Modo demonstração** alterna entre **Usuário** e **Admin**
  (na barra lateral no desktop, embaixo da tela no celular). O menu do perfil também tem
  essa opção.
- **Dados salvos só no navegador:** cada visitante tem a própria cópia no `localStorage`.
  Curtir, comentar, publicar, aprovar e excluir funcionam de verdade, sem afetar mais ninguém.
- **Restaurar dados** (ícone ↺ no seletor) volta tudo ao estado inicial.
- `/login` e `/register` levam para o feed, e `/password` leva para as configurações. Nas
  contas da demo, e-mail, senha e exclusão do perfil ficam desativados.

### Rodar

```bash
npm i
npm run dev
```

### Publicar como site estático

```bash
npm run build   # gera a pasta dist/
```

A pasta `dist/` pode ir para qualquer hospedagem estática. O `vercel.json` já redireciona
todas as rotas para o `index.html`. Em outras hospedagens, configure o mesmo fallback de SPA.

### Usar a API real em vez da simulada

Defina no `.env.local`:

```
VITE_DEMO_API=real
VITE_API_URL=http://localhost:3001
```

Nesse modo o front entra sozinho com as contas de teste do seed do Astroserver. Elas podem
ser trocadas com `VITE_DEMO_USER_EMAIL`, `VITE_DEMO_USER_PASSWORD`, `VITE_DEMO_ADMIN_EMAIL`
e `VITE_DEMO_ADMIN_PASSWORD`.
