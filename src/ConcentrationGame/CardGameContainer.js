import React, { Component } from "react";
import axios from "axios";

import Card from "./components/Card";


class CardGameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckID: "",
      cards: [],
      firstCardFlipped: null,
      secondCardFlipped: null,
      gameStarted: false,
      loadingGame: false
    };
  }

  componentDidMount() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then(res => {
        const cardDeck = res.data;
        console.log(cardDeck.deck_id);
        this.setState({
          deckID: cardDeck.deck_id
        });
      });
  }

  gameSetup = () => {
    this.setState({
      loadingGame: true
    });
    setTimeout(() => {
      axios
        .get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
        .then(res => {
          const cardDeck = res.data;
          console.log(cardDeck.deck_id);
          this.setState({
            deckID: cardDeck.deck_id
          });
        });

      const DECK_ID = this.state.deckID;

      axios
        .get(`https://deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=52`)
        .then(res => {
          const allCards = res.data.cards.map((newCards, id) => {
            return {...newCards, flipped: false, matched: false };
          });
          console.log(allCards);
          this.setState({
            cards: allCards,
            loadingGame: false
          })
        });
    }, 1000);
  };
  handleNewGameClick = event => {
    event.preventDefault();
    this.gameSetup();
    this.setState({
      gameStarted: true
    });
  };
  startGameClick = event => {
    event.preventDefault();
    this.gameSetup();
    this.setState({
      gameStarted: true
    });
  };
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
    const { cards, gameStarted, loadingGame } = this.state;
    return (
      <div style={containerStyle}>
        <div> {loadingGame ? <h1>Loading Game ....</h1> : ""}</div>
        <div style={divMarginSpacing}>
          <button
            onClick={
              gameStarted ? this.handleNewGameClick : this.startGameClick
            }
            style={
              loadingGame ? { visibility: "hidden" } : { cursor: "pointer" }
            }
          >
            {gameStarted ? "New Game" : "Start Game"}
          </button>
        </div>
        <div style={cardStyle}>
          {!loadingGame &&
            cards.map((singleCard, index) => {
              return (
                <Card
                  id={index}
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

const cardStyle = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  height: "50px"
};
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  width: "1140px",
  margin: "0 auto"
};
const divMarginSpacing = {
  display: "flex",
  margin: "1em 0"
};
CardGameContainer.propTypes = {};

export default CardGameContainer;
