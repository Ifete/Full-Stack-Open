import { useState } from 'react'


const Name = ({ name }) => {
  return (
    <p>{name.name} {name.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filterPersons, setFilterPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addData = (event) => {
    event.preventDefault()
    let existeNombre = false
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        existeNombre = true
      }
    }
    if (existeNombre) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        id: persons.length + 1,
        number:newPhone
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhone('')
    }
  }


  const addFilterPers = (event, name, number) => {
    event.preventDefault()
    const personObject = {
      name: name,
      id: filterPersons.length + 1,
      number:number
    }
    console.log("personObject: ",personObject)
    setFilterPersons(filterPersons.concat(personObject))
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    //console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    if (event.target.value.trim().length) {
      for (let i = 0; i < persons.length; i++) {
        if (!persons[i].name.toUpperCase().includes(event.target.value.toUpperCase())) {
          persons.splice(i, 1);
        }
      }
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
    <p>filter shown with <input value={newFilter} onChange={handleFilterChange}/></p>
      <h2>Add a new</h2>
      <form onSubmit={addData}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newPhone} onChange={handlePhoneChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person =>
        <Name key={person.id} name={person} />
      )}

      <h2>Filter</h2>
      {filterPersons.map(person =>
        <Name key={person.id} name={person} />
      )}
    </div>
  )
}

export default App
