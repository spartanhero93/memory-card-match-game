import React from 'react'

import Cards from './Components/Cards'
import Player1 from './Components/Players/Player1'
import Player2 from './Components/Players/Player2'

class App extends React.Component {
  state = {
    currentPlayer: 'player1',
    clickCount: 0,
    player1Score: 0,
    player2Score: 0,
    cardNames: [
      {
        name: 'toad',
        id: 1
      },
      {
        name: 'toad',
        id: 2
      },
      {
        name: 'apple',
        id: 3
      },
      {
        name: 'apple',
        id: 4
      },
      {
        name: 'sheep',
        id: 5
      },
      {
        name: 'sheep',
        id: 6
      }
    ],
    cardsSelected: []
  }

  handleAmountOfClicks = () =>
    this.setState({
      clickCount: this.state.clickCount + 1
    })

  handleMatch = () => {
    const { cardsSelected, currentPlayer } = this.state
    if (cardsSelected[0].name === cardsSelected[1].name) {
      this.setState({
        cardNames: [
          ...this.state.cardNames.filter(
            i => i.name !== cardsSelected[0].name
          )
        ],
        cardsSelected: []
      })
      currentPlayer === 'player1'
        ? this.setState({
          player1Score: this.state.player1Score + 1
        })
        : this.setState({
          player2Score: this.state.player2Score + 1
        })
    } else {
      console.log('not a match')
      this.setState({ cardsSelected: [] })
    }
    this.changePlayers()
  }

  handleWhichCardsClicked = (name, id) => {
    this.setState({
      cardsSelected: [
        ...this.state.cardsSelected,
        { name, id }
      ]
    })
  }

  changePlayers = () => {
    this.setState({
      currentPlayer: 'player2',
      cardsSelected: [],
      clickCount: 0
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

  componentDidUpdate () {
    if (this.state.clickCount === 2) {
      this.handleMatch()
    }
  }

  render () {
    const {
      player1Score,
      player2Score,
      currentPlayer,
      cardsSelected
    } = this.state
    console.log(this.state.clickCount)
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2rem 1rem'
          }}
        >
          <h1>Player one score: {player1Score}</h1>
          <h1>Player two score: {player2Score}</h1>
        </div>
        <div>
          <button onClick={this.shuffleCards}>
            Shuffle
          </button>
          <div>
            <h3>Current Player: {currentPlayer}</h3>
            <div>
              {/* {currentPlayer === 'player1' ? (
                <Player1
                  cardsSelected={this.state.cardsSelected}
                />
              ) : (
                <Player2 />
              )} */}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          {this.state.cardNames.map(i => (
            <Cards
              key={i.id}
              id={i.id}
              name={i.name}
              whichCardsClicked={
                this.handleWhichCardsClicked
              }
              cardsSelected={cardsSelected}
              handleAmountOfClicks={
                this.handleAmountOfClicks
              }
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App
