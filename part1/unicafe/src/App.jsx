import { useState } from 'react'
const Titles = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Totals = ({text, number}) =>(
  <p>{text} {number}</p>
)

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [promedio, setPromedio] = useState(0)
  const [positive, setPositive] = useState(0)



  const handleGoodClick = () => {
    const updateGood = good +1
    setGood(updateGood)
    const total = updateGood + bad + neutral
    setTotal(total)
    setPromedio((updateGood-bad)/total)
    setPositive((updateGood*100)/total)
  }
  const handleNeutralClick = () => {
    const updateNeutral = neutral +1
    setNeutral(updateNeutral)
    const total = good + bad + updateNeutral
    setTotal(total)
    setPromedio((good-bad)/total)
    setPositive((good*100)/total)
  }

  const handleBadClick = () => {
    const updateBad = bad +1
    setBad(updateBad)
    const total = good + updateBad + neutral
    setTotal(total)
    setPromedio((good-updateBad)/total)
    setPositive((good*100)/total)
  }

  return (
    <div>
      <Titles text="give feedback"></Titles>
      <Button handleClick={handleGoodClick} text="Good"></Button>
      <Button handleClick={handleNeutralClick} text="Neutral"></Button>
      <Button handleClick={handleBadClick} text="Bad"></Button>
      <Titles text="statistics"></Titles>
      <Totals text="good" number={good} ></Totals>
      <Totals text="neutral" number={neutral} ></Totals>
      <Totals text="bad" number={bad} ></Totals>
      <Totals text="totals" number={total} ></Totals>
      <Totals text="promedio" number={promedio} ></Totals>
      <Totals text="postive" number={positive} ></Totals>
    </div>
  )
}

export default App
