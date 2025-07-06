import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
	root: "./", //where index.html is
	publicDir: "./public",
	base: "/",
	assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.hdr"],
	resolve: {
		alias: {
			"@cmpnnts": path.resolve(__dirname, "./src/components"),
			"@imgs": path.resolve(__dirname, "./assets/images"),
			"@fnt": path.resolve(__dirname, "./asssets/fonts"),
		},
	},
	plugins: [
		react(),
	],
	server: {
		// To Include a Lygia lighting function from online
		// #include "https://lygia.xyz/lighting/phong.glsl"
		fs: {
			allow: ["."],
		},
		host: true,
		watch: true,
		open: !(
			"SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env
		),
	},
	build: {
		outDir: "./dist",
		emptyOutDir: true,
		sourcemap: true,
	},
});
