import React, { Component } from 'react'
import {
  Container,
  Card,
  CardBack,
  CardSide
} from './styles'
import CodeImg from '../../img/code2.jpg'

class Cards extends Component {
  state = {
    isClicked: false,
    timeID: ''
  }

  handleClick = () => {
    this.setState({ isClicked: true })
  }

  /**
   * Need a better way to handle this
   */
  componentWillReceiveProps () {
    // eslint-disable-next-line array-callback-return
    this.props.cardsSelected.map(i => {
      if (this.props.name === i.name) {
        let timeID = setTimeout(() => {
          this.setState({ isClicked: false })
        }, 700)
        this.setState({ timeID })
      }
    })
  }

  render () {
    return (
      <Container
        onClick={() => {
          this.handleClick()
          this.props.whichCardsClicked(
            this.props.name,
            this.props.id
          )
          this.props.handleAmountOfClicks()
        }}
      >
        <Card isClicked={this.state.isClicked}>
          <CardSide>
            <img src={CodeImg} alt='Jimmy Eat World' />
          </CardSide>
          <CardBack>
            <span>{this.props.name}</span>
          </CardBack>
        </Card>
      </Container>
    )
  }
}

export default Cards
