import React from "react";

const Persons = ({ onDeletePerson, persons }) => {
	return (
		<>
			{persons.map((person) => (
				<p key={person.id}>
					{person.name} {person.number}
					<button onClick={() => onDeletePerson(person)}>
						Delete
					</button>
				</p>
			))}
		</>
	);
};

export default Persons;
