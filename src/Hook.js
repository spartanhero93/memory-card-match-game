import React, { useState } from 'react'
import { cardNames } from './data'

export default function App () {
  const [clickCount, handleClick] = useState(0)
  const [redScore, handleRedScore] = useState(0)
  const [blueScore, handleBlueScore] = useState(0)
  const [currentPlayer, changePlayer] = useState('red')
  const [whichCardsSelected, handleSelection] = useState([])

  function handleMatch () {
    /** mostly error handling */
    if (whichCardsSelected.length === 2) {
      if (
        whichCardsSelected[0]['id'] ===
        whichCardsSelected[1]['id']
      ) {
        handleSelection([])
        changePlayers()
      } else {
        if (
          whichCardsSelected[0]['name'] ===
          whichCardsSelected[1]['name']
        ) {
          handleSelection([])
          addScoreToPlayer()
        }
      }
    } else {
      /** if the cards selected is greater or less than two restart */
      handleSelection([])
    }
  }

  function addScoreToPlayer () {
    if (currentPlayer === 'blue') {
      handleBlueScore(blueScore + 1)
    } else if (currentPlayer === 'red') {
      handleRedScore(redScore + 1)
    }
  }

  const changePlayers = () =>
    currentPlayer === 'red'
      ? changePlayer('blue')
      : changePlayer('red')

  if (clickCount === 2) {
    handleClick(0)
    handleMatch()
    changePlayers()
  }

  console.log(whichCardsSelected)

  return (
    <div>
      <div>
        <h1>currentPlayer: {currentPlayer}</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span>Red Score: {redScore}</span>
          <span>Blue Score: {blueScore}</span>
        </div>
      </div>
      <div>
        <h1>Click count: {clickCount}</h1>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        {cardNames.map(i => {
          return (
            <div
              onClick={() => {
                handleSelection([...whichCardsSelected, i])
                handleClick(clickCount + 1)
              }}
              style={{
                height: '10rem',
                width: '6rem',
                border: 'solid 2px'
              }}
            >
              {i.name}
            </div>
          )
        })}
        {/* <Card
            key={i.id}
            info={i}
            whichCardsSelected={whichCardsSelected}
            handleSelection={handleSelection}
            handleClick={handleClick}
          />
        ))} */}
      </div>
    </div>
  )
}

function Card () {
  const [isActive, changeState] = useState(false)
  return <div onClick={() => changeState(true)} />
}
