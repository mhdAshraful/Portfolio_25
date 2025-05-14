/*** Tools */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/*** Data */
import Data from "./utils/info";
import { useSectionContext } from "./utils/SecitonContext.jsx";
import { cornerDescription } from "./utils/cornerDescription";

/*** R3F */
import CanvasContainer from "./immersive/Immersive";

/*** Components import */
import Loading from "./Loading";
import Mouse from "@cmpnnts/Mouse";
import { Logo } from "@cmpnnts/MyLogo";
import Circles from "@cmpnnts/Circles";
import SocialMedia from "@cmpnnts/SocialMedia";
import Cornerinfo from "@cmpnnts/Cornerinfo";

/*** COMP as Page */
import Home from "@cmpnnts/Home";
import Contact from "@cmpnnts/Contact";
import Works from "@cmpnnts/Works";
import { Education, Focus, Interaction, UIEng, Web3d } from "@cmpnnts/UIEng";

/** Functions or hooks */
import { preloadAssets } from "./utils/preloadAssets";
import { setCornerSectionName } from "./utils/animations";
import { useTouchDevice } from "./utils/deviceDetector";
import { replace, useLocation, useNavigate } from "react-router";

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

	/**
	 * ROUTE URL Update
	 */
	const navgate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/" && currentSection) {
			navgate(`#${currentSection}`, { replace: true });
		}
	}, [currentSection]);

	/**
	 * Local Storage Check
	 */
	useEffect(() => {
		const previouslyLoaded = localStorage.getItem("@mhdAshraful");
		if (previouslyLoaded) {
			console.log("useeffect--1: localstorage", loaded);
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

	/**
	 * MOBILE check
	 */
	const touchDevice = useTouchDevice();

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
		console.log("useeffect--3: smooth scroll", loaded);
		smoother.current = ScrollSmoother.create({
			smooth: 1.5,
			effects: true,
			smoothTouch: true,
			wrapper: "#smooth-wrapper",
			content: "#smooth-content",
		});
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
					width < 768 && setShowCornerInfo(false);
				},
				onEnterBack: () => {
					setShowSocial(false);
					width < 768 && setShowCornerInfo(false);
				},
				onLeave: () => {
					setShowSocial(true);
					console.log("on leave", width);
					width < 768 && setShowCornerInfo(true);
				},
				onLeaveBack: () => {
					setShowSocial(true);
					console.log("on leave", width);
					width < 768 && setShowCornerInfo(true);
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
		{ dependencies: [loaded], scope: main.current }
	);

	/***
	 * Continue previous
	 * */
	useLayoutEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
			console.log("useLayoutEffect--4: height", height, width);
			ScrollTrigger.refresh();
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
				<div ref={main} id="smooth-wrapper">
					{/* Use Mouse if not touch device */}
					{!touchDevice && <Mouse />}

					{/* LOGO */}

					<Logo show={showLogo} />

					<Circles />

					{width > 768 && height > 800 && showSocial && (
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

					<div className="border">
						<span className="hiderBar" />
						<div
							id="smooth-content"
							ref={contentRef}
							className="cont	ainer_all"
						>
							<Home ref={homeRef} id="home" />
							<UIEng ref={uiRef} id="ui" />
							<Web3d ref={webglRef} id="webgl" />
							<Interaction
								ref={interactionRef}
								loaded={loaded}
								id="interaction"
							/>
							<Focus
								ref={focusRef}
								loaded={loaded}
								width={width}
								id="focus"
							/>
							<Education
								ref={educationRef}
								loaded={loaded}
								id="education"
								width={width}
							/>
							<Works ref={worksRef} loaded={loaded} id="works" />
							<Contact ref={contactRef} loaded={loaded} id="contact" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
