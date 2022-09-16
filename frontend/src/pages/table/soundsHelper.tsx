import chips from 'pages/table/sounds/chips.mp3'
import win from 'pages/table/sounds/win31.mp3'
import allIn from 'pages/table/sounds/allIn.mp3'
import cardsShuffle from 'pages/table/sounds/cardshuffle.mp3'
import foldSound from 'pages/table/sounds/fold.mp3'
import betSound from 'pages/table/sounds/bet.mp3'
import raiseSound from 'pages/table/sounds/raise.mp3'
import combinationSound from 'pages/table/sounds/combination.mp3'

function playChipsSound() {
  new Audio(chips).play()
}
function playWinSound() {
  new Audio(win).play()
}
function playAllInSound() {
  new Audio(allIn).play()
}
function playCardsShuffleSound() {
  new Audio(cardsShuffle).play()
}
function playFoldSound() {
  new Audio(foldSound).play()
}
function playBetSound() {
  new Audio(betSound).play()
}
function playRaiseSound() {
  new Audio(raiseSound).play()
}
function playCombinationSound() {
  new Audio(combinationSound).play()
}

export {
  playChipsSound,
  playWinSound,
  playAllInSound,
  playCardsShuffleSound,
  playFoldSound,
  playBetSound,
  playRaiseSound,
  playCombinationSound
}
