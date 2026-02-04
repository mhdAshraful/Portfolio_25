/*** Tools */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

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

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);
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
	const smoother = useRef();

	/** context usage */
	const { description, cornerH2 } = cornerDescription[currentSection];

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
	useEffect(() => {
		if (!loaded) return;

		/**
		 * Smooth Scroller ----- runs first
		 */
		smoother.current = ScrollSmoother.create({
			smooth: 0.4,
			effects: true,
			smoothTouch: 0.4,
			normalizeScroll: true, // Intercepts all scroll events for consistent behavior
			wrapper: "#smooth-wrapper",
			content: "#smooth-content",
		});

		return () => {
			if (smoother.current) {
				smoother.current.kill();
				smoother.current = null;
			}
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
			if (!experiencesRef.current || !contactRef.current) return;

			ScrollTrigger.create({
				// trigger: ".education",
				trigger: ".experiences",
				start: "top center",
				endTrigger: ".contact",
				end: "bottom bottom",
				onEnter: () => {
					setShowSocial(false);
					width < 768 && setShowCornerInfo(false);
				},
				onEnterBack: () => {
					setShowSocial(false);
					width < 768 && setShowCornerInfo(false);
				},
				onLeave: () => {
					setShowSocial(true);
					width < 768 && setShowCornerInfo(true);
				},
				onLeaveBack: () => {
					setShowSocial(true);
					width < 768 && setShowCornerInfo(true);
				},
			});
		},
		{ dependencies: [loaded], scope: main.current },
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
					width >= 768 ? setShowlogo(false) : null;
					setShowCornerInfo(false);
				},
				onEnterBack: () => {
					width >= 768 ? setShowlogo(false) : null;
					setShowCornerInfo(false);
				},
				onLeave: () => {
					width >= 768 ? setShowlogo(true) : null;
					width > 768 && setShowCornerInfo(true);
				},
				onLeaveBack: () => {
					width >= 768 ? setShowlogo(true) : null;
					width > 768 && setShowCornerInfo(true);
				},
			});
		},
		{ dependencies: [loaded], scope: main.current },
	);

	/***
	 * Continue previous
	 * */
	useLayoutEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
			ScrollTrigger.refresh();
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

	// ************ ********************** ************ ************ ********************** ************
	// ************ ********************** ************ ************ Main return satatement ************
	// ************ ********************** ************ ************ ********************** ************

	return !loaded ? (
		<Loading percent={percentLoading} />
	) : (
		<div ref={main} id="smooth-wrapper">
			{/* Only render Canvas on the home page */}
			{renderCanvas && <CanvasContainer />}

			{/* Mouse */}
			{/* {!touchDevice && <Mouse />} */}
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

			<div id="smooth-content" ref={contentRef} className="container_all">
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
