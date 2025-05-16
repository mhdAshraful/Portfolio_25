import React, {
	forwardRef,
	useState,
	useEffect,
	useRef,
	useLayoutEffect,
} from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useParams } from "react-router";

import Data from "../utils/info";
import { useTouchDevice } from "../utils/deviceDetector";
import { useNavigate } from "react-router";
import { cornerDescription } from "../utils/cornerDescription";
import {
	useR3fCanvasContext,
	useSectionContext,
} from "../utils/SecitonContext";

import Mouse from "./Mouse";
import BackCircles from "./BackCircle";
import Cornerinfo from "./Cornerinfo";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const WorkDetails = forwardRef((props, ref) => {
	const { typeKey } = useParams();
	const navigate = useNavigate();
	const { setRenderCanvas } = useR3fCanvasContext();
	const touchDevice = useTouchDevice();
	const [workData, setWorkData] = useState();
	const detailsRef = useRef();
	const smoother = useRef();
	const cornerRef = useRef();
	const { currentSection, setCurrentSection } = useSectionContext();
	// const { description, cornerH2 } = cornerDescription[currentSection];

	// useEffect(() => {
	// 	if (ScrollTrigger.isTouch) {
	// 		document.body.classList.add("touch");
	// 		ScrollTrigger.refresh();
	// 	} else {
	// 		document.body.classList.remove("touch");
	// 		ScrollTrigger.refresh();
	// 	}
	// }, []);

	/**
	 * Smooth Scroll
	 */
	useEffect(() => {
		/**
		 * Smooth Scroller ----- runs first
		 */
		requestAnimationFrame(() => {
			smoother.current = ScrollSmoother.create({
				smooth: 1.5,
				effects: true,
				smoothTouch: true,
				wrapper: "#smooth-wrapper",
				content: "#smooth-content",
			});
		});

		return () => {
			smoother.current?.kill();
			smoother.current = null;
		};
	}, []);

	console.log("WorkDetails useEffect running with typeKey:", typeKey);
	// The works data is in the third element (index 2) of the Data array
	useEffect(() => {
		const dt = Data[2].myworks[typeKey];
		console.log("++++++", dt);
		setWorkData(dt);
	}, [typeKey]);

	if (!workData) {
		return <div>Loading work details...</div>;
	}
	const { title, image1, video } = workData;

	const handleBack = () => {
		setRenderCanvas(true);
		navigate("/");
	};

	// useEffect(() => {
	// 	if (!detailsRef.current) return;
	// 	setCurrentSection(typeKey);
	// 	setTimeout(() => {});
	// }, []);

	return (
		<>
			{/* <Cornerinfo description={description} cornerH2={cornerH2} /> */}
			<BackCircles handleBack={handleBack} />
			{!touchDevice && <Mouse />}
			<div id="smooth-wrapper" ref={ref}>
				<div className="border">
					<span className="hideBar" />
					<div id="smooth-content">
						<div
							className="details_wrapper snapper"
							id={typeKey}
							data-section={typeKey}
							ref={detailsRef}
						>
							<p className="details_logo">mhdAshraful</p>
							<div className="detaild">
								<h1 className="title">{title} </h1>
								<div className="details">
									{image1 && (
										<img src={image1} alt={`${title} preview`} />
									)}
									<video
										src={video}
										alt="video preview"
										autoPlay
										muted
										loop
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
});

export default WorkDetails;
