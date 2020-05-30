import React, { useState, useEffect } from 'react';
import Card from './Cards';

export default function Dealer({ dealer }) {
	return (
		<div className="dealer">
			<div className="card-value">
				<span>value</span>
			</div>
			<div className="cards">
				{dealer.cards.map((card, index) => {
					if (index === 0) {
						console.log(dealer.showCard);
						return <Card code={card.code} showCard={dealer.showCard} key={index} />;
					}
					return <Card code={card.code} showCard={true} key={index} />;
				})}
			</div>
		</div>
	);
}
