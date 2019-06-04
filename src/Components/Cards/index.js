import React, { Component } from 'react'

export default class Card extends Component {
  state = {
    isClicked: false
  }

  handleClick = () => {
    this.setState({ isClicked: true })
  }

  render () {
    return (
      <div
        style={{
          height: '10rem',
          width: '6rem',
          border: '1px solid',
          textAlign: 'center'
        }}
        onClick={() => {
          this.handleClick()
          this.props.whichCardsClicked(
            this.props.name,
            this.props.id
          )
        }}
      >
        {this.state.isClicked ? (
          <div>
            <h4>{this.props.name}</h4>
            <h4>{this.props.id}</h4>
          </div>
        ) : (
          <div>&&&</div>
        )}
      </div>
    )
  }
}
