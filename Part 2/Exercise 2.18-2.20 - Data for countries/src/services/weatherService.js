import axios from "axios";

const getWeather = async (capital) => {
	const coords = await axios
		.get(`https://viniciusbastos-dev.vercel.app/api/geo?q=${capital}`)
		.then((response) => response.data);
	const weatherData = await axios
		.get(
			`https://viniciusbastos-dev.vercel.app/api/weather?lat=${coords.lat}&lon=${coords.lon}`
		)
		.then((response) => response.data);

	return weatherData;
};

export default { getWeather };
