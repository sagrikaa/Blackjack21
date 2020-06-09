import React from 'react';
import Card from './Card';

export default function Player({ player, handleBet, bet, minBet }) {
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
				<button onClick={() => handleBet(minBet)} className="btn btn__chips">
					Min Bet
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
				<button onClick={() => handleBet(500)} className="btn btn__chips">
					$500
				</button>
			</div>
			<h2 style={{ color: 'white', fontWeight: '300', fontSize: '3rem' }}>${player.money}</h2>
		</div>
	);
}
