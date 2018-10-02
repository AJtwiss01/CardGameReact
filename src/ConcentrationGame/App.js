import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import { cx,css } from "emotion";
import CardGameContainer from './CardGameContainer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        cards: [],
        loading: false
        };
      }

      componentDidMount() {
        this.gameSetup()
      }

      gameSetup = () => {
        this.setState({
          loading: true
        });
        setTimeout(() => {
          axios
            .get(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
            .then(res => {
              const cards = res.data.cards.map((card) => {
                  console.log(card)
                return {...card, flipped: false, matched: false };
              });
              console.log(cards);
              this.setState({
                cards,
                loading: false
              })
            });
        }, 1000);
      };
    render() {
        const {cards, loading} = this.state
        if (loading) return<div className={`loader ${classNames.loaderDiv}`}></div>
        return (
            <CardGameContainer gameSetup={this.gameSetup} cards={cards}/>
        );
    }
}

App.propTypes = {

};

const classNames = {
  loaderDiv: css`
   display: flex;
   justify-content: center;;
   margin: 0 auto
  `
}
export default App;