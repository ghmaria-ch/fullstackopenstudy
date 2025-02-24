const Person = ({ person,deletePerson}) => {
  return (

    <div>
  <p>
    <li>{person.name} {person.number} <button onClick={()=>deletePerson(person.id,person.name)}> delete </button></li>
  </p>
  </div>
  )

}

export default Person