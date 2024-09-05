import React from "react";
import "./CardItem.css";

interface CardItemProps {
  imageUrl: string;
  name: string;
  city: string;
}

const CardItem: React.FC<CardItemProps> = ({ imageUrl, name, city }) => {
  return (
    <div className="hotel-card">
      <img
        src={imageUrl || "default-image.jpg"}
        className="hotel-image"
        alt={name}
      />
      <div className="hotel-details">
        <h2 style={{ width: "300px" }}>{name}</h2>
        <h2>{city}</h2>
      </div>
    </div>
  );
};

export default CardItem;
