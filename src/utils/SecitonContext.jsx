import { createContext, useContext, useState } from "react";

const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
	const [currentSection, setCurrentSection] = useState("home");

	return (
		<SectionContext.Provider
			value={{
				currentSection,
				setCurrentSection,
			}}
		>
			{children}
		</SectionContext.Provider>
	);
};

export const useSectionContext = () => {
	return useContext(SectionContext);
};
