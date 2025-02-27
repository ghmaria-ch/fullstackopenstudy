import { useState,useEffect } from "react"
import axios from 'axios'


const Filter = ({search,handleSearchChange}) => {
    
  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange}/>
    </div>
  )
}


const App = () => {
  const [search,setSearch]=useState('')
  const [countries,setCountries]=useState([])
  const [filteredCountries,setFilteredCountries]=useState([])
 
  useEffect(() => {
    setFilteredCountries(countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search]);

  const renderContent = (filteredCountries) => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } 
    else if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(country.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common} width="100" height="100" />
        </div>
      );
    } 
    else {
      return (
        <div>
        {filteredCountries.map(country => (
        <li key={country.cca3}>{country.name.common} <button onClick={() => setSearch(country.name.common)}>show</button>  
</li>
        )
        )} 
        </div>
        )
      ;
    }
  };

  useEffect (() => {
    console.log('effect')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)      
      })
  }, [])
  
  
 
  
  const handleSearchChange = (event) =>{
    setSearch(event.target.value)
  }
  console.log(search)

  return (
    <>
      <div>
        <Filter handleSearchChange={handleSearchChange} search={search} />
       {renderContent(filteredCountries)}
      </div>
      </>
  );

}

export default App;