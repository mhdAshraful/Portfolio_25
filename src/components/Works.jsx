import React, { forwardRef, useRef } from "react";
import Data from "../utils/info";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router";
import { useR3fCanvasContext } from "../utils/SecitonContext";
gsap.registerPlugin(useGSAP);

const Works = forwardRef((props, ref) => {
	const workref = useRef();
	const titleRef = useRef();
	const boxRef = useRef();

	const { setRenderCanvas } = useR3fCanvasContext();
	const { title, works } = Data[2].myworks;
	const navigate = useNavigate();
	/**
	 * Navigate to details page
	 */
	const handleClick = (elm) => {
		const typeKey = elm.worktype;
		/**
		 * Clear WebGL context by removing canvas elements
		 */
		setRenderCanvas(false);
		setTimeout((e) => {
			// Use navigate instead of modifying window.location directly
			navigate(`/works/${typeKey}`);
			console.log("timing");
		}, 500);
	};

	/***
	 * NUmber and Headline Animaiton
	 */
	useGSAP(
		() => {
			const boxes = gsap.utils.toArray(".work_box");
			const width = window.innerWidth;
			if (width >= 768) {
				boxes.forEach((box) => {
					const num = box.querySelector(".num");
					const headline = box.querySelector(".marq_track");
					const width = headline.getBoundingClientRect().width;

					let marqueeTweens = gsap.core.Tween;

					/***
					 *
					 * Mouse Enter
					 *
					 * */
					const handleEnter = () => {
						const tl = gsap.timeline({
							defaults: {
								duration: 0.3,
								ease: "back.inOut",
							},
						});

						tl.set(box, { backgroundColor: "#fafad2" })
							.to(num, { y: "10px", opacity: 0 })
							.to(headline, {
								y: "-30%",
								fontSize: "100px",
							});

						const distance = width * 2;
						/** set positon to zero */
						gsap.set(headline, { x: 0 });
						marqueeTweens = gsap.to(headline, {
							x: `-=${distance}px`,
							duration: 6,
							delay: 0.2,
							ease: "none",
							modifiers: {
								x: gsap.utils.unitize((x) => parseFloat(x) % distance),
							},
							repeat: -1,
						});
					};

					/***
					 *
					 * Mouse Exit
					 *
					 */
					const handleExit = () => {
						const tl = gsap.timeline({
							defaults: {
								duration: 0.3,
								ease: "back.inOut",
							},
						});

						/** Show number */

						tl.set(box, { backgroundColor: "#fffff2" })
							.to(num, { opacity: 1, y: 0 })
							.to(headline, {
								fontSize: "20px",
							});

						if (marqueeTweens) {
							marqueeTweens.kill();
							gsap.set(headline, { x: 0 });
						}
					};

					box.addEventListener("mouseenter", () => handleEnter());
					box.addEventListener("mouseleave", () => handleExit());

					return () => {
						box.removeEventListener("mouseenter", () => handleEnter);
						box.removeEventListener("mouseenter", () => handleExit);
					};
				});
			}
		},
		{ scope: workref.current }
	);

	/***
	 *  Coloring My Work
	 */
	const highlightedWord = title.split(" ").map((word, i) => {
		const isHWord = word === "My" || word === "Work";
		return (
			<span
				key={i}
				style={{
					color: isHWord ? "var(--red)" : "var(--black)",
				}}
			>
				{word}{" "}
			</span>
		);
	});

	return (
		<section
			ref={ref}
			data-section="myworks"
			className="works_container snapper"
		>
			<div className="works" ref={workref}>
				<div className="title_container">
					<h1 className="title" ref={titleRef}>
						{highlightedWord}
					</h1>
					<div className="imagebox">
						<img src="/assets/images/arrow.png" />
					</div>
				</div>

				<div className="work_list">
					{works.map((elm, index) => (
						<div
							key={index}
							id={`item_${index}`}
							ref={boxRef}
							className="work_box"
							onClick={() => handleClick(elm)}
						>
							<div className="box_heading">
								<p className="num">0{index + 1}</p>

								{/* marquee animated headline */}
								<div className="marq_wrap">
									<div className="marq_track">
										<h2 className="headline">{elm.type}</h2>
										<h2 className="headline dup">{elm.type}</h2>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
});

export default Works;
