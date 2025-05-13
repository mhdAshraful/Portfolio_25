import React, { use, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin);

export const Logo = ({ show, minSCHeight = 400, minSCWidth = 300 }) => {
	const logoRef = useRef();
	const lineRef = useRef();
	const [hovered, setHovered] = useState(false);
	const [shouldRender, setShouldRender] = useState(show);

	/** Track Window Size */
	const [isVisibleByScreen, setIsisVisibleByScreen] = useState(() => {
		return window.innerHeight > minSCHeight && window.innerWidth > minSCWidth;
	});

	/** Handle Resize */
	useEffect(() => {
		const handleResize = () => {
			setIsisVisibleByScreen(
				window.innerHeight > minSCHeight && window.innerWidth > minSCWidth
			);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [minSCWidth, minSCHeight]);

	/** This will be used to triggar GSAP show/hide */
	useEffect(() => {
		if (show && isVisibleByScreen) {
			setShouldRender(true);
		}
	}, [show, isVisibleByScreen]);

	/**
	 * Logo Hide or Show animation
	 */
	useGSAP(
		() => {
			if (!logoRef.current) return;
			if (!show || !isVisibleByScreen) {
				gsap.to(logoRef.current, {
					y: 20,
					autoAlpha: 0,
					duration: 0.3,
					ease: "back.inOut",
					onComplete: () => setShouldRender(false),
				});
			} else {
				gsap.to(logoRef.current, {
					y: 0,
					autoAlpha: 1,
					duration: 0.3,
					ease: "back.inOut",
				});
			}
		},
		{ dependencies: [show, isVisibleByScreen] }
	);

	/***
	 * Logo Line hover animation
	 */
	useEffect(() => {
		if (!lineRef.current) return;
		const splited = new SplitText(lineRef.current, {
			type: "chars",
			charsClass: "chars",
		});

		const newP = SplitText.create("p", {
			type: "chars",
			charsClass: "chars",
		});
		newP.chars.forEach((char) => {
			gsap.set(char, { attr: { "data-content": char.innerHTML } });
		});

		lineRef.current.onpointermove = (e) => {
			newP.chars.forEach((char) => {
				const rect = char.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;
				const dx = e.clientX - centerX;
				const dy = e.clientY - centerY;

				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < 20) {
					gsap.to(char, {
						overwrite: true,
						duration: 1.2 - dist / 50,
						scrambleText: {
							text: char.dataset.content,
							chars: "\u03A6\u03A9\u03b9\u03B2\u03B4\u03BB\u03B3\u03C8\u03DF\u2116",
							speed: 0.6,
							// revealDelay: 0.2,
							// rightToLeft: true,
						},
						ease: "none",
					});
				}
			});
		};

		return () => splited.revert();
	}, [hovered]);

	if (!shouldRender) return null;

	return (
		<div
			ref={logoRef}
			className="logo_wrap"
			style={{ position: "fixed", top: 0, left: 0, zIndex: 100 }}
		>
			<div
				className="mylogo"
				onMouseOver={() => setHovered(true)}
				onMouseOut={() => setHovered(false)}
			>
				<div className="logo_Text">
					<p className="logo_T1" ref={lineRef}>
						Mohammed <br /> Ashraful Islam
					</p>
					<p className="logo_T2">full-stack Developer</p>
				</div>
			</div>
		</div>
	);
};
