import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:3001/persons")
			.then((response) => setPersons(response.data));
	}, []);

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
