import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./SCSS/Index.scss";
import {
	CanvasContextProvider,
	OverLayProvider,
	SectionProvider,
} from "./utils/SecitonContext.jsx";
import App from "./App";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<CanvasContextProvider>
			<OverLayProvider>
				<SectionProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<App />} />
						</Routes>
					</BrowserRouter>
				</SectionProvider>
			</OverLayProvider>
		</CanvasContextProvider>
	</StrictMode>
);
