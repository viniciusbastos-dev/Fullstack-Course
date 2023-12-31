import { useEffect, useState } from "react";
import personsService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");
	const [message, setMessage] = useState(null);

	useEffect(() => {
		personsService.getAll().then((initialPersons) => setPersons(initialPersons));
	}, []);

	const findPersonByName = (name) =>
		persons.find((person) => person.name.toLowerCase() === name.toLowerCase());
		
	const handleNameChange = (event) => setNewName(event.target.value);

	const handleNumberChange = (event) => setNewNumber(event.target.value);

	const handleSearchInputChange = (event) => setSearch(event.target.value);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const existingPerson = findPersonByName(newName);

		setNewName("");
		setNewNumber("");

		const newPerson = {
			name: newName,
			number: newNumber,
		};

		if (!existingPerson) {
			personsService.create(newPerson).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setMessage({
					content: `Added ${returnedPerson.name}`,
					error: false,
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			});
			return;
		}

		const confirmUpdate = window.confirm(
			`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
		);

		if (!confirmUpdate) return;

		const updatedPerson = { ...existingPerson, number: newNumber };

		personsService
			.update(updatedPerson.id, updatedPerson)
			.then((returnedPerson) => {
				setPersons(
					persons.map((person) =>
						person.id !== returnedPerson.id ? person : returnedPerson
					)
				);
			})
			.catch((error) => {
				setMessage({
					content: `Information of ${updatedPerson.name} has already been removed from server`,
					error: true,
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
				setPersons(persons.filter((person) => person.id !== updatedPerson.id));
			});
	};

	const handleDeletePerson = ({ id, name }) => {
		if (window.confirm(`Are you sure you want to delete ${name}?`)) {
			personsService
				.deleteP(id)
				.then(() => setPersons(persons.filter((person) => person.id !== id)))
				.catch((error) => {
					setMessage({
						content: `Information of ${updatedPerson.name} has already been removed from server`,
						error: true,
					});
					setTimeout(() => {
						setMessage(null);
					}, 5000);
					setPersons(persons.filter((person) => person.id !== id));
				});
		}
	};

	const personsToShow = search
		? persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
		: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter search={search} onSearchInputChange={handleSearchInputChange} />
			<h2>Add a new</h2>
			<PersonForm
				name={newName}
				number={newNumber}
				onNumberChange={handleNumberChange}
				onNameChange={handleNameChange}
				onFormSubmit={handleFormSubmit}
			/>
			<h2>Numbers</h2>
			<Persons onDeletePerson={handleDeletePerson} persons={personsToShow} />
		</div>
	);
};

export default App;
