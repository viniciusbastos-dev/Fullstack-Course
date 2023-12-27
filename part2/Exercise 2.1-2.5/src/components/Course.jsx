/* eslint-disable react/prop-types */
import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
	return (
		<>
			<Header text={course.name} />
			<Content parts={course.parts} />
		</>
	);
};

export default Course;
