import React, { forwardRef } from "react";

const WorkDetails = forwardRef((props, ref) => {
	const { title, url, image1, video } = props;

	return (
		<div className="details_wrapper snapper" ref={ref}>
			<div className="detaild">
				<h1 className="title">{title}</h1>
				<div className="details">
					<img src={image1} alt={title} />
					<video src={video} autoPlay loop muted></video>
				</div>
			</div>
		</div>
	);
});

export default WorkDetails;
