import { Heatmap } from "@paper-design/shaders-react";
export function ShaderLogo({ width, height }) {
	return (
		<Heatmap
			speed={0.7}
			contour={0.15}
			angle={-35}
			noise={0}
			innerGlow={0.8}
			outerGlow={0.12}
			scale={0.5}
			image="/assets/images/LogoRaw.png"
			colors={[
				"#4669e7",
				"#ff0000",
				"#ff7134",
				"#fff41c",
				"#497af7",
				"#2447c6",
				"#11258b",
			]}
			colorBack="#00000000"
			style={{
				backgroundColor: "var(--bg)",
				height: `${height}px`,
				width: `${width}px`,
			}}
		/>
	);
}
