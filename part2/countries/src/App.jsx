import { useState, useEffect } from 'react'
import axios from "axios";
import Notification from "./components/Notification";



function App() {
  const [name, setName] = useState('')
  const [countries, setCountry] = useState([])
  const [oneCountry, setOneCountry] = useState([])
  const [countSearch, setCountSearch] = useState(null)
  const [message, setMessage] = useState(null)
  const [weather, setWeather] = useState([])

  const api_key = import.meta.env.VITE_SOME_KEY
 //($env:VITE_SOME_KEY="api") -and (npm run dev)

  useEffect(() => {
    console.log('effect run, countSearch is now', countSearch)

    // omitir si el pais de búsqeuda no está definido
    if (countSearch) {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          let paises = []
          //console.log(response.data.length)
          for (let i = 0; i < response.data.length; i++) {
            //console.log(response.data[i].name.common)
            if (
              response.data[i].name.common
                .toUpperCase()
                .includes(countSearch.toUpperCase())
            ) {
              //console.log('includes: ', response.data[i].name.common)
              paises.push(response.data[i])
            }
          }
          if (paises.length == 1) {
            setOneCountry(paises)
            setCountry([])
            console.log(paises[0].name.common)
            let lat = paises[0].capitalInfo.latlng[0];
            let long = paises[0].capitalInfo.latlng[1];
            //console.log('latitud: ', lat)
            console.log('api: ', api_key)
            axios
              .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`)
              .then(response => {
                setWeather([response.data])
              })


          } else if (paises.length > 10) {
            setCountry([])
            setOneCountry([])
            setMessage(
              `Too many matches, specify another filter'`
            )
            setTimeout(() => {
              setMessage(null)
            }, 4000)
          } else {
            setCountry(paises)
            setOneCountry([])
          }
        })
    }
  }, [countSearch])


  const handleChange = (event) => {
    //console.log('name', event.target.value)
    setName(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountSearch(name)
  }

  const handleShow = (country) => {
    console.log('click', country.name.common)
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.name.common}`)
      .then(response => {
        setOneCountry([response.data])
        setCountry([])
        setName('')
        let lat = response.data.capitalInfo.latlng[0];
        let long = response.data.capitalInfo.latlng[1];
        //console.log('latitud: ',response.data.capitalInfo.latlng[0])
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`)
          .then(response => {
            setWeather([response.data])
          })
      }
      )
  }

  //console.log(countries.length)
  //console.log('oneCountry: ',oneCountry)
  //console.log(weather)
  return (
    <div>
      <form onSubmit={onSearch}>
        Country: <input value={name} onChange={handleChange} />
        <button type="submit">find country</button>
      </form>
      <Notification message={message} />
      <pre>
        {countries.map((country) => (
          <div key={country.tld.cca3}>
            <p >{country.name.common} <button onClick={() => handleShow(country)}>show</button></p>
          </div>
        ))}
      </pre>
      <pre>
        {oneCountry.map((country) => (
          <div key={country.cca3}>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>lenguages:</h2>
            {
              <ul>
                {Object.values(country.languages).map(lang =>
                  <li key={lang}>
                    <span style={{ fontWeight: 'bold' }}>{lang}</span>
                  </li>
                )}
              </ul>}
            <img style={{ width: '100px', height: '80px' }} src={country.flags.svg}></img>
          </div>
        ))}

        {weather.map((country) => (
          <div key={country.id}>
            <h1>Weather in {country.name}</h1>
            <p>temperature {country.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${country.weather[0].icon}@2x.png`}></img>
            <p>wind {country.wind.speed} m/s</p>
          </div>
        ))}
      </pre>


    </div>
  )
}


export default App
