/// <reference types="vite/client" />

interface ImportMetaEnv {
	// Vite injects env vars; keep a permissive index signature to avoid redeclaration conflicts
	[key: string]: string | undefined;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
