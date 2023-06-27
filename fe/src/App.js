import {useState, useEffect} from "react"
import noteService from './services/notes'
import './index.css'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className='error'>
            {message}
        </div>
    )
}

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

const Note = ({note, toggleImportance}) => {
    const label = note.important
        ? 'make not important'
        : 'make important'

    return (
        <li className={'note'}>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
        </div>
    )
}

const App = (props) => {
    const [counter, setCounter] = useState(0)
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    const increaseByOne = () => {
        setCounter(counter + 1)
    }

    const decreaseByOne = () => {
        setCounter(counter - 1)
    }

    const setToZero = () => {
        setCounter(0)
    }

    const notesInit = [
        {
            id: 1,
            content: 'HTML is easy',
            important: true
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false
        },
        {
            id: 3,
            content: 'GET and POST are the most important methods of HTTP protocol',
            important: true
        }
    ]

    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    const [total, setTotal] = useState(0)
    const [notes, setNotes] = useState(notesInit)
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)

    const addNote = (e) => {
        e.preventDefault()

        if (!newNote || newNote === '') {
            return
        }

        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }

        // setNotes(notes.concat(noteObject))
        // setNewNote('')
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

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

    const handleNoteChange = (e) => {
        console.log(e.target.value)
        setNewNote(e.target.value)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)


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

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    const toggleImportanceOf = (id) => {
        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(err => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
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

            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type={"submit"}>save</button>
            </form>
            <Footer />

        </>
    )
}

export default App