/* eslint-disable react/prop-types */
const Button = (props) => {
	const handleClick = () => props.onClick((prev) => prev + 1);

	return <button onClick={handleClick}>{props.text}</button>;
};

export default Button;
