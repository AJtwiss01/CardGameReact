import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Card from "./components/Card";

class CardGameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckID: "",
      cards: [],
      firstCardFlipped: [],
      SecondCardFlipped: [],
    };
  }

  componentWillMount() {
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

  handleNewGameClick = event => {
    event.preventDefault();
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
          return { id: id, ...newCards, flipped: false, matched: false };
        });
        console.log(allCards);
        this.setState({
          cards: allCards,
        });
      });
  };

  resetState = () => {
    this.setState({
      cards: this.state.cards,
      firstCardFlipped: [],
      SecondCardFlipped: []
    });
  }

  isMatching = (flippedCards) => {
    console.log("flippedCards", flippedCards)
    const cardOneValue = flippedCards[0].value
    const cardTwoValue = flippedCards[1].value
    const cardOneId = flippedCards[0].id
    const cardTwoId= flippedCards[1].id
    console.log(cardOneValue, cardTwoValue)
    if (cardOneValue !== cardTwoValue) {
      this.state.cards[cardOneId].flipped = false
      this.state.cards[cardTwoId].flipped = false
      this.setState({
        cards: this.state.cards,
        firstCardFlipped:[],
        SecondCardFlipped:[]
      })
    }
    if (cardOneValue === cardTwoValue) {
      this.state.cards[cardOneId].matched = true
      this.state.cards[cardTwoId].matched = true
      this.setState({
        cards: this.state.cards,
        firstCardFlipped:[],
        SecondCardFlipped:[]
      })
    }
  }
  flippingState = (id) => {
    //set state to a array to rembeber for first card to be selecte for object proprieties
    if (this.state.cards[id].id == id && this.state.firstCardFlipped.length === 0) {
      console.log("found");
      this.state.cards[id].flipped = true
      this.setState({
        firstCardFlipped: this.state.cards[id]
      })
    }
    //check to se if second cards is selected and do some checking 
    if (this.state.cards[id].id != this.state.firstCardFlipped.id && this.state.firstCardFlipped.length != 0 && this.state.SecondCardFlipped.length === 0) {
      if (this.state.cards[id].id == id) {
        this.state.cards[id].flipped = true
        const newCardsToRender = this.state.cards.map(cardsToUpdate => cardsToUpdate)
        this.setState({
          cards: newCardsToRender,
          SecondCardFlipped: this.state.cards[id]
        })  
      }
      setTimeout(() => {
        if( this.state.firstCardFlipped.length !== 0 && this.state.SecondCardFlipped.length !== 0){
          this.isMatching([{value:this.state.firstCardFlipped.value, id:this.state.firstCardFlipped.id},{value: this.state.SecondCardFlipped.value, id:this.state.SecondCardFlipped.id }])

        }
      }, 1000);
    }
 
  };
  render() {
    const { cards } = this.state;
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          {cards.map((singleCard, index) => {
            return (
              <Card
                id={singleCard.id}
                type={singleCard.value}
                key={index}
                flipped={singleCard.flipped}
                matched={singleCard.matched}
                image={singleCard.image}
                flippingState={this.flippingState}
              />
            );
          })}
          <button onClick={this.handleNewGameClick}> new game </button>
        </div>
        
      </div>
    );
  }
}
const cardStyle = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  height: "50px",
  width: "1140px",
  margin: "0 auto"
};
const containerStyle ={
  display: "flex",
  flexDirection: "column"
}

CardGameContainer.propTypes = {};

export default CardGameContainer;
