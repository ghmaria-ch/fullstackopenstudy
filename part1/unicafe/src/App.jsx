import { useState } from 'react'

const Header = ({header}) =>{
  return(
    <div style={{fontWeight:'bold'}}>
      {header}
    </div>
  )
}

const Option = ({handleClick,text}) =>{
  return(
    <div style={{ display: 'inline-block', marginRight: '10px' }}>
      <p><button onClick={handleClick}>{text}</button></p>
    </div>
  )
}

const Count =({text,count}) =>{
  return(
    <div>
      <p>
      {text} {count}
      </p>
    </div>
  )
}



const Statistics = ({good,bad,neutral}) =>{
  if(good===0 && bad===0 && neutral==0){
    return(
      <div>
        no feedback give
      </div>
    )
  }
  return(
    <div>
      <p>
      all {good+bad+neutral}
      </p>
      <p>
      average {(good*1+bad*-1+neutral*0)/(good+bad+neutral)}
      </p>
      <p>
      positive {(good/(good+bad+neutral))*100} %
      </p>
    </div>
  )
}


const App = () => {
  const header1="give feedback"
  const header2="statistics"
  const text1="good"
  const text2="neutral"
  const text3="bad"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>{
    setGood(good+1)
  }

  const handleBadClick = () =>{
    setBad(bad+1)
  }

  const handleNeutralClick = () =>{
    setNeutral(neutral+1)
  }

 
 
  return (
    <div>
      <Header header={header1}/>
      <Option handleClick={handleGoodClick} text={text1}/>
      <Option handleClick={handleNeutralClick} text={text2}/>
      <Option handleClick={handleBadClick} text={text3}/>
      <Header header={header2}/> 
      <Count count={good} text={text1}/> 
      <Count count={neutral} text={text2}/> 
      <Count count={bad} text={text3}/> 
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App