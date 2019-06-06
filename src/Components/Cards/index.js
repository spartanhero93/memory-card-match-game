import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const flipAnim = keyframes`
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
  }
`
const reverseFlipAnim = keyframes`
  0% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0);
  }
`

const Container = styled.div`
  height: 150px;
  width: 150px;
  cursor: grab;
  perspective: 600;
  position: relative;
  margin-bottom: 2rem;
`
const Card = styled.div`
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: all 1s ease-in-out;
  width: 100%;
  animation-name: ${props =>
    props.isClicked ? flipAnim : reverseFlipAnim};
  animation-duration: 700ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`
const CardSide = styled.div`
  backface-visibility: hidden;
  border-radius: 6px;
  height: 100%;
  position: absolute;
  overflow: hidden;
  width: 100%;
`
const CardBack = styled.div`
  background: #eaeaed;
  color: #0087cc;
  line-height: 150px;
  text-align: center;
  transform: rotateY(180deg);
`

class Cards extends Component {
  state = {
    isClicked: false
  }

  handleClick = () => {
    this.setState({ isClicked: true })
  }

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
          this.props.handleAmountOfClicks()
          this.props.whichCardsClicked(
            this.props.name,
            this.props.id
          )
        }}
      >
        <Card isClicked={this.state.isClicked}>
          <CardSide>
            <img
              src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/29841/jimmy.jpg'
              alt='Jimmy Eat World'
            />
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
