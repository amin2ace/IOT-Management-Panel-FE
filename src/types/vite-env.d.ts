/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEST_JS_APP_URL: string;
  readonly VITE_REACT_APP_URL: string;
  readonly VITE_WEB_COCKET_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
