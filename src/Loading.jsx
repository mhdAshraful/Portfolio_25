const Loading = ({ percent }) => {
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%,-50%)",
				fontSize: "20vw",
				textAlign: "center",
				alignItems: "center",
				color: "#023012",
			}}
		>
			{percent}% Loaded
		</div>
	);
};

export default Loading;
