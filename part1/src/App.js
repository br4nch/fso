import {useState} from "react";


const Total = ({parts}) => {
    return (
        <>
            <p>Number of exercises {parts.reduce((a, {exercises}) => a + exercises, 0)} </p>
        </>
    )
}

const Content = ({parts}) => {
    return (
        <>
            {
                parts.map(part => <Part
                    key={part.id}
                    name={part.name}
                    numberOfExercises={part.exercises}/>)
            }
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

const Header = ({course}) => {
    return (
        <>
            <h1>{course}</h1>
        </>
    )
}

const Display = ({counter}) => {
    return (
        <div>{counter}</div>
    )
}

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const History = ({allClicks}) => {
    return (
        allClicks.length === 0
            ? <div>the app is used by pressing the buttons</div>
            : <div>button press history: {allClicks.join(' ')}</div>
    )
}

const App = (props) => {
    const [counter, setCounter] = useState(0)

    const increaseByOne = () => {
        setCounter(counter + 1)
    }

    const decreaseByOne = () => {
        setCounter(counter - 1)
    }

    const setToZero = () => {
        setCounter(0)
    }

    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    const [total, setTotal] = useState(0)

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        const updatedLeft = left + 1
        setLeft(updatedLeft)
        setTotal(updatedLeft + right)
    }


    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        const updatedRight = right + 1
        setRight(updatedRight)
        setTotal(left + updatedRight)
    }


    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                id: "1",
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                id: "2",
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                id: "3",
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
            <Display counter={counter}/>
            <Button handleClick={increaseByOne} text={"plus"}/>
            <Button handleClick={setToZero} text={"zero"}/>
            <Button handleClick={decreaseByOne} text={"minus"}/>
            <div>
                {left}
                <Button handleClick={handleLeftClick} text={"left"}/>
                <Button handleClick={handleRightClick} text={"right"}/>
                {right}
                <History allClicks={allClicks}/>
                <p>total {total}</p>
            </div>
        </>
    )
}

export default App