import React, { forwardRef } from "react";
import Data from "../utils/info";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const Home = forwardRef((props, ref) => {
	const { title } = Data[0].home;

	useGSAP(() => {
		document.fonts.ready.then(() => {
			const ln = document.querySelector(".home .title");

			const words = SplitText.create(ln, {
				type: "words,lines",
				wordsClass: "words",
				linesClass: "line",
				autoSplit: true,
			});
			// gsap animation Here
			console.log("Home cntx:", words);
		});
	});

	return (
		<section ref={ref} data-section="home" className="home_container snapper">
			<div className="home">
				<h1 className="title">{title}</h1>
			</div>
		</section>
	);
});

export default Home;
