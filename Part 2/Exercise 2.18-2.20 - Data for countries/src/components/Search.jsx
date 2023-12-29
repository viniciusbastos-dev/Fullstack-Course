import React from "react";

const Search = ({ value, handleChange }) => {
	return (
		<div>
			Find countries <input type="text" value={value} onChange={handleChange} />
		</div>
	);
};

export default Search;
