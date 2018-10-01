import React from "react";

const Card = ({ id, type, code, flipped, matched, image, flippingState }) => {
  const handleFlippClick = event => {
    event.preventDefault();
    flippingState(id);
  };
  return (
    <img
      alt="Card to Flip"
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
