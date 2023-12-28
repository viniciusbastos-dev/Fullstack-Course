/* eslint-disable react/prop-types */
import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
	return (
		<main>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
			<Total parts={parts} />
		</main>
	);
};

export default Content;
