import { useEffect, useState } from "react";

export function useTouchDevice() {
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		const check = () => {
			const ua = navigator.userAgent || "";
			const isTouch =
				/iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
					ua
				) ||
				"ontouchstart" in window ||
				navigator.maxTouchPoints > 0;
			// ||
			// this may create problems in wdesktop when window size is redused by user.
			// window.innerWidth <= 768;

			setIsTouch(isTouch);
		};

		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	return isTouch;
}
