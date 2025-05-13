import React, { forwardRef, useLayoutEffect, useState } from "react";
import { clamp } from "three/src/math/MathUtils";

const SocialMedial = forwardRef((props, ref) => {
	const [l1H, setL1H] = useState(360);
	const [l2H, setL2H] = useState(65);

	useLayoutEffect(() => {
		const getHeight = (minIT, baseIT, minSC, defSC) => {
			return clamp(
				minIT,
				(baseIT * (window.innerHeight - 80)) / defSC,
				window.innerHeight - 80
			);
		};
		setL1H(getHeight(157, 360, 800, 1080));
		setL2H(getHeight(40, 65, 800, 1080));
	}, [window.innerHeight]);

	return (
		<div ref={ref} className="socialmedia_container">
			<div className="all_svgs">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1"
					height="100%"
					viewBox={`0 0 1 ${l1H}`}
					fill="none"
					className="vertical_line"
				>
					<path
						d={`M1 0V${l1H}`}
						stroke="#000000"
						strokeWidth="1"
						strokeLinecap="round"
					/>
				</svg>
				<div className="icons">
					<a
						href={props.twitter}
						target="_blank"
						rel="noopener noreferrer"
						className="socialLinks"
					>
						<img src="/assets/images/twitter.svg" alt="twitter icon" />
					</a>
					<a
						href={props.github}
						target="_blank"
						rel="noopener noreferrer"
						className="socialLinks"
					>
						<img src="/assets/images/github.svg" alt="github icon" />
					</a>
					<a
						href={props.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="socialLinks"
					>
						<img src="/assets/images/linkedin.svg" alt="linkein icon" />
					</a>
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1"
					height="100%"
					viewBox={`0 0 1 ${l2H}`}
					fill="none"
					className="vertical_line"
				>
					<path
						d={`M1 0V${l2H}`}
						stroke="#000000"
						strokeWidth="1"
						strokeLinecap="round"
					/>
				</svg>
			</div>
		</div>
	);
});

export default SocialMedial;
