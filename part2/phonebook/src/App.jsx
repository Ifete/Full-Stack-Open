//import { useState } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Name from './components/Name'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')


  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


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
        number: newPhone
      }
      personService
        .create(personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewPhone('')
        })

    }
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

  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    let name = person.name;
    let conf = window.confirm('Delete ' + name)
    console.log(person.id)
    if (conf) {
      console.log("Confirm:", person.id)
      personService
        .remove(id)
        .then(returnedPerson => {
          console.log('Remove')
        })
        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from server`
          )
        })
    }else{
      console.log('Cancel')
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        addData={addData}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />

      <h3>Numbers</h3>
      {persons.map(person =>

          <Name
          key={person.id}
          name={person}
          removePerson={() => removePerson(person.id)} />
    )}
    </div>
  )
}

export default App
