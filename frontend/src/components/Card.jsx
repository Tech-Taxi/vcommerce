import React from 'react';

const Card = ({ cardeach }) => (
  <div className="flex">
    {cardeach.map((card, index) => (
      <div key={index} className="m-8">
        <img src={card.picture} alt={card.title} className="w-64 h-auto mb-2" />
        <h3 className="text-lg font-semibold">{card.title}</h3>
        <p className="text-sm">{card.description}</p>
      </div>
    ))}
  </div>
);

export default Card;
