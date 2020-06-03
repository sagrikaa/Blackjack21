import React from 'react';
import Card from './Card';

export default function Dealer({ dealer, stand }) {
	return (
		<div className="dealer">
			<div className="score">
				<span>{dealer.score}</span>
			</div>
			<div className="cards">
				{dealer.cards.map((card, index) => {
					if (index === 0) {
						return <Card code={card.code} showCard={stand} key={index} customClass="dealer" />;
					}
					return <Card code={card.code} showCard={true} key={index} customClass="dealer" />;
				})}
			</div>
		</div>
	);
}
