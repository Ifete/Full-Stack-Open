import { useState } from 'react'
const Titles = ({ text }) => {
  return (
    <h1>
      {text}
    </h1>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, number }) => {
  return (
    <p>{text} {number}</p>
  )
}

const Statistics = ({ good, neutral, bad, total, promedio, positive }) => {
  if (total == 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <div>
        <Titles text="statistics"></Titles>
        <StatisticLine text="good" number={good} ></StatisticLine>
        <StatisticLine text="neutral" number={neutral} ></StatisticLine>
        <StatisticLine text="bad" number={bad} ></StatisticLine>
        <StatisticLine text="total" number={total} ></StatisticLine>
        <StatisticLine text="promedio" number={promedio} ></StatisticLine>
        <StatisticLine text="postive" number={positive} ></StatisticLine>
      </div>
    )
  }
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [promedio, setPromedio] = useState(0)
  const [positive, setPositive] = useState(0)



  const handleGoodClick = () => {
    const updateGood = good + 1
    setGood(updateGood)
    const total = updateGood + bad + neutral
    setTotal(total)
    setPromedio((updateGood - bad) / total)
    setPositive((updateGood * 100) / total)
  }
  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    const total = good + bad + updateNeutral
    setTotal(total)
    setPromedio((good - bad) / total)
    setPositive((good * 100) / total)
  }

  const handleBadClick = () => {
    const updateBad = bad + 1
    setBad(updateBad)
    const total = good + updateBad + neutral
    setTotal(total)
    setPromedio((good - updateBad) / total)
    setPositive((good * 100) / total)
  }

  return (
    <div>
      <Titles text="give feedback"></Titles>
      <Button handleClick={handleGoodClick} text="Good"></Button>
      <Button handleClick={handleNeutralClick} text="Neutral"></Button>
      <Button handleClick={handleBadClick} text="Bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} promedio={promedio} positive={positive}></Statistics>

    </div>
  )
}

export default App
