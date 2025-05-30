import { createContext, useContext, useState } from "react";

/***
 * SECTION CONTEXT
 */

const SectionContext = createContext();
export const SectionProvider = ({ children }) => {
	const [currentSection, setCurrentSection] = useState("home");

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
