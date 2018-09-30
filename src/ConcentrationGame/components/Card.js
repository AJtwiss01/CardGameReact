import React from "react";

const Card = ({ id, type, code, flipped, matched, image, isItMatching }) => {
  const handleFlippClick = event => {
    event.preventDefault();

    isItMatching(type, id);
  };
  return (
    <img
      alt="Card to Flip"
      src={flipped ? image : "../assets/playing-card-back.png"}
      id={id}
      key={code}
      type={type}
      onClick={handleFlippClick}
      width="86px"
    />
  );
};

export default Card;
