import React from 'react';
import Card from './Cards';

export default function Dealer({ dealer, stand }) {
	return (
		<div className="dealer">
			<div className="score">
				<span>{dealer.score}</span>
			</div>
			<div className="cards">
				{dealer.cards.map((card, index) => {
					if (index === 0) {
						return <Card code={card.code} showCard={stand} key={index} />;
					}
					return <Card code={card.code} showCard={true} key={index} />;
				})}
			</div>
		</div>
	);
}
