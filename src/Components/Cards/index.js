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
    isClicked: false
  }

  handleClick = () => {
    this.setState({ isClicked: true })
  }

  /**
   * Need a better way to handle this
   */
  componentWillReceiveProps () {
    this.props.cardsSelected.map(i => {
      if (this.props.name === i.name) {
        setTimeout(() => {
          this.setState({ isClicked: false })
        }, 700)
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
        }}
      >
        <Card isClicked={this.state.isClicked}>
          <CardSide>
            <img src={CodeImg} alt='Jimmy Eat World' />
          </CardSide>
          <CardBack>
            <span>{this.props.name}</span>
            <span>{this.props.id}</span>
          </CardBack>
        </Card>
      </Container>
    )
  }
}

export default Cards
