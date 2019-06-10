export const handleWinner = (play1Score, play2Score) => {
  if (play1Score > play2Score) {
    alert('Player1 is the winner')
  } else if (play2Score > play1Score) {
    alert('Player2 is the winner')
  } else if (play1Score === play2Score) {
    alert('its a tie!')
  }
}
export const shuffleCards = cardNames => {
  const shuffledCards = cardNames
  for (let i = cardNames.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cardNames[i], cardNames[j]] = [
      cardNames[j],
      cardNames[i]
    ]
  }
  return shuffledCards
}
