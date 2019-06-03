import React from 'react'

import Cards from './Components/Cards'
import Player1 from './Components/Players/Player1'
import Player2 from './Components/Players/Player2'

class App extends React.Component {
  state = {
    currentPlayer: 'player1',
    clickCount: 0,
    score: {
      ply1: 0,
      ply2: 0
    },
    cardNames: [
      'toad',
      'toad',
      'apple',
      'apple',
      'sheep',
      'sheep'
    ],
    cardsSelected: []
  }

  handleAmountOfClicks = e => {
    this.setState({
      clickCount: this.state.clickCount + 1
    })
  }

  handleMatch = () => {
    const cards = this.state.cardsSelected
    if (cards[0] === cards[1]) {
      alert('its a match')
    } else {
      alert('not a match')
    }
  }

  handleWhichCardsClicked = cardName => {
    const { currentPlayer } = this.state
    this.setState({
      cardsSelected: [
        ...this.state.cardsSelected,
        cardName
      ]
    })
  }

  changePlayers = () => {
    this.setState({
      currentPlayer: 'player2',
      cardsSelected: []
    })
  }

  shuffleCards = () => {
    const a = this.state.cardNames
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    this.setState({ cardNames: a })
  }
  render () {
    console.log(this.state.clickCount)
    const { ply1, ply2 } = this.state.score
    const { clickCount, currentPlayer } = this.state
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2rem 1rem'
          }}
        >
          <h1>Player one score: {ply1}</h1>
          <h1>Player two score: {ply2}</h1>
        </div>
        <div>
          <button onClick={this.shuffleCards}>
            Shuffle
          </button>
          <div>
            <h3>
              Current Player: {this.state.currentPlayer}
            </h3>
            <div>
              {currentPlayer === 'player1' ? (
                <Player1
                  cardsSelected={this.state.cardsSelected}
                />
              ) : (
                <Player2 />
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'space-around'
          }}
          onClick={e => this.handleAmountOfClicks(e)}
        >
          {this.state.cardNames.map(i => (
            <Cards
              name={i}
              whichCardsClicked={
                this.handleWhichCardsClicked
              }
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App
