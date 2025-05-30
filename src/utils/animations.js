import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
			end: "bottom 70%",
			markers: false,
			scrub: 1,
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
