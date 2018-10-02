import React from "react";

const enhanceFunctionWithOnEnter = (cb) => (event) => {
   if(event.key === "Enter"){
     cb(event)
   }
}

const Card = ({ id, type, value, suit, code, flipped, matched, image, updateFlipCardStatus }) => {
  const handleFlippClick = event => {
    event.preventDefault();
    updateFlipCardStatus(id);
  };
  return (
    <img
      onKeyPress={enhanceFunctionWithOnEnter(handleFlippClick)}
      alt={flipped ? `This card is the ${value} of ${suit}`:`Card to Flip`}
      tabIndex="0"
      src={flipped ? image : "../assets/playing-card-back.png"}
      id={id}
      key={code}
      type={type}
      onClick={handleFlippClick}
      style={matched ? {visibility: "hidden"}:{cursor: 'pointer'}}
      width="86px"
    />
  );
};

export default Card;
