import React, { Component } from 'react'

export default class Player1 extends Component {
  state = {
    score: 0
  }

  render () {
    return (
      <div>
        <h1>Player 1</h1>
        <span>
          Cards Selected:
          {this.props.cardsSelected.length
            ? this.props.cardsSelected.map(i => (
              <span key={i.id}> {i.name} </span>
            ))
            : ''}
        </span>
      </div>
    )
  }
}
