import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import React, { useLayoutEffect, useRef } from "react";
gsap.registerPlugin(CustomEase);

/***
 * 	1. Log both target and current every frame.
 * 	2. See which one updates instantly vs slowly.
 * 	3. Adjust your lerp accordingly.
 *
 * "Mouse moves instantly" → It’s the "user’s input" → this is your target.
 * "Element takes time to move" → this is the current.
 */

const Mouse = () => {
	const m1Ref = useRef(null); // this will our current mouse position because it has to follow up
	const target = useRef({ x: 0, y: 0, width: 40, height: 40 }); // thi will bw updated instantly from user mouse move
	const current = useRef({ x: 0, y: 0, width: 0, height: 0 }); // this will be updated slowly from the element position

	useLayoutEffect(() => {
		if (!m1Ref.current) return;

		const handleMouseMove = (event) => {
			/** Element's width (current) */
			const { width, height } = m1Ref.current.getBoundingClientRect();
			target.current.x = event.clientX - width / 2; // getting target mouseX position from user Input
			target.current.y = event.clientY - height / 2; // getting target mouseY position from user Input

			/***
			 * But lest just check out GSAP backInOut
			 * 1. Import GSAP
			 * 2. Use gsap.to() for smoother animations
			 * 3. Adjust the animation parameters as needed
			 */

			gsap.to(current.current, {
				x: target.current.x,
				y: target.current.y,
				duration: 0.5,
				onUpdate: () => {
					const dx = current.current.x - target.current.x;
					const dy = current.current.y - target.current.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					const minScale = 0.2;
					const maxScale = 1;
					const maxDistance = 400;

					const scale = Math.min(
						maxScale,
						Math.max(minScale, 1 - distance / maxDistance)
					);

					m1Ref.current.style.transform = `
          translate3d(${current.current.x}px, ${current.current.y}px, 0) 
          `;

					m1Ref.current.style.width = `${scale * 52}px`;
					m1Ref.current.style.height = `${scale * 52}px`;
				},
				ease: CustomEase.create("custom", "M0,0 C0,0.599 0.82,1.182 1,1 "),
			});
		};

		/***
		 * PERFECT
		 */
		// let animateID;
		// const animate = () => {
		// 	current.current.x = lerp(current.current.x, target.current.x, 0.1);
		// 	current.current.y = lerp(current.current.y, target.current.y, 0.1);
		// 	m1Ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
		// 	animateID = requestAnimationFrame(animate);
		// };

		window.addEventListener("mousemove", handleMouseMove);
		// animate();
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			// cancelAnimationFrame(animateID);
		};
	}, []);
	return <div className="primaryMouse" ref={m1Ref}></div>;
};

export default Mouse;
