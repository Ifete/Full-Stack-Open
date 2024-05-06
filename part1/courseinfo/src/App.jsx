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
  const { part1, exercises1, part2, exercises2, part3, exercises3 } = props;
  return (
    <div>
       <Part part={part1} exer={exercises1}/>
       <Part part={part2} exer={exercises2}/>
       <Part part={part3} exer={exercises3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exer1 + props.exer2 + props.exer3}
    </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <>
      <Header course={course} />
      <Content
        part1={part1.name} exercises1={part1.exercises}
        part2={part2.name} exercises2={part2.exercises}
        part3={part3.name} exercises3={part3.exercises}
      />
      <Total exer1={part1.exercises} exer2={part2.exercises} exer3={part3.exercises}/>
    </>
  )
}

export default App
