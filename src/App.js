import React from 'react'
import Cards from './Components/Cards'
import { cardNames } from './data'
class App extends React.Component {
  state = {
    currentPlayer: 'player1',
    clickCount: 0,
    player1Score: 0,
    player2Score: 0,
    cardNames,
    cardsSelected: []
  }

  handleAmountOfClicks = () =>
    this.setState({
      clickCount: this.state.clickCount + 1
    })

  handleMatch = () => {
    const { cardsSelected, currentPlayer } = this.state
    if (cardsSelected[0].name === cardsSelected[1].name) {
      if (cardsSelected[0].id === cardsSelected[1].id) {
        this.setState({ cardsSelected: [] })
      } else {
        currentPlayer === 'player1'
          ? this.setState({
            player1Score: this.state.player1Score + 1
          })
          : this.setState({
            player2Score: this.state.player2Score + 1
          })
        setTimeout(() => {
          this.setState({
            cardNames: [
              ...this.state.cardNames.filter(
                i => i.name !== cardsSelected[0].name
              )
            ],
            cardsSelected: []
          })
        }, 700)
      }
    } else {
      console.log('not a match')
      setTimeout(() => {
        this.setState({ cardsSelected: [] })
      }, 700)
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
      currentPlayer:
        this.state.currentPlayer === 'player1'
          ? 'player2'
          : 'player1',
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
    const {
      cardNames,
      clickCount,
      player1Score,
      player2Score
    } = this.state
    if (clickCount === 2) {
      this.handleMatch()
    }
    if (cardNames.length === 0) {
      if (player1Score > player2Score) {
        alert('Player1 is the winner')
      } else if (player2Score > player1Score) {
        alert('Player2 is the winner')
      }
    }
  }

  render () {
    const {
      player1Score,
      player2Score,
      currentPlayer,
      cardsSelected
    } = this.state
    console.log(this.state.cardsSelected)
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
            <div />
          </div>
        </div>
        <div
          style={{
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap'
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
                onClick={this.handleAmountOfClicks}
                handleAmountOfClicks={
                  this.handleAmountOfClicks
                }
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default App
