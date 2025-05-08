/*** Tools */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { preloadAssets } from "./utils/preloadAssets";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { setCornerSectionName } from "./utils/animations";

/*** Data */
import Data from "./utils/info";
import { useSectionContext } from "./utils/SecitonContext.jsx";
import { cornerDescription } from "./utils/cornerDescription";

/*** R3F */
import CanvasContainer from "./immersive/Immersive";

/*** Components import */
import Loading from "./Loading";
import Mouse from "@cmpnnts/mouse";
import { MylogoWrap } from "@cmpnnts/MyLogo";
import Circles from "@cmpnnts/Circles";
import SocialMedia from "@cmpnnts/SocialMedia";
import Cornerinfo from "@cmpnnts/Cornerinfo";

/*** COMP as Page */
import Home from "@cmpnnts/Home";
import Contact from "@cmpnnts/Contact";
import Works from "@cmpnnts/Works";
import { Education, Focus, Interaction, UIEng, Web3d } from "@cmpnnts/UIEng";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);
/***
 * MAIN APP
 */
function App() {
	const [height, setHeight] = useState(window.innerHeight);
	const [percentLoading, setPercentage] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [showSocial, setShowSocial] = useState(true);
	const [showCornerInfo, setShowCornerInfo] = useState(true);
	const [showLogo, setShowlogo] = useState(true);
	const { sociallinks } = Data[4];
	const { twitter, linkedin, github } = sociallinks;
	const { currentSection, setCurrentSection } = useSectionContext();

	/***
	 * Component Refs
	 *
	 */
	const containerRef = useRef();
	const homeRef = useRef();
	const worksRef = useRef();
	const uiRef = useRef();
	const webglRef = useRef();
	const interactionRef = useRef();
	const focusRef = useRef();
	const educationRef = useRef();
	const contactRef = useRef();
	const cornerRef = useRef();
	const contentRef = useRef();
	const main = useRef();
	const smoother = useRef();

	useEffect(() => {
		const previouslyLoaded = localStorage.getItem("@mhdAshraful");
		if (previouslyLoaded) {
			setLoaded(true);
		} else {
			preloadAssets(setPercentage)
				.then(() => {
					setLoaded(true);
				})
				.catch((err) => {
					console.error("Error preloading assets:", err);
					setLoaded(true); // fallback to try to showing app anyway
				});
		}
	}, []);

	useGSAP(
		() => {
			if (!loaded) return;

			/**
			 * Smooth Scroller ----- runs first
			 */
			requestAnimationFrame(() => {
				smoother.current = ScrollSmoother.create({
					smooth: 2,
					// normalizeScroll: true,
					effects: true,
					wrapper: "#smooth-wrapper",
					content: "#smooth-content",
				});
			});

			/**
			 * Update Corner Section names to animate
			 * in corner component
			 */
			setCornerSectionName(
				[
					homeRef.current,
					uiRef.current,
					webglRef.current,
					interactionRef.current,
					focusRef.current,
					educationRef.current,
					worksRef.current,
					contactRef.current,
				],
				setCurrentSection
			);
		},
		{ dependencies: [loaded], scope: main }
	);

	/***
	 * Social Media (Vertical Icon) Controller
	 */
	useGSAP(
		() => {
			if (!educationRef.current || !contactRef.current) return;

			ScrollTrigger.create({
				trigger: ".education",
				start: "top 600px",
				endTrigger: ".contact",
				end: "bottom bottom",
				onEnter: () => {
					setShowSocial(false);
				},
				onEnterBack: () => {
					setShowSocial(false);
				},
				onLeave: () => {
					setShowSocial(true);
				},
				onLeaveBack: () => {
					setShowSocial(true);
				},
			});
		},
		{ dependencies: [loaded], scope: main.current }
	);
	/***
	 * Corner Info, Logo Controller for Contact Page
	 */
	useGSAP(
		() => {
			if (!contactRef.current) return;

			ScrollTrigger.create({
				trigger: ".contact",
				start: "top 95%",
				endTrigger: ".contact",
				end: "bottom bottom",
				onEnter: () => {
					setShowlogo(false);
					setShowCornerInfo(false);
				},
				onEnterBack: () => {
					setShowlogo(false);
					setShowCornerInfo(false);
				},
				onLeave: () => {
					setShowlogo(true);
					setShowCornerInfo(true);
				},
				onLeaveBack: () => {
					setShowlogo(true);
					setShowCornerInfo(true);
				},
			});
		},
		{ dependencies: [loaded], scope: main.current }
	);

	/***
	 * Continue previous
	 * */
	useLayoutEffect(() => {
		const handleResize = () => {
			setHeight(window.innerHeight);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const { description, cornerH2 } = cornerDescription[currentSection];

	return !loaded ? (
		<Loading percent={percentLoading} />
	) : (
		<>
			<CanvasContainer />

			<div ref={containerRef}>
				{/*  */}
				<Mouse />
				<MylogoWrap show={showLogo} />

				<Circles />
				{height > 800 && showSocial && (
					<SocialMedia
						twitter={twitter}
						linkedin={linkedin}
						github={github}
					/>
				)}
				{showCornerInfo && (
					<Cornerinfo
						ref={cornerRef}
						description={description}
						cornerH2={cornerH2}
					/>
				)}

				<div ref={main} id="smooth-wrapper">
					<div className="border">
						<div
							id="smooth-content"
							ref={contentRef}
							className="container_all"
						>
							<Home ref={homeRef} />
							<UIEng ref={uiRef} />
							<Web3d ref={webglRef} />
							<Interaction ref={interactionRef} />
							<Focus ref={focusRef} />
							<Education ref={educationRef} />
							<Works ref={worksRef} />
							<Contact ref={contactRef} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
