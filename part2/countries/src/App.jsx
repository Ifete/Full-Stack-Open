import { useState, useEffect } from 'react'
import axios from "axios";

function App() {
  const [name, setName] = useState('')
  const [countries, setCountry] = useState({})
  const [countSearch, setCountSearch] = useState(null)

  useEffect(() => {
    console.log('effect run, countSearch is now', countSearch)

    // omitir si la moneda no está definida
    if (countSearch) {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countSearch}`)
        .then(response => {
          setCountry(response.data.name.common)
        })
    }
  }, [countSearch])

  const handleChange = (event) => {
    console.log('name', event.target.value)
    setName(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountSearch(name)
  }

  return (
    <div>
    <form onSubmit={onSearch}>
      Country: <input value={name} onChange={handleChange} />
      <button type="submit">find country</button>
    </form>
    <pre>
      {JSON.stringify(countries, null, 2)}
    </pre>
  </div>
  )
}

export default App
