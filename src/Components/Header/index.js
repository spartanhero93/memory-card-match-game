import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  color: ${({ currentPlayer }) =>
    currentPlayer === 'red' ? 'red' : 'blue'};
`
export default function Header ({
  redScore,
  blueScore,
  currentPlayer
}) {
  return (
    <Container currentPlayer={currentPlayer}>
      <h1>Red score: {redScore}</h1>
      <h1> Current Player: {currentPlayer}</h1>
      <h1>Blue score: {blueScore}</h1>
    </Container>
  )
}
