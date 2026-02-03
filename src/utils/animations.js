import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useLayoutTrackerContext } from "./SecitonContext";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Clear all previous ScrollTriggers first to avoid stacking if hot reloading
ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

export const setCornerSectionName = (refs, setCurrentSection) => {
	// console.log("called in animation.js", refs);

	refs.forEach((elm) => {
		const id = elm.dataset.section;
		// console.log("animation js:", id);

		ScrollTrigger.create({
			trigger: elm,
			/*** ScrollTrigger Scroller Mismatch
			 * once ScrollSmoother is active, GSAP hijacks the scroll
			 * container, and the actual scroller becomes #smooth-wrapper,
			 * with scrolling managed via ScrollSmoother.
			 *
			 * so commiting out scroller now
			 */
			// scroller: document.querySelector(".container_all"),
			start: "top 40%",
			end: "bottom 50%",
			markers: false,
			// scrub: 1,
			onEnter: () => {
				// console.log("entry");
				setCurrentSection(id);
			},
			onEnterBack: () => {
				// console.log("back");
				setCurrentSection(id);
			},
		});
	});
};

/***
 * ********* UpdateXY for immersive.js
 */

export const useDomElmPositions = (ref, key) => {
	const { updateDomElmPos } = useLayoutTrackerContext();
	const prev = useRef({ x: null, y: null });
	let frameId;

	useEffect(() => {
		const updateXY = () => {
			if (ref.current) {
				const elm = ref.current;
				const rect = elm.getBoundingClientRect();

				const newX = rect.left + window.scrollX;
				const newY = rect.top + window.scrollY;

				if (prev.current.x !== newX || prev.current.y !== newY) {
					prev.current = { x: newX, y: newY };
					updateDomElmPos(key, { left: newX, top: newY });
				}
			}
			frameId = requestAnimationFrame(updateXY);
		};
		updateXY();
		return () => cancelAnimationFrame(frameId);
	}, [ref, key, updateDomElmPos]);
};
