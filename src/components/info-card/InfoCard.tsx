import React from "react";
import "./InfoCard.css";

interface InfoCardProps {
  title: string;
  boldText: string;
  description: string;
  image: string;
  alt: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  boldText,
  description,
  image,
  alt,
}) => {
  return (
    <div className="info-card">
      <div className="info-card-text">
        <span className="info-card-title">
          {title} <b>{boldText}</b>
        </span>
        <span className="info-card-description">{description}</span>
      </div>
      <img src={image} alt={alt} className="info-card-image" />
    </div>
  );
};

export default InfoCard;
