import { useState } from "react";
import Stats from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const hasFeedback = good + neutral + bad;

	return (
		<div>
			<h2>Give Feedback</h2>
			<Button onClick={setGood} text="Good" />
			<Button onClick={setNeutral} text="Neutral" />
			<Button onClick={setBad} text="Bad" />
			<h2>Statistics</h2>
			{hasFeedback !== 0 ? (
				<Stats votes={{ good, neutral, bad }} />
			) : (
				<p>No feedback given</p>
			)}
		</div>
	);
};

export default App;
