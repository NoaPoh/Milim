export async function createContext() {
  return {}; // You can put auth/user/session info here later
}

export type Context = Awaited<ReturnType<typeof createContext>>;
