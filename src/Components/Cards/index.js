import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})

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
        this.setState({ isClicked: false })
      }
    })
  }

  render () {
    const classes = useStyles()
    return (
      <Card
        className={classes.card}
        onClick={() => {
          this.handleClick()
          this.props.handleAmountOfClicks()
          this.props.whichCardsClicked(
            this.props.name,
            this.props.id
          )
        }}
      >
        <CardActionArea>
          {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
          <CardContent>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
            >
              {this.state.isClicked ? (
                <div>
                  <h4>{this.props.name}</h4>
                  <h4>{this.props.id}</h4>
                </div>
              ) : (
                <div>&&&</div>
              )}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary'>
            Share
          </Button>
          <Button size='small' color='primary'>
            Learn More
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default Cards
