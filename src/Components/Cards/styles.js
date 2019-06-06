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
const fadeIn = keyframes`
  0% {
          display: none;
          opacity: 0;
      }
  1% {
      display: block;
      opacity: 0;
  }
  100% {
      display: block;
      opacity: 1;
  }
`

export const Container = styled.div`
  height: 150px;
  width: 150px;
  cursor: grab;
  perspective: 600;
  position: relative;
  margin-bottom: 2rem;
`
export const Card = styled.div`
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: all 1s ease-in-out;
  width: 100%;
  animation-name: ${({ isClicked }) =>
    isClicked ? flipAnim : reverseFlipAnim};
  animation-duration: 700ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`
export const CardSide = styled.div`
  backface-visibility: hidden;
  border-radius: 6px;
  height: 100%;
  position: absolute;
  overflow: hidden;
  width: 100%;

  & > img {
    width: 100%;
    height: 100%;
  }
`
export const CardBack = styled.div`
  background: #eaeaed;
  color: #0087cc;
  line-height: 150px;
  text-align: center;
  transform: rotateY(180deg);
  animation: ${fadeIn};
`
