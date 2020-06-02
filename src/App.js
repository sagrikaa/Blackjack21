import React, { useState, useEffect } from 'react';
import './App.scss';
import Player from './Player';
import Dealer from './Dealer';
import axios from 'axios';
function App() {
	const [ player, setPlayer ] = useState({
		name: 'player',
		cards: [],
		score: 0,
		money: 2000
	});

	const [ dealer, setDealer ] = useState({
		name: 'dealer',
		cards: [],
		score: 0,
		showCard: false
	});

	const [ stand, setStand ] = useState(false);
	const [ winner, setWinner ] = useState('');

	const calculateValue = (person) => {
		console.log(person);
		let score = 0;
		let count = 0;
		if (person && person.cards.length !== 0) {
			person.cards.forEach((ele, index) => {
				if (person.name === 'dealer' && !stand && index === 0) return;

				const cardNumber = ele.code.split('')[0];
				if (parseInt(cardNumber) >= 2 && parseInt(cardNumber) <= 9) score += parseInt(cardNumber);
				else if (cardNumber === 'J' || cardNumber === 'K' || cardNumber === 'Q' || cardNumber === '0')
					score += 10;
				else {
					count++;
				}
			});

			while (count > 0) {
				if (score <= 10) score += 11;
				else score += 1;
				count--;
			}

			person.name === 'player' ? setPlayer({ ...player, score }) : setDealer({ ...dealer, score });
		}

		return score;
	};

	const findWinner = () => {
		//when player is hitting
		if (player.score > 21) {
			setWinner('dealer');
		}
		if (stand && dealer.score > player.score) setWinner('dealer');
		if (dealer.score === 21) setWinner(dealer);
		if (
			player.score === 21 ||
			(stand && ((dealer.score >= 17 && player.score > dealer.score) || dealer.score > 21))
		)
			//when player stands or blackjack
			setWinner('player');
	};

	const playerStand = () => {
		setStand(true);
	};

	const hit = () => {
		let newPlayer = player;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=1').then((res) => {
			newPlayer.cards = [ ...player.cards, ...res.data.cards ];
			setPlayer({ ...newPlayer });
		});
	};

	const dealerStandsOnSeventeen = () => {
		if (stand === true && !winner && dealer.score < 17) {
			let newDealer = dealer;
			axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=1').then((res) => {
				newDealer.cards = [ ...dealer.cards, ...res.data.cards ];
				setDealer({ ...newDealer });
			});
		}
	};

	// useEffect(
	// 	() => {
	// 		if (winner.length !== 0) playerStand();
	// 	},
	// 	[ winner ]
	// );

	useEffect(
		() => {
			//keeping the score updated
			calculateValue(dealer);
			calculateValue(player);
		},
		[ stand, player.cards, dealer.cards ]
	);

	//Check for Winner and if dealer reached 17 yet
	useEffect(
		() => {
			//Check if the player stands and dealer is at 17 yet
			dealerStandsOnSeventeen();

			//check winner for every score change
			findWinner();
		},
		[ dealer.score, player.score ]
	);

	//Initial game setup
	useEffect(() => {
		//Initial game set up with two cards each
		let newPlayer = player;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
			newPlayer.cards = res.data.cards;
			setPlayer({ ...player, cards: [ ...res.data.cards ] });
		});

		let newDealer = dealer;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
			newDealer.cards = res.data.cards;
			setDealer({ ...dealer, cards: [ ...res.data.cards ] });
		});
	}, []);

	return (
		<div className="App">
			{/* <button onClick={play} className="btn btn__play">
				Play
			</button> */}
			<span>{winner}</span>
			<button onClick={playerStand} className="btn btn__stand">
				Stand
			</button>
			{stand || winner ? (
				<button onClick={hit} className="btn btn__hit btn__disabled" disabled>
					Hit
				</button>
			) : (
				<button onClick={hit} className="btn btn__hit">
					Hit
				</button>
			)}

			<div className="board">
				<Player player={player} />
				<Dealer dealer={dealer} stand={stand} />
			</div>
		</div>
	);
}

export default App;

// const blackJack = (name, opponent, score) => {
// 	if (score === 21) {
// 		this.setState({ winner: name });
// 		return;
// 	}

// 	if (score > 21) {
// 		this.setState({ winner: opponent });
// 		return;
// 	}
// };
