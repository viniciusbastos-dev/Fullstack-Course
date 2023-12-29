const Countries = ({ countries, handleClick }) => {
	return (
		<>
			{countries.length <= 10 ? (
				<div>
					{countries.map((country) => (
						<div key={country.area}>
							{country.name.common}
							<button
								key={country.population}
								onClick={() => handleClick(country.name.common)}
							>
								Show
							</button>
						</div>
					))}
				</div>
			) : (
				<span>Too many matches, specify another filter</span>
			)}
		</>
	);
};

export default Countries;
