import Person from './components/Person'
import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const Filter = ({filterName,handleFilterName}) => {
  return (
    <div>
        filter shown with <input value={filterName} onChange={handleFilterName}/>
    </div>
  )
}

const PersonForm = ({addPerson,newName,newNumber,handleNameChange,handleNumberChange}) =>{
  return(
  <form onSubmit={addPerson}>
        <div>
          name: <input  value={newName} onChange={handleNameChange}/>
          <br/>
          <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
          <br/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons =({filteredNames})=>{
  return(
    <ul>
        {filteredNames.map((person) => (
        <Person key={person.name} person={person} />
        ))}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filterName,setFilterName] = useState('')
  const [filteredNames,setFilteredNames] =useState([])

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
        setFilteredNames(initialPersons)
      })
  }, [])
 

  const handleNameChange =(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange =(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterName =(event)=>{
    console.log(event.target.value)
    setFilterName(event.target.value)

    const filteredNames=persons.filter((person)=>person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredNames(filteredNames)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject={
      name:newName,
      number:newNumber,
    }
    const nameExists=persons.some((person)=>person.name.toLowerCase()===newName.toLowerCase())
    if (nameExists){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    personService.create(personObject)
    .then(newPersons => {
      setPersons(persons.concat(newPersons))
      setFilteredNames(filteredNames.concat(newPersons))
      setNewName('')
      setNewNumber('')
    })

    
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredNames={filteredNames}/>
    </div>
  )
}

export default App