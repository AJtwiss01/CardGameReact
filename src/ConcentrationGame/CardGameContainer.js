import React, { Component } from "react";
import { css } from "emotion";
import Card from "./components/Card";


class CardGameContainer extends Component {

    state = {
      cards: this.props.cards,
      firstCardFlipped: null,
      secondCardFlipped: null,
  }

  //why did we pass a array 
  updateMatchStatus = flippedCards => {
    const cardOneValue = flippedCards[0].value;
    const cardTwoValue = flippedCards[1].value;
    const cardOneIndex = flippedCards[0].index;
    const cardTwoIndex = flippedCards[1].index;
    const newCardList =  this.state.cards.slice();
    let firstCard = { ...newCardList[cardOneIndex], flipped: false  }
    let secondCard = { ...newCardList[cardTwoIndex], flipped: false  }
    
    if (cardOneValue === cardTwoValue) {
      firstCard = { ...firstCard, matched: true}
      secondCard = { ...secondCard, matched: true}    
    }
    newCardList[cardOneIndex] = firstCard
    newCardList[cardTwoIndex] = secondCard
    console.log("val ", cardOneValue, cardTwoValue, cardOneIndex, cardTwoIndex, newCardList, firstCard, secondCard)
    this.setState({
      cards: newCardList,
      firstCardFlipped: null,
      secondCardFlipped: null
    });

  };
  updateFlipCardStatus = id => {
    console.log('clicked ', id)
    //update 
    //set state to an array to remember for first card to be selected for object properties
    if (
      // if there first card hasn't been flipped 
      this.state.firstCardFlipped === null
    ) {
      //create a object so we wont mutate the state 
      //flipped not going ot update in card list 
      const firstCard =  {...this.state.cards[id], flipped: true}
      const newCardList =  this.state.cards.slice();
      newCardList[id] = firstCard

      this.setState({
        cards: newCardList,
        firstCardFlipped: {...firstCard, index:id}
      });
    }

    // if the is not the sanme as the first card clicked and there is a first card clicked and there is not second card clicked
    // why if verse else if 
    if (
      this.state.firstCardFlipped !== null &&
      this.state.cards[id].code !== this.state.firstCardFlipped.code &&
      this.state.secondCardFlipped === null
    ) {
       console.log('hit')
        const secondCard =  {...this.state.cards[id], flipped: true}
        const newCardList =  this.state.cards.slice();
        newCardList[id] = secondCard
  
        this.setState({
          cards: newCardList,
          secondCardFlipped: {...secondCard, index:id}
        });
       
      setTimeout(() => {
        if (
          this.state.firstCardFlipped !== null &&
          this.state.secondCardFlipped !== null
        ) {
          this.updateMatchStatus([
            this.state.firstCardFlipped, this.state.secondCardFlipped
          ]);
        }
      }, 1000);
    }
  };
  render() {
    const { gameSetup } = this.props;
    const { cards } = this.state;
    console.log('card state', cards)
    return (
      <div className={classNames.containerStyle}>
        <div className={classNames.divMarginSpacing}>
          <button
            onClick={
              gameSetup
            }
          >
            New Game
          </button>
        </div>
        <div className={classNames.cardStyle}>
          {
            cards.map((singleCard, index) => {
              return (
                <Card
                  id={index}
                  value={singleCard.value}
                  suit={singleCard.suit}
                  type={singleCard.value}
                  key={index}
                  flipped={singleCard.flipped}
                  matched={singleCard.matched}
                  image={singleCard.image}
                  updateFlipCardStatus={this.updateFlipCardStatus}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

const classNames = {
  cardStyle: css`
   display: flex;
   flex-wrap: wrap;
   align-items: center;
   height: 50px
  `,
  containerStyle: css`
  display: flex;
  flex-direction: column;
  width: 1140px;
  margin: 0 auto;
  `,
  divMarginSpacing: css`
  display: "flex";
  margin: "1em 0"
  `
}


CardGameContainer.propTypes = {};

export default CardGameContainer;
