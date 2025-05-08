import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./SCSS/Index.scss";
import { SectionProvider } from "./utils/SecitonContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<SectionProvider>
			<App />
		</SectionProvider>
	</StrictMode>
);
