/* eslint-disable react/prop-types */
const Total = ({ parts }) => {
	const totalExercises = parts.reduce((acc, part) => acc + part.exercises, 0);
	return <b>Total of {totalExercises} exersises</b>;
};

export default Total;
