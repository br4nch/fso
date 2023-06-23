const Total = () => {
    const exercises1 = 10
    const exercises2 = 7
    const exercises3 = 14

    return (
        <>
            <p>Number of exercises {exercises1 + exercises2 + exercises3} </p>
        </>
    )
}
const Content = () => {
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <>
        <Part name={part1} numberOfExercises={exercises1}/>
        <Part name={part2} numberOfExercises={exercises2}/>
        <Part name={part3} numberOfExercises={exercises3}/>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.name} {props.numberOfExercises}
            </p>
        </>
    )
}

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const App = () => {
    const course = 'Half Stack application development'

    return (
        <div>
            <Header course={course}/>
            <Content/>
            <Total/>
        </div>
    )
}

export default App