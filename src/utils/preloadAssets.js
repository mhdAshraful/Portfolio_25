import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import FontFaceObserver from "fontfaceobserver";

/**
 * Preload assets with progress callback funciton
 * @param {function} onProgress - called with percentage 0 to 100
 * @returns
 */

export async function preloadAssets(onProgress) {
	const imagePaths = [
		"/assets/images/mouse.svg",
		"/assets/images/mousearrow.svg",
		"/assets/images/icon.webp",
		"/assets/images/quote.svg",
		"/assets/images/arrow.png",
		"/assets/images/artgallery.png",
		"/assets/images/ashiq.png",
		"/assets/images/audiophile.png",
		"/assets/images/flowerbucket.png",
		"/assets/images/books.webp",
		"/assets/images/b3.webp",
		"/assets/images/boxGithub.svg",
		"/assets/images/boxLinkedin.svg",
		"/assets/images/boxTwitter.svg",
		"/assets/images/github.svg",
		"/assets/images/linkedin.svg",
		"/assets/images/twitter.svg",
		"/assets/images/budgetarrow.svg",
		"/assets/images/budgetcard1.svg",
		"/assets/images/budgetcard2.svg",
		"/assets/images/budgetcard3.svg",
		"/assets/images/budgetcircles.svg",
		"/assets/images/budgetmenu.svg",
		"/assets/images/cornerstar.svg",
		"/assets/images/fullstar.svg",
		"/assets/images/halfstar.svg",
		"/assets/images/letsmake.svg",
		"/assets/images/mhdAshraful.svg",
		"/assets/images/mobileInterface.svg",
		"/assets/images/MobileInterface.png",
	];

	const modelPaths = [
		"/assets/3d/hopen.glb",
		"/assets/3d/hpointed.glb",
		"/assets/3d/grad.glb",
		"/assets/3d/Boxed.glb",
	];

	const fontNames = [
		"Fira Sans", // Must match your @font-face
		"Neue Regrade Variable",
		"Neue Regrade",
	];

	/**
	 *   Progress Tracking by Counting total assets
	 *   Increment a counter every time one asset
	 *   finishes loading.
	 */
	const totalAssets = imagePaths.length + modelPaths.length + fontNames.length;
	let loadedCount = 0;

	/** Update inside every Load Call Promise */
	const updateProgress = () => {
		loadedCount++;
		const percent = Math.round((loadedCount / totalAssets) * 100);
		onProgress?.(percent);
	};

	/** Promises for Images */
	const imagePromise = imagePaths.map((eachPath) => {
		return new Promise((resolv, reject) => {
			const img = new Image();
			img.onload = () => {
				updateProgress();
				resolv();
			};
			img.onerror = () => {
				updateProgress();
				reject(`Failde to load: ${eachPath}`);
			};
			img.src = eachPath;
		});
	});

	/** Promises for Models */
	const loader = new GLTFLoader();
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath("/draco/gltf/");
	loader.setDRACOLoader(dracoLoader);
	const modelPromise = modelPaths.map((eachPath) => {
		return loader
			.loadAsync(eachPath)
			.then((gltf) => {
				updateProgress();
				return gltf;
			})
			.catch((err) => {
				updateProgress();
				console.error(`Failed to load model: ${eachPath}`, err.message);
			});
	});

	/** Promises for Fonts */
	const fontPromise = fontNames.map(async (name) => {
		const font = new FontFaceObserver(name);
		await font.load();
		updateProgress();
	});

	/*** Return All Promises
	 * following line means
	 * result = await Promise.all([...fontPromise, ...imagePromise, ...modelPromise]);
	 * return result;
	 */
	return Promise.all([...fontPromise, ...imagePromise, ...modelPromise]);
}
