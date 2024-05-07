import { useState } from 'react'

const Title = ({ text }) => {
  return (
    <h1>
      {text}
    </h1>
  )
}

const Anecdote = ({ text, number }) => {
  return (
    <div>
      {text}
      <p>has {number} votes</p>
    </div>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(8))
  const [indMaxVotos, setIndMaxVotos] = useState(0)

  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}


  const handleNewAnecdote = () => {
    setSelected(Math.floor(Math.random() * ((anecdotes.length - 1) - 0 + 1)) + 0)
  }
  const handlePointAnecdote = (pos) => {
    let pointCopy = [...points];
    pointCopy[pos] += 1
    setPoints(pointCopy)
    setIndMaxVotos(indexOfMax(pointCopy))
  }



  return (
    <div>
      <Title text="Anectode of the day"></Title>
      <Anecdote text={anecdotes[selected]} number={points[selected]}></Anecdote>
      <Button handleClick={() => handlePointAnecdote(selected)} text="Vote"></Button>
      <Button handleClick={handleNewAnecdote} text="New anecdote"></Button>

      <Title text="Anectode with most votes"></Title>

      <Anecdote text={anecdotes[indMaxVotos]} number={points[indMaxVotos]}></Anecdote>



    </div>
  )
}

export default App
