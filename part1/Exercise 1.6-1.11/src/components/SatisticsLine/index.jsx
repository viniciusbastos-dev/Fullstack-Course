/* eslint-disable react/prop-types */
const StatisticsLine = (props) => {
	return (
		<tr>
			<td>
				{props.text} {props.value}
			</td>
		</tr>
	);
};

export default StatisticsLine;
