import React from "react";
import "./CardItem.css";
import Button from "../Button/Button";
import useIsMobile from "@/app/hooks/useIsMobile";

interface CardItemProps {
  imageUrl: string;
  name: string;
  address: string;
  distanceToCenter: number;
}

const CardItem: React.FC<CardItemProps> = ({
  imageUrl,
  name,
  address,
  distanceToCenter,
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="hotel-card">
      <img
        src={imageUrl || "default-image.jpg"}
        className="hotel-image"
        alt={name}
        loading="lazy"
      />
      <div className="hotel-details">
        <h2>{name || "--"}</h2>
        <p>{address || "--"}</p>
        <h4>Center: {distanceToCenter.toFixed(2)}km</h4>
        {!isMobile && <Button label="Book Now" />}
      </div>
    </div>
  );
};

export default CardItem;
