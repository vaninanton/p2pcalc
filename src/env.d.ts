interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.css'
