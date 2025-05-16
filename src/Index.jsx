import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./SCSS/Index.scss";
import {
	CanvasContextProvider,
	SectionProvider,
} from "./utils/SecitonContext.jsx";
import App from "./App";
import WorkDetails from "@cmpnnts/WorkDetails";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<CanvasContextProvider>
			<SectionProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/works/:typeKey" element={<WorkDetails />} />
					</Routes>
				</BrowserRouter>
			</SectionProvider>
		</CanvasContextProvider>
	</StrictMode>
);
