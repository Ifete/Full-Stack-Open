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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content
        part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3}
      />
      <Total exer1={exercises1} exer2={exercises2} exer3={exercises3}/>
    </>
  )
}

export default App
