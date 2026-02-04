import { useEffect } from "react";
import { createContext, useContext, useMemo, useState } from "react";

/***
 * SECTION CONTEXT
 */

const SectionContext = createContext();
export const SectionProvider = ({ children }) => {
	const [currentSection, setCurrentSection] = useState("home");
	const pathname = window.location.pathname;
	useEffect(() => {
		if (pathname === "works") {
			setCurrentSection("works");
		} else if (pathname === "ui") {
			setCurrentSection("ui");
		} else if (pathname === "webgl") {
			setCurrentSection("webgl");
		} else if (pathname === "interaction") {
			setCurrentSection("interaction");
		} else if (pathname === "focus") {
			setCurrentSection("focus");
		} else if (pathname === "education") {
			setCurrentSection("education");
		} else if (pathname === "experience") {
			setCurrentSection("experience");
		} else if (pathname === "contact") {
			setCurrentSection("contact");
		} else {
			setCurrentSection("home");
		}
	}, [pathname]);

	return (
		<SectionContext.Provider value={{ currentSection, setCurrentSection }}>
			{children}
		</SectionContext.Provider>
	);
};

export const useSectionContext = () => {
	return useContext(SectionContext);
};

/***
 *
 * CANVAS CONTEXT
 */

const R3fCanvasContext = createContext();
export const CanvasContextProvider = ({ children }) => {
	const [renderCanvas, setRenderCanvas] = useState(true);
	return (
		<R3fCanvasContext.Provider value={{ renderCanvas, setRenderCanvas }}>
			{children}
		</R3fCanvasContext.Provider>
	);
};
export const useR3fCanvasContext = () => {
	return useContext(R3fCanvasContext);
};

/***
 * OVERLAY CONTEXT
 */
const OverlayContext = createContext();
export const OverLayProvider = ({ children }) => {
	const [shouldRenderModal, setShouldRenderModal] = useState(false);
	const [ViewModal, setViewModal] = useState(false);
	return (
		<OverlayContext.Provider
			value={{
				shouldRenderModal,
				setShouldRenderModal,
				ViewModal,
				setViewModal,
			}}
		>
			{children}
		</OverlayContext.Provider>
	);
};
export const useOverlayContext = () => {
	return useContext(OverlayContext);
};

/***
 * Layout Tracker Context for Syncing UI & Graphics animation
 */
const LayoutTrackerContext = createContext();
export const LayoutTrackerProvider = ({ children }) => {
	const [domElmPos, setDomElmPos] = useState({});

	const updateDomElmPos = (key, rect) => {
		setDomElmPos((prev) => ({
			...prev,
			[key]: {
				x: rect.left,
				y: rect.top,
				width: rect.width,
				height: rect.height,
			},
		}));
	};

	// ✅ Memoize context value to avoid re-renders
	const contextValue = useMemo(
		() => ({
			domElmPos,
			updateDomElmPos,
		}),
		[domElmPos],
	);

	return (
		<LayoutTrackerContext.Provider value={contextValue}>
			{children}
		</LayoutTrackerContext.Provider>
	);
};
export const useLayoutTrackerContext = () => {
	return useContext(LayoutTrackerContext);
};
