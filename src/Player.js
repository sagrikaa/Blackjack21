import React from 'react';
import Card from './Cards';

export default function Player(props) {
	const player = props.player;
	return (
		<div className="player">
			<div className="card-value">
				<span>Value</span>
			</div>
			<div className="cards">
				{player.cards.map((card, index) => {
					if (index === 0) return <Card code="0C" key={index} showCard={true} />;
					return <Card code={card.code} key={index} showCard={true} />;
				})}
			</div>
		</div>
	);
}
