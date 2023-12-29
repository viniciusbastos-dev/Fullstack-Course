import React from "react";

const PersonForm = ({
	name,
	number,
	onNameChange,
	onNumberChange,
	onFormSubmit,
}) => {
	return (
		<form onSubmit={onFormSubmit}>
			<div>
				name: <input value={name} onChange={onNameChange} />
			</div>

			<div>
				number: <input value={number} onChange={onNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
