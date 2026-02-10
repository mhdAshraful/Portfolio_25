/*** Tools */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*** Data */
import Data from "./utils/info";
import {
	useSectionContext,
	useOverlayContext,
	useR3fCanvasContext,
} from "./utils/SecitonContext.jsx";
import { cornerDescription } from "./utils/cornerDescription";

/*** R3F */
import CanvasContainer from "./immersive/Immersive";

/*** Components import */
import Loading from "./Loading";
import Mouse from "@cmpnnts/Mouse";
import { Logo } from "@cmpnnts/TextBrand";
import Circles from "@cmpnnts/Circles";
import SocialMedia from "@cmpnnts/SocialMedia";
import Cornerinfo from "@cmpnnts/Cornerinfo";
import MenuOverlay from "@cmpnnts/MenuOverlay";

/*** COMP as Page */
import Home from "@cmpnnts/Home";
import Contact from "@cmpnnts/Contact";
import Works from "@cmpnnts/Works";
import { Education, Focus, Interaction, UIEng, Web3d } from "@cmpnnts/UIEng";
import Experiences from "@cmpnnts/Experiences";

/** Functions or hooks */
import { preloadAssets } from "./utils/preloadAssets";
import { setCornerSectionName } from "./utils/animations";

import { useLocation, useNavigate } from "react-router";
import { useTouchDevice } from "./utils/deviceDetector";

import Lenis from "lenis";
gsap.registerPlugin(useGSAP, ScrollTrigger);
/***
 * MAIN APP
 */
function App() {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [percentLoading, setPercentage] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [showSocial, setShowSocial] = useState(true);
	const [showCornerInfo, setShowCornerInfo] = useState(true);
	const [showLogo, setShowlogo] = useState(true);
	const { sociallinks } = Data[4];
	const { twitter, linkedin, github } = sociallinks;
	const { currentSection, setCurrentSection } = useSectionContext();
	const { renderCanvas } = useR3fCanvasContext();
	const { shouldRenderModal, setShouldRenderModal, ViewModal } =
		useOverlayContext();
	// console.log("canvas contest:", renderCanvas);

	/***
	 * Component Refs
	 *
	 */
	const menupageRef = useRef();
	const homeRef = useRef();
	const worksRef = useRef();
	const uiRef = useRef();
	const webglRef = useRef();
	const interactionRef = useRef();
	const focusRef = useRef();
	const educationRef = useRef();
	const experiencesRef = useRef();

	const contactRef = useRef();
	const cornerRef = useRef();
	const contentRef = useRef();
	const main = useRef();
	// const smoother = useRef();

	/** context usage */
	const { description, cornerH2 } = cornerDescription[currentSection];

	const isTouchDevice = useTouchDevice();

	/**
	 * ROUTE URL Update
	 */
	const navgate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/" && currentSection) {
			navgate(`#${currentSection}`, { replace: true });
		}
	}, [currentSection, location.pathname, navgate]);

	/**
	 * Local Storage Check
	 */
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

	useEffect(() => {
		if (!loaded) return;
		if (ScrollTrigger.isTouch) {
			document.body.classList.add("touch");
			ScrollTrigger.refresh();
		} else {
			document.body.classList.remove("touch");
			ScrollTrigger.refresh();
		}
	}, [loaded]);

	/**
	 * Smooth Scroll
	 */
	// useEffect(() => {
	// 	if (!loaded) return;

	// 	/**
	// 	 * Smooth Scroller ----- runs first
	// 	 */
	// 	smoother.current = ScrollSmoother.create({
	// 		smooth: 0.2,
	// 		effects: true,
	// 		smoothTouch: 0.5,
	// 		normalizeScroll: true, // Intercepts all scroll events for consistent behavior
	// 		wrapper: "#smooth-wrapper",
	// 		content: "#smooth-content",
	// 	});

	// 	return () => {
	// 		if (smoother.current) {
	// 			smoother.current.kill();
	// 			smoother.current = null;
	// 		}
	// 	};
	// }, [loaded]);

	useEffect(() => {
		if (!loaded) return;

		const lenis = new Lenis({
			smooth: true,
			lerp: 0.08, // smoothness (lower = smoother)
			wheelMultiplier: 1,
			touchMultiplier: 1,
			smoothTouch: false,
		});

		const raf = (time) => {
			lenis.raf(time);
			requestAnimationFrame(raf);
		};
		requestAnimationFrame(raf);

		// Sync Lenis with GSAP ScrollTrigger
		lenis.on("scroll", ScrollTrigger.update);
		ScrollTrigger.scrollerProxy(document.body, {
			scrollTop(value) {
				return arguments.length
					? lenis.scrollTo(value, { immediate: true })
					: lenis.scroll;
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
			pinType: document.body.style.transform ? "transform" : "fixed",
		});

		ScrollTrigger.refresh();

		return () => {
			lenis.destroy();
		};
	}, [loaded]);

	useGSAP(
		() => {
			if (!loaded) return;

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
					experiencesRef.current,
					contactRef.current,
				],
				setCurrentSection,
			);
		},
		{ dependencies: [loaded], scope: main },
	);

	/***
	 * Social Media (Vertical Icon) Controller
	 */
	useGSAP(
		() => {
			if (!main.current) return;

			const trigger = ScrollTrigger.create({
				trigger: ".education",
				start: "top top",
				endTrigger: ".myworks",
				end: "top top",
				onEnter: () => {
					setShowSocial(false);
					if (width >= 768) setShowCornerInfo(false);
				},
				onEnterBack: () => {
					setShowSocial(true);
					if (width >= 768) setShowCornerInfo(true);
				},
			});

			return () => trigger.kill();
		},
		{ dependencies: [width, loaded], scope: main.current },
	);
	/***
	 * Corner Info, Logo Controller for Contact Page
	 */
	useGSAP(
		() => {
			if (!contactRef.current) return;

			const trigger = ScrollTrigger.create({
				trigger: ".contact",
				start: "top 10%",
				end: "bottom 90%",
				onEnter: () => {
					if (width >= 768) setShowlogo(false);
					setShowCornerInfo(false);
				},
				onLeaveBack: () => {
					if (width >= 768) setShowlogo(true);
					setShowCornerInfo(true);
				},
			});

			return () => trigger.kill();
		},
		{ dependencies: [width, loaded], scope: main.current },
	);

	/***
	 * Continue previous
	 * */
	useLayoutEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
			// ScrollTrigger.refresh();
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// This extra check is to make sure that view model is there to animate out
	useEffect(() => {
		if (ViewModal) {
			setShouldRenderModal(ViewModal);
		}
	}, [ViewModal, setShouldRenderModal]);

	return !loaded ? (
		<Loading percent={percentLoading} />
	) : (
		<div ref={main}>
			{/* Only render Canvas on the home page */}
			{renderCanvas && <CanvasContainer />}

			{/* Mouse */}
			{!isTouchDevice && <Mouse />}
			{/* LOGO */}
			<Logo show={showLogo} />

			{/* Menu Circles */}
			<Circles />

			{/* Menu Overlay */}
			{shouldRenderModal && (
				/* Only mount when needed */
				<MenuOverlay
					ref={menupageRef}
					twitter={twitter}
					linkedin={linkedin}
					github={github}
				/>
			)}

			{/* Corner Info */}
			{showCornerInfo && (
				<Cornerinfo
					ref={cornerRef}
					description={description}
					cornerH2={cornerH2}
				/>
			)}

			{width > 768 && height > 800 && showSocial && (
				<SocialMedia
					twitter={twitter}
					linkedin={linkedin}
					github={github}
				/>
			)}

			{/* 
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                 All Content                                                 │
  └─────────────────────────────────────────────────────────────────────────────┘
 */}
			<div ref={contentRef} className="container_all">
				<Home ref={homeRef} id="home" />
				<UIEng ref={uiRef} id="ui" />
				<Web3d ref={webglRef} id="webgl" />
				<Interaction
					ref={interactionRef}
					loaded={loaded}
					id="interaction"
				/>
				<Focus ref={focusRef} loaded={loaded} width={width} id="focus" />
				<Education
					ref={educationRef}
					loaded={loaded}
					id="education"
					width={width}
				/>
				<Works ref={worksRef} loaded={loaded} id="works" />

				<Experiences ref={experiencesRef} id="experience" />
				{/* <Timeline ref={timelineRef} loaded={loaded} /> */}
				<Contact ref={contactRef} loaded={loaded} id="contact" />
			</div>
		</div>
	);
}

export default App;
