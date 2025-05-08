import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
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
		glsl({
			include: [
				// Glob pattern, or array of glob patterns to import
				"**/*.glsl",
				"**/*.wgsl",
				"**/*.vert",
				"**/*.frag",
				"**/*.vs",
				"**/*.fs",
			],
			// // ".glsl" extension will be added automatically:
			// example: #include utils/chunk1;
			exclude: undefined, // Glob pattern, or array of glob patterns to ignore
			warnDuplicatedImports: true, // Warn if the same chunk was imported multiple times
			removeDuplicatedImports: false, // Automatically remove an already imported chunk
			defaultExtension: "glsl", // Shader suffix when no extension is specified
			minify: false, // Minify/optimize output shader code
			watch: true, // Recompile shader on change
			root: "/", // Directory for root imports
		}),
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
