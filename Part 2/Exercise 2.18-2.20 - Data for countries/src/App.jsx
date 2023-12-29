import { useEffect, useState } from "react";
import countryService from "./services/countryServices";
import Countries from "./components/Countries";
import Search from "./components/Search";
import Country from "./components/Country";
import weatherService from "./services/weatherService";

const App = () => {
	const [countries, setCountries] = useState(null);
	const [value, setValue] = useState("");
	const [selectedCountry, setSelectedCountry] = useState(null);

	useEffect(() => {
		countryService
			.getAll()
			.then((initialCountries) => setCountries(initialCountries));
	}, []);

	const filteredCountries = value
		? countries.filter((country) =>
				country.name.common.toLowerCase().includes(value.toLowerCase())
		  )
		: countries;

	const handleChange = (e) => {
		setSelectedCountry(null);
		setValue(e.target.value);
	};

	const handleClick = (country) => {
		countryService
			.getCountry(country)
			.then((response) => setSelectedCountry(response));
	};

	if (!countries) return null;

	return (
		<main>
			<Search value={value} handleChange={handleChange} />
			{selectedCountry || filteredCountries.length === 1 ? (
				<Country country={selectedCountry || filteredCountries[0]} />
			) : (
				<Countries
					handleClick={handleClick}
					countries={filteredCountries}
				/>
			)}
		</main>
	);
};

export default App;
