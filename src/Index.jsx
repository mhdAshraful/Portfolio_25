import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./SCSS/Index.scss";
import { SectionProvider } from "./utils/SecitonContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import WorkDetails from "@cmpnnts/WorkDetails.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<SectionProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/works/:id" element={<WorkDetails />} />
				</Routes>
			</BrowserRouter>
		</SectionProvider>
	</StrictMode>
);
