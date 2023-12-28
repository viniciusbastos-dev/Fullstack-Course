import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	const handleNewName = (e) => setNewName(e.target.value);

	const handleNewNumber = (e) => setNewNumber(e.target.value);

	const handleSubmit = (event) => {
		event.preventDefault();

		const personObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};
		setNewName("");
		setNewNumber("");

		if (persons.some((person) => person.name === personObject.name)) {
			return alert(`${newName} is already added to phonebook`);
		}
		setPersons(persons.concat(personObject));
	};

	const handleSearch = (e) => setSearch(e.target.value);

	const personsToShow = search
		? persons.filter((person) =>
				person.name.toLowerCase().includes(search.toLowerCase())
		  )
		: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter search={search} onChange={handleSearch} />
			<h2>Add a new</h2>
			<PersonForm
				name={newName}
				number={newNumber}
				onChange={{ handleNewName, handleNewNumber }}
				onSubmit={handleSubmit}
			/>
			<h2>Numbers</h2>
			<Persons persons={personsToShow} />
		</div>
	);
};

export default App;
