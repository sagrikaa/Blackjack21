import React from 'react';
import Card from './Card';

export default function Player(props) {
	const player = props.player;
	return (
		<div className="player">
			<div className="score">
				<span>{player.score}</span>
			</div>
			<div className="cards">
				{console.log(player)}
				{player.cards.map((card, index) => {
					// if (index === 0) return <Card code={card.code} key={index} showCard={true} index={index} />;
					return <Card code={card.code} key={index} showCard={true} customClass="player" />;
				})}
			</div>
		</div>
	);
}
