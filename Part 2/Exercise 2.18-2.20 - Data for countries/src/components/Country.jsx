import { useEffect, useState } from "react";
import weatherService from "../services/weatherService";

const Country = ({ country }) => {
	const [capitalWeather, setCapitalWeather] = useState(null);

	useEffect(() => {
		weatherService.getWeather(country.capital).then((weather) => setCapitalWeather(weather));
	}, []);

	if (!capitalWeather) return null;

	return (
		<>
			<h1>{country.name.common}</h1>
			<div>Capital: {country.capital}</div>
			<div>Area: {country.area}</div>
			<h4>Languages:</h4>
			<ul>
				{Object.entries(country.languages).map(([code, language]) => (
					<li key={code}>{language}</li>
				))}
			</ul>
			<img src={country.flags.png} alt={`${country.name.common}'s flag`} />
			<h3>Weather in {country.capital}</h3>
			<p>Temperature: {capitalWeather.main.temp} Celsius</p>
			<img
				src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`}
				alt={``}
			/>
			<p>Wind speed: {capitalWeather.wind.speed} m/s</p>
		</>
	);
};

export default Country;
