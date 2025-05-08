import React from "react";

const FallbackComponent = ({ error, resetErrorBoundary }) => {
	return (
		<div>
			<h1>Some thing Went Wrong </h1>
			<p>{error.message}</p>
			<button onClick={resetErrorBoundary}>Try Again</button>
		</div>
	);
};

export default FallbackComponent;
