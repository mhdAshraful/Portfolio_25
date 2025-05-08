import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const MyLogo = () => {
	return (
		<div className="mylogo">
			<img
				src="/assets/images/icon.webp"
				alt="Letter M masked some flowers, served as logo"
			/>
			<div className="logo_Text">
				<p className="logo_T1">
					Mohammed <br /> Ashraful Islam
				</p>
				<p className="logo_T2">full-stack Developer</p>
			</div>
		</div>
	);
};

export default MyLogo;

export const MylogoWrap = ({ show }) => {
	const [shouldRender, setShouldRender] = useState(show);
	const logoRef = useRef();

	useEffect(() => {
		if (show) setShouldRender(true);
	}, [show]);

	useGSAP(
		() => {
			if (!logoRef.current) return; // <- guard for null

			if (!show) {
				gsap.to(logoRef.current, {
					y: 20,
					autoAlpha: 0,
					duration: 0.4,
					ease: "back.inOut",
					onComplete: () => setShouldRender(false),
				});
			} else {
				gsap.fromTo(
					logoRef.current,
					{ y: 20, autoAlpha: 0 },
					{
						y: 0,
						autoAlpha: 1,
						duration: 0.4,
						ease: "back.inOut",
					}
				);
			}
		},
		{ dependencies: [show] }
	);

	if (!shouldRender) return null;

	return (
		<div
			className="logo_wrap"
			style={{ position: "fixed", top: "0", left: "0" }}
			ref={logoRef}
		>
			{shouldRender && <MyLogo />}
		</div>
	);
};
