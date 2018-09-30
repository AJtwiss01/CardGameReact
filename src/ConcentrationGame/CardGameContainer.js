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
      lastCardFlipped: []
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
    const DeckID = this.state.deckID;
    console.log(this.state.deckID);
    axios
      .get(`https://deckofcardsapi.com/api/deck/${DeckID}/draw/?count=52`)
      .then(res => {
        const allCards = res.data.cards.map((newCards, id) => {
          return { id: id, ...newCards, flipped: false, matched: false };
        });
        console.log(allCards);
        this.setState({
          cards: allCards
        });
      });
  };
  isItMatching = (type, id) => {
    console.log(this.state.lastCardFlipped)
    if (this.state.cards[id].id == id && this.state.lastCardFlipped.length === 0) {
      console.log("found");
      this.state.cards[id].flipped = true
      this.setState({
          lastCardFlipped:this.state.cards[id]
      })
      if(this.state.cards[id].id == id && this.state.lastCardFlipped.length === 0){
        console.log('value not empty')
      }
    }
  };
  render() {
    const { deckID, cards } = this.state;
    console.log(cards[1]);
    return (
      <div>
        <h1>{deckID}</h1>
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
                isItMatching={this.isItMatching}
              />
            );
          })}
        </div>
        <button onClick={this.handleNewGameClick}> new game </button>
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
CardGameContainer.propTypes = {};

export default CardGameContainer;
