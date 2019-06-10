import React from 'react'
import Cards from './Components/Cards'
import { cardNames } from './data'
import { handleWinner, shuffleCards } from './utils'
class App extends React.Component {
  state = {
    currentPlayer: 'player1',
    clickCount: 0,
    player1Score: 0,
    player2Score: 0,
    cardNames,
    cardsSelected: []
  }

  componentWillMount () {
    this.setState({ cardNames: shuffleCards(cardNames) })
  }
  componentDidUpdate () {
    if (this.state.clickCount === 2) {
      this.handleMatch()
    }
  }

  handleAmountOfClicks = () =>
    this.setState({
      clickCount: this.state.clickCount + 1
    })

  handleMatch = () => {
    const { cardsSelected, currentPlayer } = this.state
    if (!cardsSelected[1]) {
      return
    }

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
      setTimeout(() => {
        this.setState({ cardsSelected: [] })
        console.log('not a match')
      }, 400)
    }

    this.changePlayers()
  }

  handleWhichCardsClicked = (name, id) => {
    const { cardsSelected } = this.state
    if (cardsSelected.length === 2) {
      this.handleMatch()
      return
    }
    this.setState({
      cardsSelected: [
        ...this.state.cardsSelected,
        { name, id }
      ]
    })
  }
  changePlayers = () =>
    this.setState({
      currentPlayer:
        this.state.currentPlayer === 'player1'
          ? 'player2'
          : 'player1',
      cardsSelected: [],
      clickCount: 0
    })

  render () {
    const {
      player1Score,
      player2Score,
      currentPlayer,
      cardsSelected
    } = this.state
    console.log(cardsSelected)

    if (!this.state.cardNames.length) {
      handleWinner(player1Score, player2Score)
      this.setState({
        player1Score: 0,
        player2Score: 0,
        cardNames
      })
    }

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
          <div>
            <span>
              Current Player: <h1>{currentPlayer}</h1>
            </span>
            <div />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            margin: '2rem 0'
          }}
        >
          {this.state.cardNames.map(i => (
            <React.Fragment key={i.id}>
              <Cards
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
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }
}

export default App
