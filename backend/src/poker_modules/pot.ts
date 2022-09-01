import { IPlayer, Nullable, TWinnersAndPots } from './types'

class Pot {
  pots = [
    {
      amount: 0,
      contributors: [],
    },
  ]

  /**
   * Method that resets the pot to its initial state
   */
  reset() {
    this.pots.length = 1
    this.pots[0].amount = 0
    this.pots[0].contributors = []
  }

  /**
   * Method that gets the bets of the players and adds them to the pot
   */
  addTableBets(players: Nullable<IPlayer>[]) {
    // Getting the current pot (the one in which new bets should be added)
    let currentPot = this.pots.length - 1

    // The smallest bet of the round
    let smallestBet = 0
    // Flag that shows if all the bets have the same amount
    let allBetsAreEqual = true

    // Trying to find the smallest bet of the player
    // and if all the bets are equal
    for (let i in players) {
      if (players[i] && players[i]!.public.bet) {
        if (!smallestBet) {
          smallestBet = players[i]!.public.bet
        } else if (players[i]!.public.bet != smallestBet) {
          allBetsAreEqual = false

          if (players[i]!.public.bet < smallestBet) {
            smallestBet = players[i]!.public.bet
          }
        }
      }
    }

    // If all the bets are equal, then remove the bets of the players and add
    // them to the pot as they are
    if (allBetsAreEqual) {
      for (let i in players) {
        if (players[i] && players[i]!.public.bet) {
          this.pots[currentPot].amount += players[i]!.public.bet
          players[i]!.public.bet = 0
          if (this.pots[currentPot].contributors.indexOf(players[i]!.seat as never) < 0) {
            this.pots[currentPot].contributors.push(players[i]!.seat as never)
          }
        }
      }
    } else {
      // If not all the bets are equal, remove from each player's bet the smallest bet
      // amount of the table, add these bets to the pot and then create a new empty pot
      // and recursively add the bets that remained, to the new pot
      for (let i in players) {
        if (players[i] && players[i]!.public.bet) {
          this.pots[currentPot].amount += smallestBet
          players[i]!.public.bet = players[i]!.public.bet - smallestBet
          if (this.pots[currentPot].contributors.indexOf(players[i]!.seat as never) < 0) {
            this.pots[currentPot].contributors.push(players[i]!.seat as never)
          }
        }
      }

      // Creating a new pot
      this.pots.push({
        amount: 0,
        contributors: [],
      })

      // Recursion
      this.addTableBets(players)
    }
  }

  /**
   * Adds the player's bets to the pot
   */
  addPlayersBets(player: IPlayer) {
    // Getting the current pot (the one in which new bets should be added)
    let currentPot = this.pots.length - 1

    this.pots[currentPot].amount += player.public.bet
    player.public.bet = 0
    // If the player is not in the list of contributors, add them
    if (!this.pots[currentPot].contributors.indexOf(player.seat as never)) {
      this.pots[currentPot].contributors.push(player.seat as never)
    }
  }

  destributeToWinners(players: Nullable<IPlayer>[], firstPlayerToAct: number) {
    let potsCount = this.pots.length
    let messages = []
    let winnersAndPots = {} as TWinnersAndPots

    // For each one of the pots, starting from the last one
    for (let i = potsCount - 1; i >= 0; i--) {
      let winners = [] as Nullable<number>[]
      let bestRating = 0
      let playersCount = players.length
      for (let j = 0; j < playersCount; j++) {
        if (
          players[j] &&
          players[j]!.public.inHand &&
          this.pots[i].contributors.indexOf(players[j]!.seat as never) >= 0
        ) {
          if (players[j]!.evaluatedHand.rating > bestRating) {
            bestRating = players[j]!.evaluatedHand.rating
            winners = [players[j]!.seat]
          } else if (players[j]!.evaluatedHand.rating === bestRating) {
            winners.push(players[j]!.seat)
          }
        }
      }

      if (winners.length === 1 && winners[0] !== null) {
        players[winners[0]]!.public.chipsInPlay += this.pots[i].amount
        let htmlHand = '[' + players[winners[0]]!.evaluatedHand.cards.join(', ') + ']'
        htmlHand = htmlHand
          .replace(/s/g, '&#9824;')
          .replace(/c/g, '&#9827;')
          .replace(/h/g, '&#9829;')
          .replace(/d/g, '&#9830;')
        messages.push(
          players[winners[0]]!.public.name +
            ' wins the pot (' +
            this.pots[i].amount +
            ') with ' +
            players[winners[0]]!.evaluatedHand.name +
            ' ' +
            htmlHand,
        )
        console.log(messages)
        //ToDo сделать ключом какое-то другое поле
        if (winnersAndPots[players[winners[0]]!.public.name]) {
          winnersAndPots[players[winners[0]]!.public.name].amount += this.pots[i].amount
        } else {
          winnersAndPots[players[winners[0]]!.public.name] = {
            player: players[winners[0]],
            amount: this.pots[i].amount,
          }
        }
      } else {
        let winnersCount = winners.length
        let winnings = ~~(this.pots[i].amount / winnersCount)
        let oddChip = winnings * winnersCount !== this.pots[i].amount

        for (let j in winners) {
          let playersWinnings = 0
          let winJ = winners[j] as number
          if (winJ !== null) {
            if (oddChip && players[winJ]!.seat === firstPlayerToAct) {
              playersWinnings = winnings + 1
            } else {
              playersWinnings = winnings
            }
          }

          players[winJ]!.public.chipsInPlay += playersWinnings
          let htmlHand = '[' + players[winJ]!.evaluatedHand.cards.join(', ') + ']'
          htmlHand = htmlHand
            .replace(/s/g, '&#9824;')
            .replace(/c/g, '&#9827;')
            .replace(/h/g, '&#9829;')
            .replace(/d/g, '&#9830;')
          messages.push(
            players[winJ]!.public.name +
              ' ties the pot (' +
              playersWinnings +
              ') with ' +
              players[winJ]!.evaluatedHand.name +
              ' ' +
              htmlHand,
          )
          console.log(messages)
          if (winnersAndPots[players[winJ]!.public.name]) {
            winnersAndPots[players[winJ]!.public.name].amount += this.pots[i].amount
          } else {
            winnersAndPots[players[winJ]!.public.name] = {
              player: players[winJ],
              amount: this.pots[j].amount,
            }
          }
        }
      }
    }

    for (let key in winnersAndPots) {
      let winAmount =
        winnersAndPots[key].amount - winnersAndPots[key]!.player!.public.currentHandBet

      //Отправляем уведомление о выыигрыше
      if (winAmount > 0) {
        winnersAndPots[key].player!.socket.emit('youWin', winAmount)
      }
    }

    this.reset()

    return messages
  }

  /**
   * Method that gives the pot to the winner, if the winner is already known
   * (e.g. everyone has folded)
   */
  giveToWinner(winner: IPlayer) {
    let potsCount = this.pots.length
    let totalAmount = 0
    console.log('giveToWinner POTS', this.pots)

    for (let i = potsCount - 1; i >= 0; i--) {
      console.log('WIN', winner.public.name)
      winner.public.chipsInPlay += this.pots[i].amount
      totalAmount += this.pots[i].amount
    }

    this.reset()
    return totalAmount
  }

  /**
   * Removing a player from all the pots
   */
  removePlayer(seat: number) {
    let potsCount = this.pots.length
    for (let i = 0; i < potsCount; i++) {
      let placeInArray = this.pots[i].contributors.indexOf(seat as never)
      if (placeInArray >= 0) {
        this.pots[i].contributors.splice(placeInArray, 1)
      }
    }
  }

  isEmpty() {
    return !this.pots[0].amount
  }
}

export default Pot
