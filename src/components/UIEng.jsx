import React, { forwardRef, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Data from "../utils/info";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDomElmPositions } from "../utils/animations";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const UIEng = forwardRef((props, ref) => {
	const { ui } = Data[1].about;
	const uiRef = useRef();

	useDomElmPositions(uiRef, "ui");

	useGSAP(
		() => {
			gsap.to(".img5 img", {
				rotation: 360,
				duration: 2,
				ease: "none",
				scrollTrigger: {
					trigger: ".img5",
					start: "top bottom",
					end: "bottom top",
					scrub: true,
					// scroller: "#smooth-wrapper",
				},
			});

			gsap.utils.toArray(".anim").forEach((elm) => {
				gsap.to(elm, {
					opacity: 0,
					xPercent: () =>
						-(
							document.querySelector(".middle").scrollWidth -
							window.innerWidth
						),
					duration: 0.6,
					ease: "sine.inOut",
					stagger: 0.2,
					scrollTrigger: {
						trigger: ".middle",
						start: "top 40px",
						end: "bottom top",
						scrub: true,
						// scroller: "#smooth-wrapper",
					},
				});
			});
		},
		{ scope: uiRef.current },
	);

	return (
		<div data-section="ui" className="ui_wrapper snapper" ref={ref}>
			<section ref={uiRef} className="ui">
				<h2 className="title_top anim">What I bring to the table?</h2>
				<div className="middle ">
					<h1 className="title anim">{ui.title}</h1>
					<MobileInterface urls={ui.mobile} />
				</div>

				<div className="img3">
					<img className=" anim" src={ui.img2} alt="half star" />
				</div>
				<div className="img4">
					<img className=" anim" src={ui.img3} alt="corner star" />
				</div>
				<div className="img5">
					<img className=" anim" src={ui.img1} alt="full star" />
				</div>
			</section>
		</div>
	);
});

export const Web3d = forwardRef((props, ref) => {
	const { webgl } = Data[1].about;
	const webglRef = useRef();

	return (
		<div data-section="webgl" className="webgl_wrapper" ref={ref}>
			<section ref={webglRef} className="webgl">
				{/* Content overlay - Canvas is rendered globally via Immersive.jsx */}
				<div className="middle">
					<h1 className="title">{webgl.title}</h1>
				</div>
			</section>
		</div>
	);
});

export const Interaction = forwardRef((props, ref) => {
	const { interaction } = Data[1].about;
	const interactionRef = useRef();
	useDomElmPositions(interactionRef, "interaction");
	return (
		<div
			data-section="interaction"
			className="interaction_wrapper snapper"
			ref={ref}
		>
			<section ref={interactionRef} className="interaction">
				<div className="middle">
					<h1 className="title">{interaction.title}</h1>
				</div>
			</section>
		</div>
	);
});

/***
 * FOCUS
 */

export const Focus = forwardRef((props, ref) => {
	const { focus } = Data[1].about;
	const { title } = focus;

	const focusRef = useRef();
	const lineRef = useRef(null);
	const splitedText = useRef(null);

	const vowelChars = useRef([]);

	useGSAP(() => {
		if (!props.loaded) return;

		document.fonts.ready.then(() => {
			splitedText.current = new SplitText(lineRef.current, {
				type: "chars, words",
				charsClass: "chars",
				wordsClass: "words",
				tag: "span",
			});

			const allChars = splitedText.current.chars;
			vowelChars.current = allChars.filter((char) =>
				/[aeiuAEIU]/.test(char.textContent),
			);

			gsap.set(allChars, { fontStyle: "normal", fontWeight: 100 });

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: lineRef.current,
					start: "top 40%",
					once: false, // run only once
				},
			});
			tl.to(allChars, {
				duration: 0.4,
				fontVariationSettings: "'wght' 400",
				ease: "power2.inOut",
			})
				.to(allChars, {
					duration: 0.4,
					fontVariationSettings: "'wght' 100",
					ease: "power2.inOut",
				})
				.to(allChars, {
					duration: 0.5,
					fontVariationSettings: "'wght' 1000",
					ease: "power2.inOut",
				})
				.to(vowelChars.current, {
					delay: 0.4, // delay after font weight changes
					duration: 0.6,
					fontStyle: "italic",
					stagger: 0.03,
					ease: "power2.inOut",
				});
		});

		return () => {
			if (splitedText.current) splitedText.current.revert();
		};
	}, []);

	return (
		<div data-section="focus" className="focus_wrapper snapper" ref={ref}>
			<section ref={focusRef} className="focus">
				<div className="imag_contain">
					<img src={focus.img} alt="one quote svg" />
				</div>
				<h1 className="title" ref={lineRef}>
					{title}
					{"\u201D"}
				</h1>
				<p className="reference">{focus.reference}</p>
			</section>
		</div>
	);
});

/***
 * EDUCATION
 */

export const Education = forwardRef((props, ref) => {
	const { education } = Data[1].about;
	const { title } = education;
	const { maincourse, othercourse } = education;
	const tooltipRef = useRef();
	const [tooltip, showtooltip] = useState(false);
	const [SRtooltip, setSRtooltip] = useState(false);
	const eduRef = useRef();
	const lineRef = useRef();
	const splited = useRef(null);
	const italicChar = useRef([]);
	const allLinesRef = useRef(null);
	useGSAP(() => {
		if (!props.loaded) return;

		document.fonts.ready.then(() => {
			splited.current = new SplitText(lineRef.current, {
				type: "chars",
				charsClass: "chars",
			});

			const allchar = splited.current.chars;
			italicChar.current = allchar.filter((char) =>
				/[dctnDCTN]/.test(char.textContent),
			);

			gsap.set(allchar, { fontStyle: "normal", fontWeight: 1000 });

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: lineRef.current,
					start: "top center",
				},
			});

			tl.to(italicChar.current, {
				duration: 0.5,
				fontStyle: "italic",
				stagger: 0.5,
				ease: "power1.inOut",
			});
		});
		return () => {
			if (splited.current) splited.current.revert();
		};
	}, []);

	useLayoutEffect(() => {
		if (!props.loaded) return;
		document.fonts.ready.then(() => {
			const domEl = document.querySelectorAll("td");
			allLinesRef.current = new SplitText(domEl, {
				type: "lines",
				linesClass: "lines",
			});

			// console.log("->>>>>>>", allLinesRef.current);

			const tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: lineRef.current,
					start: "top center",
				},
			});

			tl2.from(allLinesRef.current.lines, {
				yPercent: 50,
				opacity: 0,
				duration: 0.5,
				stagger: 0.06,
			});
		});

		return () => {
			if (allLinesRef.current) allLinesRef.current.revert();
		};
	}, [props.loaded]);

	/***
	 * Tooltop animating in and out
	 */
	useLayoutEffect(() => {
		if (tooltip) {
			setSRtooltip(true);
		} else if (tooltipRef.current) {
			// Animate out before unmounting
			gsap.to(tooltipRef.current, {
				scale: 0,
				duration: 0.3,
				ease: "back.inOut",
				onComplete: () => {
					setSRtooltip(false); // unmount after animation
				},
			});
		}
	}, [tooltip]);

	useLayoutEffect(() => {
		if (tooltip && tooltipRef.current)
			gsap.fromTo(
				tooltipRef.current,
				{ scale: 0 },
				{
					scale: 1,
					duration: 0.4,
					ease: "back.inOut",
				},
			);
	}, [tooltip]);

	return (
		<div
			data-section="education"
			className="education_wrapper snapper"
			ref={ref}
		>
			<section ref={eduRef} className="education">
				<h1 className="title" ref={lineRef}>
					{title}
				</h1>

				{/* create a dynamic svg book shelf element  */}
				{/* Example SVG Book Shelf */}

				<div className="books_self">
					<div className="book">
						<img
							src="/assets/images/books.webp"
							alt="picture of a book self"
						/>
						<hr className="bar" />
					</div>
				</div>

				{props.width > 768 ? (
					<div className="table">
						<table className="course-table">
							<tbody>
								{Object.entries(maincourse).map(([key, value]) => (
									<tr className="mainCourse" key={key}>
										<td className="year">{value.year}</td>
										<td className="provider">{value.provider}</td>
										<td id={`course_${key}`}>{value.cert}</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className="shortTitle">
							<hr className="middleBar" />
							<p>Skill Development Courses </p>
						</div>
						<table className="other-course-table">
							<tbody>
								{Object.entries(othercourse).map(([key, value]) => (
									<tr className="otherCourse" key={key}>
										<td className="year" colSpan="1"></td>
										<td className="provider_2">{value.provider}</td>
										<td className="course_online">{value.cert}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="table">
						<table className="mbl_tbl">
							<tbody>
								{Object.entries(maincourse).map(([key, val]) => (
									<tr className="mbl_main" key={key}>
										<td>
											<p className="provider">{val.provider}</p>
											<span id={`cert_${key}`}>{val.cert}</span>
										</td>
									</tr>
								))}

								{Object.entries(othercourse).map(([key, val]) => (
									<tr key={key} className="mbl_other">
										<td>
											<p className="provider">{val.provider}</p>
											<span className="cert">{val.cert}</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				<div
					className="bookImage"
					onMouseEnter={() => showtooltip(true)}
					onMouseLeave={() => showtooltip(false)}
				>
					{SRtooltip && (
						<div className="tooltip" ref={tooltipRef}>
							<img
								src={"assets/images/tooltip.svg"}
								alt="image saying books i enjoyed reading"
							/>
						</div>
					)}

					<img src="/assets/images/b3.webp" alt="bookImages" />
				</div>
			</section>
		</div>
	);
});

/***
 * Mobile Interface animated
 * */

const MobileInterface = ({ urls }) => {
	return (
		<div className="iphone anim">
			<img src={urls} alt="iphone svg" />
		</div>
	);
};
