const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exer}
    </p>
  )
}

const Content = (props) => {
  const { parts } = props;
  return (
    console.log(parts[0].name),
    console.log(parts[0].exercises),
    <div>
       <Part part={parts[0].name} exer={parts[0].exercises}/>
       <Part part={parts[1].name} exer={parts[1].exercises}/>
       <Part part={parts[2].name} exer={parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  const { parts } = props;
  return (
    <p>
      Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default App
