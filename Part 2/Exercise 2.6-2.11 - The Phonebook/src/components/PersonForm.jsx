import React from "react";

const PersonForm = ({ name, number, onChange, onSubmit }) => {
	return (
		<form onSubmit={onSubmit}>
			<div>
				name: <input value={name} onChange={onChange.handleNewName} />
			</div>

			<div>
				number:{" "}
				<input value={number} onChange={onChange.handleNewNumber} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
