const Total = ({ parts }) => {

    return (
        <p>Number of exercises <b>{parts[0].exercises + parts[1].exercises + parts[2].exercises}</b> </p>
    )
}
export default Total

