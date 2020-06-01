import React, { useState, useEffect } from 'react';
import './App.scss';
import Player from './Player';
import Dealer from './Dealer';
import axios from 'axios';
function App() {
	// state = {
	// 	player: {
	// 		name: 'player',
	// 		cards: [],
	// 		score: 0,
	// 		money: 2000
	// 	},
	// 	dealer: {
	// 		name: 'dealer',
	// 		cards: [],
	// 		score: 0,
	// 		showCard: false
	// 	},
	// 	winner: ''
	// };

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

	const playerStand = () => {
		// this.setState((prevState) => ({
		// 	dealer: {
		// 		...prevState.dealer,
		// 		showCard: true
		// 	}
		// }));

		setStand(true);
		if (stand === true) calculateValue(dealer);
		//dealer opens his second card
		//Calculate value of dealer cards and player cards
		/**
       * 1. if dealer score >= 17, compare two values and declare winner
       * 2. if dealer score < 17, draw another card for dealer=> compare two values and declare winner
      */
		// if player.score < dealer.score && dealer.score < 17, draw more cards
		//if player.score>dealer.score && player.score <= 21 ==> player wins
		//
	};
	const hit = () => {
		let newPlayer = player;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=1').then((res) => {
			newPlayer.cards = [ ...player.cards, ...res.data.cards ];
			setPlayer({ ...newPlayer });
			// calculateValue(player);
		});
	};

	useEffect(
		() => {
			//keeping the score updated
			calculateValue(dealer);
			calculateValue(player);
		},
		[ stand, player.cards, dealer.cards ]
	);
	useEffect(() => {
		//Initial game set up
		let newPlayer = player;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
			newPlayer.cards = res.data.cards;
			setPlayer({ ...newPlayer });
			const pScore = calculateValue(player);
		});

		let newDealer = dealer;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
			newDealer.cards = res.data.cards;
			setDealer({ ...newDealer });
			const dScore = calculateValue(dealer);
		});
	}, []);

	return (
		<div className="App">
			{/* <button onClick={play} className="btn btn__play">
				Play
			</button> */}
			<button onClick={() => setStand(true)} className="btn btn__play">
				Stand
			</button>
			<button onClick={hit} className="btn btn__play">
				Hit
			</button>

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
