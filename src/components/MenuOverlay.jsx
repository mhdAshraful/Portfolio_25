import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { forwardRef, useEffect, useRef } from "react";
import { useOverlayContext } from "../utils/SecitonContext";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useLocation } from "react-router";

gsap.registerPlugin(MorphSVGPlugin);
/**
 * In and Out animation is handled in Circles.jsx
 * Follow Up animations are here.
 */

const MenuOverlay = forwardRef((props, ref) => {
	const menuRef = useRef();
	const pathRef = useRef();

	const { setShouldRenderModal, ViewModal, setViewModal } =
		useOverlayContext();

	let smoother = ScrollSmoother.get();

	const handleClick = (e) => {
		// console.log("e.target", e.target);
		// console.log("e.target.dataset.dest:", e.target.dataset.dest);
		const dest = e.target.dataset.dest;
		smoother.scrollTo(`.${dest}`, true, "top 100px");
		setViewModal(false);
	};

	/*** Highlight Current Section */
	const location = useLocation();
	const currentHash = location.hash.replace("#", "");

	const initialPath = `M 0 0
					L ${window.innerWidth} 0
					Q ${window.innerWidth / 2} 0 0 0Z`;

	const curvDown = `M 0 0
					L ${window.innerWidth} 0
					Q ${window.innerWidth / 2} 400 0 0
					L 0 0Z`;

	useEffect(() => {
		if (!pathRef.current || !menuRef.current) return;

		const elms = document.querySelectorAll(".item");
		if (ViewModal) {
			/***
			 *
			 * ****** Animate IN
			 */
			gsap.fromTo(
				menuRef.current,
				{
					yPercent: -100,
					y: -400,
					visibility: "hidden",
				},
				{
					yPercent: 0,
					y: 0,
					visibility: "visible",
					duration: 1.2,
					ease: "power2.inOut",
					onStart: () => {
						gsap.set(pathRef.current, { attr: { d: initialPath } }); // set to zero
						// start path anim
						gsap.to(pathRef.current, {
							yPercent: "100%",
							attr: { d: curvDown },
							duration: 1.2,
							ease: "power2.inOut",
							onStart: () => {
								// set link to zeo pos
								gsap.set(elms, { opacity: 0, y: "100%" });
							},
							onComplete: () => {
								// after svg path anim complete set path to zero again
								gsap.set(pathRef.current, {
									attr: { d: initialPath },
								});
								// then fade in links
								gsap.to(elms, {
									y: 0,
									opacity: 1,
									stagger: 0.1,
									duration: 0.5,
									ease: "back.inOut",
								});
							},
						});
					},
				}
			);
		} else {
			/***
			 *
			 * ****** Animate OUT
			 */
			gsap.to(menuRef.current, {
				yPercent: -100,
				y: -400,
				duration: 1.8,
				ease: "power2.inOut",
				onStart: () => {
					gsap.set(pathRef.current, { attr: { d: initialPath } }); // set to zero
					gsap.to(elms, {
						y: "-50%",
						opacity: 0,
						stagger: 0.2,
						duration: 1,
						ease: "back.inOut",
					});
					gsap.to(pathRef.current, {
						attr: { d: curvDown },
						yPercent: "-100%",
						duration: 1.8,
						ease: "power2.inOut",
					});
				},
				onComplete: () => {
					// console.log("before animation,", shouldRenderModal);
					// console.log("completed animation");
					gsap.set(pathRef.current, { attr: { d: initialPath } });
					gsap.set(menuRef.current, { visibility: "hidden" });
					setShouldRenderModal(false);
				},
			});
		}
	}, [ViewModal]);

	return (
		<div ref={ref}>
			<div className="menu" ref={menuRef}>
				<div className="listings">
					<div className="items_list">
						<p
							className={`item ${
								currentHash === "home" ? "highlighted" : ""
							}`}
							data-dest="home"
							onClick={(e) => handleClick(e)}
						>
							Home<sup className="superscript">1</sup>
						</p>
						<p
							className={`item ${
								currentHash === "ui" ? "highlighted" : ""
							}`}
							data-dest="ui"
							onClick={(e) => handleClick(e)}
						>
							About me<sup className="superscript">2</sup>
						</p>
						<p
							className={`item ${
								currentHash === "myworks" ? "highlighted" : ""
							}`}
							data-dest="myworks"
							onClick={(e) => handleClick(e)}
						>
							My Projects<sup className="superscript">3</sup>
						</p>
						<p
							className={`item ${
								currentHash === "contact" ? "highlighted" : ""
							}`}
							data-dest="contact"
							onClick={(e) => handleClick(e)}
						>
							Contact me
							<sup className="superscript" id="star">
								*
							</sup>
						</p>
					</div>
					<div className="secondaryItems_list">
						<div className="inpageLinks">
							<p
								onClick={(e) => handleClick(e)}
								data-dest="interaction"
								className={"item"}
							>
								User Interaction
							</p>
							<p
								onClick={(e) => handleClick(e)}
								data-dest="webgl"
								className={"item"}
							>
								Immersive Playground
							</p>
							<p
								onClick={(e) => handleClick(e)}
								data-dest="focus"
								className={"item"}
							>
								My Approach
							</p>
							<p
								onClick={(e) => handleClick(e)}
								data-dest="education"
								className={"item"}
							>
								My Education
							</p>
							{/* add later */}
							<p
								onClick={(e) => handleClick(e)}
								data-dest="experiences"
								className={"item"}
							>
								Experiences
							</p>
						</div>
						<div className="social_item item">
							<p className="social">Social Links</p>
							<div className="social_links">
								<a
									href={props.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="urls"
								>
									<img
										src="/assets/images/linkedin.svg"
										alt="linkein icon"
									/>
								</a>
								<a
									href={props.twitter}
									target="_blank"
									rel="noopener noreferrer"
									className="urls"
								>
									<img
										src="/assets/images/twitter.svg"
										alt="twitter icon"
									/>
								</a>
								<a
									href={props.github}
									target="_blank"
									rel="noopener noreferrer"
									className="urls"
								>
									<img
										src="/assets/images/github.svg"
										alt="github icon"
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
				<svg className="overlay_svg">
					<path ref={pathRef} fill="#ed3203" />
				</svg>
			</div>
		</div>
	);
});
export default MenuOverlay;
