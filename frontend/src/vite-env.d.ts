/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // você pode adicionar outras variáveis de ambiente aqui se precisar
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
