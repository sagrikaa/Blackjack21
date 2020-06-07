import React from 'react';
import Card from './Card';
import Chips from './Chips';

export default function Player({ player, handleBet }) {
	return (
		<div className="player">
			<div className="score">
				<span>{player.score}</span>
			</div>
			<div className="cards">
				{player.cards.map((card, index) => {
					// if (index === 0) return <Card code={card.code} key={index} showCard={true} index={index} />;
					return <Card code={card.code} key={index} showCard={true} customClass="player" />;
				})}
			</div>
			<div className="bet">
				<Chips />
				<h2>${player.money}</h2>
				<button onClick={() => handleBet(5)} className="btn btn__stand">
					$5
				</button>
				<button onClick={() => handleBet(10)} className="btn btn__stand">
					$10
				</button>
				<button onClick={() => handleBet(50)} className="btn btn__stand">
					$50
				</button>
				<button onClick={() => handleBet(100)} className="btn btn__stand">
					$100
				</button>
			</div>
		</div>
	);
}
