import { Heatmap } from "@paper-design/shaders-react";
export function ShaderLogo({ width, height }) {
	return (
		<Heatmap
			speed={0.7}
			contour={0.8}
			angle={-35}
			noise={0}
			innerGlow={0.5}
			outerGlow={0.2}
			scale={0.6}
			image="/assets/images/LogoRaw.png"
			colors={[
				"#2447c6",
				"#e87929",
				"#ffc234",
				"#d3f900",
				"#7d91f9",
				"#2160ff",
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
