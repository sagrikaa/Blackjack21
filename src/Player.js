import React from 'react';
import Card from './Card';
import Chips from './Chips';

export default function Player({ player, handleBet, bet }) {
	return (
		<div className="player">
			{bet ? (
				<React.Fragment>
					<div className="score">
						<span>{player.score}</span>
					</div>
					<div className="cards">
						{player.cards.map((card, index) => {
							// if (index === 0) return <Card code={card.code} key={index} showCard={true} index={index} />;
							return <Card code={card.code} key={index} showCard={true} customClass="player" />;
						})}
					</div>
				</React.Fragment>
			) : null}

			<div className="horizontal-div">
				<button onClick={() => handleBet(5)} className="btn btn__chips">
					$5
				</button>
				<button onClick={() => handleBet(10)} className="btn btn__chips">
					$10
				</button>
				<button onClick={() => handleBet(50)} className="btn btn__chips">
					$50
				</button>
				<button onClick={() => handleBet(100)} className="btn btn__chips">
					$100
				</button>
			</div>
			<h2 style={{ color: 'white', fontWeight: '300', fontSize: '3rem' }}>${player.money}</h2>
		</div>
	);
}
