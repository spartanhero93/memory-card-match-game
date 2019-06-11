import React from 'react'
import styled from 'styled-components'
import Cards from './Components/Cards'
import { cardNames } from './data'
import { handleWinner, shuffleCards } from './utils'
import Header from './Components/Header'
class App extends React.Component {
  state = {
    currentPlayer: 'red',
    clickCount: 0,
    redScore: 0,
    blueScore: 0,
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
        currentPlayer === 'red'
          ? this.setState({
            redScore: this.state.redScore + 1
          })
          : this.setState({
            blueScore: this.state.blueScore + 1
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
        }, 500)
      }
    } else {
      setTimeout(() => {
        this.setState({ cardsSelected: [] })
      }, 500)
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
        this.state.currentPlayer === 'red' ? 'blue' : 'red',
      cardsSelected: [],
      clickCount: 0
    })

  render () {
    const {
      redScore,
      blueScore,
      currentPlayer,
      cardsSelected
    } = this.state

    if (!this.state.cardNames.length) {
      handleWinner(redScore, blueScore)
      setTimeout(() => {
        this.setState({
          redScore: 0,
          blueScore: 0,
          cardNames
        })
      }, 300)
    }

    return (
      <Container>
        <Header
          redScore={redScore}
          blueScore={blueScore}
          currentPlayer={currentPlayer}
        />

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
      </Container>
    )
  }
}

const Container = styled.div`
  height: 100vh;
  padding: 2rem 0;

  @media (max-width: 450px) {
    font-size: 0.5rem;
    height: 100%;
  }
`

export default App
