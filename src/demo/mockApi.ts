// API simulada da demonstração: responde às mesmas rotas do Astroserver,
// com as mesmas regras de permissão, usando dados fictícios guardados no
// localStorage do visitante. Nenhuma requisição sai do navegador.
import { AxiosAdapter, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { createSeed, DemoDb, DemoPost, DemoUser, DEMO_DB_VERSION } from "./data";

const STORAGE_KEY = "astromaniaka-demo-db";

// ---------------- Persistência ----------------

let db: DemoDb | null = null;

const load = (): DemoDb => {
  if (db) return db;
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
    if (saved?.version === DEMO_DB_VERSION) {
      db = saved as DemoDb;
      return db;
    }
  } catch {
    // dados corrompidos: recomeça do zero
  }
  db = createSeed();
  save();
  return db;
};

const save = () => {
  if (db) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const resetDemoData = () => {
  db = createSeed();
  save();
};

// ---------------- Respostas ----------------

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const fail = (status: number, message: string): never => {
  throw new HttpError(status, message);
};

const id = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const now = () => new Date().toISOString();

// ---------------- Projeções (mesmo formato da API real) ----------------

const withoutPassword = (u: DemoUser) => ({ ...u });

const publicUser = (u: DemoUser) => {
  // A listagem pública não expõe e-mail (igual à API com as correções de segurança)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email, ...rest } = u;
  return rest;
};

const userAstronomers = (userId: string) => {
  const data = load();
  return data.favorites
    .filter((f) => f.userId === userId)
    .map((f) => data.astronomers.find((a) => a.id === f.astronomerId))
    .filter(Boolean);
};

const authorOf = (userId: string) => {
  const user = load().users.find((u) => u.id === userId);
  return { id: userId, name: user?.name ?? "Usuário removido" };
};

const commentsOf = (postId: string) => {
  const list = load()
    .comments.filter((c) => c.postId === postId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((c) => ({
      id: c.id,
      description: c.description,
      user: authorOf(c.userId),
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  // A API devolve null (json_agg) quando não há comentários
  return list.length ? list : null;
};

const likesOf = (postId: string) => load().likes.filter((l) => l.postId === postId);

const feedPost = (p: DemoPost, viewerId: string) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  is_accepted: p.is_accepted,
  picture: p.picture,
  post_type: p.post_type,
  userId: p.userId,
  createdAt: p.createdAt,
  user: authorOf(p.userId),
  likesCount: likesOf(p.id).length,
  likedByMe: likesOf(p.id).some((l) => l.userId === viewerId),
  comments: commentsOf(p.id),
});

const postStatus = (p: DemoPost) =>
  p.is_accepted ? "ACCEPTED" : p.rejectedAt ? "REJECTED" : "PENDING";

// ---------------- Regras de acesso ----------------

const viewerFrom = (config: InternalAxiosRequestConfig): DemoUser | null => {
  const header = String(config.headers?.Authorization ?? "");
  const token = header.replace(/^Bearer\s+/, "");
  if (!token.startsWith("demo.")) return null;
  return load().users.find((u) => u.id === token.slice(5)) ?? null;
};

const requireViewer = (viewer: DemoUser | null): DemoUser =>
  viewer ?? fail(401, "Token is missing");

const isAdmin = (u: DemoUser) => u.access_level === "ADMIN";

const requireAdmin = (viewer: DemoUser) => {
  if (!isAdmin(viewer)) fail(403, "Access denied");
};

const requireOwnerOrAdmin = (viewer: DemoUser, ownerId: string) => {
  if (viewer.id !== ownerId && !isAdmin(viewer)) fail(403, "Not allowed");
};

// Remove o usuário e tudo que depende dele (como as cascatas do banco)
const deleteUserCascade = (userId: string, heirId?: string) => {
  const data = load();
  const postIds = new Set(data.posts.filter((p) => p.userId === userId).map((p) => p.id));
  data.history.forEach((h) => {
    if (h.userId === userId && heirId) h.userId = heirId;
  });
  data.users = data.users.filter((u) => u.id !== userId);
  data.posts = data.posts.filter((p) => p.userId !== userId);
  data.comments = data.comments.filter((c) => c.userId !== userId && !postIds.has(c.postId));
  data.likes = data.likes.filter((l) => l.userId !== userId && !postIds.has(l.postId));
  data.favorites = data.favorites.filter((f) => f.userId !== userId);
};

const deletePostCascade = (postId: string) => {
  const data = load();
  data.posts = data.posts.filter((p) => p.id !== postId);
  data.comments = data.comments.filter((c) => c.postId !== postId);
  data.likes = data.likes.filter((l) => l.postId !== postId);
};

// ---------------- Rotas ----------------

type Ctx = {
  method: string;
  params: Record<string, string>;
  query: URLSearchParams;
  body: Record<string, unknown>;
  viewer: DemoUser | null;
};
type Handler = (ctx: Ctx) => [number, unknown];
type Route = { method: string; pattern: RegExp; keys: string[]; handler: Handler };

const routes: Route[] = [];
const route = (method: string, path: string, handler: Handler) => {
  const keys: string[] = [];
  const pattern = new RegExp(
    "^" + path.replace(/:(\w+)/g, (_, key) => (keys.push(key), "([^/]+)")) + "/?$"
  );
  routes.push({ method, pattern, keys, handler });
};

const str = (value: unknown) => (typeof value === "string" ? value : "");

// ----- Usuários -----

route("post", "/users/login", ({ body }) => {
  const user = load().users.find((u) => u.email === str(body.email));
  if (!user) fail(400, "Wrong e-mail/password");
  return [200, { token: `demo.${user!.id}` }];
});

route("post", "/users", ({ body }) => {
  const data = load();
  if (data.users.some((u) => u.email === str(body.email))) fail(409, "Email already exists");
  const user: DemoUser = {
    id: id("u"), name: str(body.name), email: str(body.email), description: null,
    picture: null, access_level: "USER", createdAt: now(), deletedAt: null,
  };
  data.users.push(user);
  return [201, { name: user.name, email: user.email }];
});

route("get", "/users/token", ({ viewer }) => {
  const me = requireViewer(viewer);
  return [200, { ...withoutPassword(me), astronomers: userAstronomers(me.id) }];
});

route("get", "/users", ({ viewer }) => {
  requireViewer(viewer);
  return [200, load().users.map(publicUser)];
});

route("get", "/users/user/:id", ({ viewer, params }) => {
  const me = requireViewer(viewer);
  const user = load().users.find((u) => u.id === params.id) ?? fail(404, "User not found");
  const base = me.id === user.id ? withoutPassword(user) : publicUser(user);
  return [200, { ...base, astronomers: userAstronomers(user.id) }];
});

route("put", "/users/:id", ({ viewer, params, body }) => {
  const me = requireViewer(viewer);
  requireOwnerOrAdmin(me, params.id);
  const user = load().users.find((u) => u.id === params.id) ?? fail(404, "User not found");
  if (typeof body.name === "string") user.name = body.name;
  if (typeof body.email === "string") user.email = body.email;
  if (body.description !== undefined) user.description = (body.description as string) ?? null;
  return [200, withoutPassword(user)];
});

route("delete", "/users/:id", ({ viewer, params }) => {
  const me = requireViewer(viewer);
  requireOwnerOrAdmin(me, params.id);
  deleteUserCascade(params.id);
  return [204, null];
});

route("post", "/users/password", ({ viewer }) => {
  requireViewer(viewer);
  return [200, { message: "Senha alterada com sucesso" }];
});

// ----- Posts -----

route("get", "/posts/mine", ({ viewer }) => {
  const me = requireViewer(viewer);
  const mine = load()
    .posts.filter((p) => p.userId === me.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      post_type: p.post_type,
      createdAt: p.createdAt,
      rejection_reason: p.rejection_reason,
      rejectedAt: p.rejectedAt,
      status: postStatus(p),
      likesCount: likesOf(p.id).length,
      commentsCount: load().comments.filter((c) => c.postId === p.id).length,
    }));
  return [200, mine];
});

route("get", "/posts", ({ viewer, query }) => {
  const me = requireViewer(viewer);
  const page = Math.max(1, Number(query.get("page")) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.get("limit")) || 10));
  const search = (query.get("search") ?? "").trim().toLowerCase();
  const type = query.get("type") ?? "";

  const all = load()
    .posts.filter((p) => p.is_accepted)
    .filter((p) => !type || p.post_type === type)
    .filter((p) => {
      if (!search) return true;
      const author = authorOf(p.userId).name.toLowerCase();
      return (
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        author.includes(search)
      );
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const offset = (page - 1) * limit;
  const items = all.slice(offset, offset + limit).map((p) => feedPost(p, me.id));
  return [200, { items, total: all.length, page, limit, hasMore: offset + items.length < all.length }];
});

route("get", "/posts/:id", ({ viewer, params }) => {
  const me = requireViewer(viewer);
  const p = load().posts.find((x) => x.id === params.id) ?? fail(404, "Post not found");
  return [200, feedPost(p, me.id)];
});

route("post", "/posts", ({ viewer, body }) => {
  const me = requireViewer(viewer);
  if (str(body.userId) !== me.id) fail(403, "Not allowed");
  const p: DemoPost = {
    id: id("p"),
    title: str(body.title),
    description: str(body.description),
    post_type: str(body.post_type) || "POST",
    userId: me.id,
    picture: null,
    // Posts de admin são aprovados na hora; os demais vão para a moderação
    is_accepted: isAdmin(me),
    rejection_reason: null,
    rejectedAt: null,
    createdAt: now(),
  };
  load().posts.push(p);
  return [201, p];
});

route("put", "/posts/accept/:id", ({ viewer, params }) => {
  const me = requireViewer(viewer);
  requireAdmin(me);
  const p = load().posts.find((x) => x.id === params.id) ?? fail(404, "Post not found");
  Object.assign(p, { is_accepted: true, rejectedAt: null, rejection_reason: null });
  return [201, { message: "Post aceito com sucesso!" }];
});

route("put", "/posts/:id", ({ viewer, params, body }) => {
  const me = requireViewer(viewer);
  const p = load().posts.find((x) => x.id === params.id) ?? fail(404, "Post not found");
  requireOwnerOrAdmin(me, p.userId);
  // Editar um post recusado o devolve para a fila de aprovação
  Object.assign(p, {
    title: str(body.title) || p.title,
    description: str(body.description) || p.description,
    rejectedAt: null,
    rejection_reason: null,
  });
  return [201, p];
});

route("delete", "/posts/:id", ({ viewer, params }) => {
  const me = requireViewer(viewer);
  const p = load().posts.find((x) => x.id === params.id) ?? fail(404, "Post not found");
  requireOwnerOrAdmin(me, p.userId);
  deletePostCascade(p.id);
  return [204, null];
});

route("post", "/posts/:id/like", ({ viewer, params }) => {
  const me = requireViewer(viewer);
  const data = load();
  const p = data.posts.find((x) => x.id === params.id && x.is_accepted) ?? fail(404, "Post not found");
  const had = data.likes.some((l) => l.postId === p.id && l.userId === me.id);
  data.likes = had
    ? data.likes.filter((l) => !(l.postId === p.id && l.userId === me.id))
    : [...data.likes, { userId: me.id, postId: p.id, createdAt: now() }];
  return [200, { liked: !had, likesCount: likesOf(p.id).length }];
});

// ----- Comentários -----

route("post", "/comment", ({ viewer, body }) => {
  const me = requireViewer(viewer);
  if (str(body.userId) !== me.id) fail(403, "Not allowed");
  if (!load().posts.some((p) => p.id === str(body.postId))) fail(404, "Post not found");
  const c = {
    id: id("c"),
    postId: str(body.postId),
    description: str(body.description),
    userId: me.id,
    createdAt: now(),
    updatedAt: null,
  };
  load().comments.push(c);
  return [201, c];
});

route("put", "/comment/:id", ({ viewer, params, body }) => {
  const me = requireViewer(viewer);
  const c = load().comments.find((x) => x.id === params.id) ?? fail(404, "Comment not found");
  requireOwnerOrAdmin(me, c.userId);
  const description = str(body.description).trim();
  if (!description) fail(400, "O comentário não pode ficar vazio");
  Object.assign(c, { description, updatedAt: now() });
  return [200, c];
});

route("delete", "/comment/:id", ({ viewer, params }) => {
  const me = requireViewer(viewer);
  const data = load();
  const c = data.comments.find((x) => x.id === params.id) ?? fail(404, "Comment not found");
  requireOwnerOrAdmin(me, c.userId);
  data.comments = data.comments.filter((x) => x.id !== c.id);
  return [204, null];
});

// ----- Fatos históricos -----

route("get", "/history", ({ viewer }) => {
  requireViewer(viewer);
  const list = [...load().history]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((h) => ({ ...h, comments: null }));
  return [201, list];
});

route("post", "/history", ({ viewer, body }) => {
  const me = requireViewer(viewer);
  requireAdmin(me);
  const h = {
    id: id("h"), title: str(body.title), description: str(body.description),
    picture: null, userId: me.id, createdAt: now(),
  };
  load().history.push(h);
  return [201, h];
});

route("put", "/history/:id", ({ viewer, params, body }) => {
  const me = requireViewer(viewer);
  requireAdmin(me);
  const h = load().history.find((x) => x.id === params.id) ?? fail(404, "History not found");
  Object.assign(h, { title: str(body.title) || h.title, description: str(body.description) || h.description });
  return [201, h];
});

route("delete", "/history/:id", ({ viewer, params }) => {
  const me = requireViewer(viewer);
  requireAdmin(me);
  const data = load();
  data.history = data.history.filter((h) => h.id !== params.id);
  return [204, null];
});

// ----- Astrônomos -----

route("get", "/astronomer", ({ viewer }) => {
  requireViewer(viewer);
  return [200, load().astronomers];
});

route("post", "/astronomer", ({ viewer, body }) => {
  const me = requireViewer(viewer);
  requireAdmin(me);
  const data = load();
  if (data.astronomers.some((a) => a.name.toLowerCase() === str(body.name).toLowerCase())) {
    fail(409, "Astronomer already exists");
  }
  const a = {
    id: id("a"), name: str(body.name), picture: null,
    description: str(body.description), birthday: new Date(str(body.birthday)).toISOString(),
  };
  data.astronomers.push(a);
  return [200, a];
});

route("post", "/astronomer/user", ({ viewer, body }) => {
  const me = requireViewer(viewer);
  const data = load();
  const astronomerId = str(body.astronomerId);
  const mine = data.favorites.filter((f) => f.userId === me.id);
  if (mine.length >= 3) fail(422, "User cannot have more than 3 astronomers");
  if (mine.some((f) => f.astronomerId === astronomerId)) fail(409, "User already on astronomer");
  const fav = { userId: me.id, astronomerId };
  data.favorites.push(fav);
  return [200, fav];
});

route("delete", "/astronomer/user", ({ viewer, body }) => {
  const me = requireViewer(viewer);
  const data = load();
  data.favorites = data.favorites.filter(
    (f) => !(f.userId === me.id && f.astronomerId === str(body.astronomerId))
  );
  return [204, null];
});

// ----- Administração -----

route("get", "/admin", ({ viewer }) => {
  requireAdmin(requireViewer(viewer));
  const pending = load()
    .posts.filter((p) => !p.is_accepted && !p.rejectedAt)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((p) => ({ ...p, user: authorOf(p.userId) }));
  return [200, pending];
});

route("put", "/admin/posts/:id/reject", ({ viewer, params, body }) => {
  requireAdmin(requireViewer(viewer));
  const reason = str(body.reason).trim();
  if (reason.length < 3) fail(400, "Explique o motivo da recusa");
  const p =
    load().posts.find((x) => x.id === params.id && !x.is_accepted) ??
    fail(404, "Pending post not found");
  Object.assign(p, { rejectedAt: now(), rejection_reason: reason });
  return [200, { message: "Post recusado" }];
});

route("get", "/admin/users", ({ viewer }) => {
  requireAdmin(requireViewer(viewer));
  const data = load();
  const list = [...data.users]
    .sort((a, b) => a.access_level.localeCompare(b.access_level) || a.name.localeCompare(b.name))
    .map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      access_level: u.access_level,
      createdAt: u.createdAt,
      postsCount: data.posts.filter((p) => p.userId === u.id).length,
      commentsCount: data.comments.filter((c) => c.userId === u.id).length,
    }));
  return [200, list];
});

route("patch", "/admin/users/:id/role", ({ viewer, params, body }) => {
  const me = requireViewer(viewer);
  requireAdmin(me);
  if (params.id === me.id) fail(400, "Você não pode alterar o seu próprio nível de acesso");
  const user = load().users.find((u) => u.id === params.id) ?? fail(404, "User not found");
  const level = str(body.access_level);
  if (level !== "ADMIN" && level !== "USER") fail(400, "Nível de acesso inválido");
  user.access_level = level as DemoUser["access_level"];
  return [200, { message: "Nível de acesso atualizado" }];
});

route("delete", "/admin/users/:id", ({ viewer, params }) => {
  const me = requireViewer(viewer);
  requireAdmin(me);
  if (params.id === me.id) fail(400, "Use as configurações para excluir o seu próprio perfil");
  const user = load().users.find((u) => u.id === params.id) ?? fail(404, "User not found");
  if (user.access_level === "ADMIN") fail(400, "Rebaixe o administrador para usuário antes de excluí-lo");
  deleteUserCascade(user.id, me.id);
  return [204, null];
});

// ---------------- Adaptador do axios ----------------

const parseBody = (data: unknown): Record<string, unknown> => {
  if (!data) return {};
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  return data as Record<string, unknown>;
};

export const demoAdapter: AxiosAdapter = async (config) => {
  // Pequeno atraso para os carregamentos aparecerem como numa API real
  await new Promise((r) => setTimeout(r, 120 + Math.random() * 230));

  const method = (config.method ?? "get").toLowerCase();
  const url = new URL(config.url ?? "/", "http://demo.local");
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const query = new URLSearchParams(url.search);
  Object.entries(config.params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) query.set(key, String(value));
  });

  const respond = (status: number, data: unknown): AxiosResponse => ({
    status,
    statusText: String(status),
    data,
    headers: {},
    config,
    request: { status },
  });

  const match = routes
    .filter((r) => r.method === method)
    .map((r) => ({ r, m: path.match(r.pattern) }))
    .find(({ m }) => m);

  let status: number;
  let data: unknown;
  try {
    if (!match) fail(404, `Rota não encontrada na demo: ${method.toUpperCase()} ${path}`);
    const params = Object.fromEntries(match!.r.keys.map((key, i) => [key, decodeURIComponent(match!.m![i + 1])]));
    [status, data] = match!.r.handler({
      method,
      params,
      query,
      body: parseBody(config.data),
      viewer: viewerFrom(config),
    });
    save();
  } catch (err) {
    if (!(err instanceof HttpError)) throw err;
    status = err.status;
    data = { message: err.message };
  }

  const response = respond(status, data);
  if (status >= 400) {
    // Mesmo formato de erro do axios: os services leem err.request.status e err.response
    throw new AxiosError(
      `Request failed with status code ${status}`,
      status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
      config,
      response.request,
      response
    );
  }
  return response;
};
