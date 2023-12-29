import React from "react";

const Filter = ({ search, onSearchInputChange }) => {
	return (
		<div>
			filter shown with{" "}
			<input value={search} onChange={onSearchInputChange} type="text" />
		</div>
	);
};

export default Filter;
