import React, { forwardRef } from "react";
import Data from "../utils/info";

const Home = forwardRef((props, ref) => {
	const { title } = Data[0].home;

	return (
		<section ref={ref} data-section="home" className="home_container snapper">
			<div className="home">
				<h1 className="title">{title}</h1>
			</div>
		</section>
	);
});

export default Home;
