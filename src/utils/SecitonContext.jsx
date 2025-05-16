import { createContext, useContext, useState } from "react";

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
