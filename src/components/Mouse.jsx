import * as THREE from "three";
import gsap from "gsap";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useTouchDevice } from "../utils/deviceDetector";

import MorphSVGPlugin from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

const Mouse = () => {
	const m1Ref = useRef(null);
	const pathRef = useRef(null);
	const svgRef = useRef(null);

	const pathDOT =
		"M20 17.5C21.3807 17.5 22.5 18.6193 22.5 20C22.5 21.3807 21.3807 22.5 20 22.5C18.6193 22.5 17.5 21.3807 17.5 20C17.5 18.6193 18.6193 17.5 20 17.5Z"; // circle
	const pathARROW = "M10.5 31.5L29.9998 9M29.9998 9H15.6147M29.9998 9V23.5"; // basic arrow triangle

	const target = useRef(new THREE.Vector2());
	const current = useRef(new THREE.Vector2());

	const touchDevice = useTouchDevice();
	if (touchDevice) return null;

	useLayoutEffect(() => {
		document.body.style.cursor = "none";

		const baseSize = 40;
		const minScale = 0.4;
		const maxScale = 1;
		const maxDistance = 200;

		let animationFrame;

		const onMouseMove = (e) => {
			const { width, height } = m1Ref.current?.getBoundingClientRect();
			target.current.set(e.clientX - width / 2, e.clientY - height / 2);
		};

		const onEnter = (e) => {
			gsap.to(pathRef.current, {
				duration: 0.3,
				fill: "#ed3203",
				stroke: "#ed3203",
				strokeWidth: 2,
				morphSVG: { d: pathARROW },
				ease: "back.inOut",
			});
		};

		const onLeave = (e) => {
			gsap.to(pathRef.current, {
				duration: 0.3,
				fill: "#0F0F0F",
				stroke: "#0F0F0F",
				morphSVG: { d: pathDOT },
				ease: "back.inOut",
			});
		};

		document.querySelectorAll(".work_box, button, a").forEach((el) => {
			el.addEventListener("mouseenter", onEnter);
			el.addEventListener("mouseleave", onLeave);
		});

		let lastTime = performance.now();
		const update = () => {
			const now = performance.now();
			const delta = (now - lastTime) / 1000;
			lastTime = now;

			const k = 14;
			const alpha = 1 - Math.exp(-k * delta);

			current.current.lerp(target.current, alpha);

			const dx = current.current.x - target.current.x;
			const dy = current.current.y - target.current.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			const scale = Math.min(
				maxScale,
				Math.max(minScale, 1 - distance / maxDistance)
			);
			const size = scale * baseSize;

			m1Ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
			m1Ref.current.style.width = `${size}px`;
			m1Ref.current.style.height = `${size}px`;

			animationFrame = requestAnimationFrame(update);
		};

		window.addEventListener("resize", update);

		window.addEventListener("mousemove", onMouseMove);
		animationFrame = requestAnimationFrame(update);

		return () => {
			window.removeEventListener("resize", update);

			window.removeEventListener("mousemove", onMouseMove);
			cancelAnimationFrame(animationFrame);
			document.body.style.cursor = "none";
		};
	}, []);

	return (
		<div
			ref={m1Ref}
			className="primaryMouse"
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				pointerEvents: "none",
				width: "40px",
				height: "40px",
				zIndex: 9999,
			}}
		>
			<svg
				ref={svgRef}
				width="100%"
				height="100%"
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* <defs> are invisible element */}
				<defs>
					<path id="dot" d={pathDOT} />
					<path id="arrow" d={pathARROW} />
				</defs>

				{/* Visible element */}
				<path ref={pathRef} d={pathDOT} fill="#0F0F0F" stroke="#0F0F0F" />
			</svg>
		</div>
	);
};

export default Mouse;
