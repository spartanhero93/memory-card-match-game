import React, { useState } from 'react'
import { cardArray } from './data'

export default function App () {
  const [clickCount, handleClick] = useState(0)
  const [redScore, handleRedScore] = useState(0)
  const [blueScore, handleBlueScore] = useState(0)
  const [currentPlayer, changePlayer] = useState('red')
  const [whichCardsSelected, handleSelection] = useState([])
  const [cardNames, handleCardNames] = useState(cardArray)

  function handleMatch () {
    /** mostly error handling */
    if (whichCardsSelected.length === 2) {
      /** Checks for duplicates */
      if (
        whichCardsSelected[0]['id'] ===
        whichCardsSelected[1]['id']
      ) {
        changePlayers()
      } else {
        if (
          whichCardsSelected[0]['name'] ===
          whichCardsSelected[1]['name']
        ) {
          addScoreToPlayer()
          setTimeout(() => {
            handleCardNames(
              cardNames.filter(
                i =>
                  i['name'] !==
                  whichCardsSelected[0]['name']
              )
            )
          }, 300)
        }
      }
    } else if (whichCardsSelected.length >= 3) {
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

  const changePlayers = () => {
    handleSelection([])
    currentPlayer === 'red'
      ? changePlayer('blue')
      : changePlayer('red')
  }

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
              key={i.id}
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
              <Card info={i} clickCount={clickCount} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Card ({ info, clickCount }) {
  const [isActive, changeState] = useState(false)
  if (!clickCount) {
    console.log('lol')
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%'
      }}
      onClick={() => changeState(true)}
    >
      {isActive ? info.name : '&&&'}
    </div>
  )
}
