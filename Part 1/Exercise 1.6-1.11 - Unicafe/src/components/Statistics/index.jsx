import StatisticsLine from "../SatisticsLine";

/* eslint-disable react/prop-types */
const Stats = ({ votes }) => {
	const totalVotes = votes.good + votes.bad + votes.neutral;
	const weightedAverage =
		(votes.good * 1 + votes.neutral * 0 + votes.bad * -1) / totalVotes;
	const positiveVotesPercentage = `${(votes.good / totalVotes) * 100} %`;

	return (
		<table>
			<tbody>
				<StatisticsLine text="Good" value={votes.good} />
				<StatisticsLine text="Neutral" value={votes.neutral} />
				<StatisticsLine text="Bad" value={votes.bad} />
				<StatisticsLine text="All" value={totalVotes} />
				<StatisticsLine text="Average" value={weightedAverage} />
				<StatisticsLine
					text="Positive"
					value={positiveVotesPercentage}
				/>
			</tbody>
		</table>
	);
};

export default Stats;
