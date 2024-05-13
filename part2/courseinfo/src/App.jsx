const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}
const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = (props) => {
  const { parts } = props;
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = (props) => {
  const { parts } = props;

  let initialValue = 0;
  const sumWithInitial = parts.reduce(
    (accumulator, currentValue) => {
      if(!isNaN(accumulator.exercises)){
        initialValue = accumulator.exercises + currentValue.exercises + initialValue;
      }
      if(isNaN(accumulator.exercises)){
        initialValue = currentValue.exercises + initialValue;
      }


      console.log('acumulator', accumulator.exercises, ' currentValue', currentValue.exercises, 'initialValue', initialValue)
      return initialValue;
    });
  return (
    <strong >
      total of {sumWithInitial} exercises
    </strong>
  )
}


const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (<div><Course course={course} /></div>)
}

export default App
