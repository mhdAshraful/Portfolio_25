import React, { useRef, forwardRef } from "react";

const DocumentedExp = forwardRef((props, ref) => {
	const expRef = useRef();
	return (
		<div ref={ref} data-section="experiences" className="exp_wrapper">
			<div className="experiences" ref={expRef}>
				<h1 className="title">Experiences</h1>
			</div>
		</div>
	);
});

export default DocumentedExp;
