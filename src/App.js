import React, { useState, useEffect } from 'react';
import './App.scss';
import Player from './Player';
import Dealer from './Dealer';
import Confetti from './Confetti';
import WinnerModal from './WinnerModal';
import axios from 'axios';
import { Transition } from 'react-transition-group';

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

	const [ inProp, setInProp ] = useState(true);
	const [ stand, setStand ] = useState(false);
	const [ winner, setWinner ] = useState('');

	const calculateValue = (person) => {
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
					score += 11;
				}
			});
			// 		if (count === 1 && person.name === 'dealer' && score >= 6 && score < 10) {
			// 			score += 1;
			// 			count--;
			// 		}
			// 		while (count > 0) {
			// 			if (person.name === 'dealer' && score >= 6 && score < 10) {
			// 				score += 1;
			// 			} else if (score <= 10) score += 11;
			// 			else score += 1;

			// 			count--;
			// 		}
			while (count > 0) {
				if (score > 21 || (person.name === 'dealer' && score <= player.score && score >= 17)) {
					console.log(score);
					score -= 10;
					count--;
				} else break;
			}

			person.name === 'player' ? setPlayer({ ...player, score }) : setDealer({ ...dealer, score });
		}

		return score;
	};
	const findWinner = () => {
		if (
			player.score === 21 ||
			(stand && ((dealer.score >= 17 && player.score >= dealer.score) || dealer.score > 21))
		) {
			//when player stands or blackjack
			setWinner('player');
			return;
		}

		//when player is hitting
		if (player.score > 21 || dealer.score === 21 || (stand && dealer.score > player.score)) {
			console.log(dealer);
			console.log(dealer.score);
			setWinner('dealer');
			return;
		}
	};

	const handleStand = () => {
		setStand(true);
	};

	const handleHit = () => {
		let newPlayer = player;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=1').then((res) => {
			newPlayer.cards = [ ...player.cards, ...res.data.cards ];
			setPlayer({ ...newPlayer });
		});
	};

	const dealerStandsOnSeventeen = () => {
		// if (winner !== '') return;
		if (stand === true && (dealer.score < 17 && dealer.score <= player.score) && winner === '') {
			console.log(winner);
			let newDealer = dealer;
			axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=1').then((res) => {
				newDealer.cards = [ ...dealer.cards, ...res.data.cards ];
				setDealer({ ...newDealer });
			});
		}
	};

	const handleShuffle = () => {
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/shuffle').then((res) => {
			console.log(res.data);
		});
	};

	//Initial game setup
	useEffect(() => {
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
			setPlayer({ ...player, cards: [ ...res.data.cards ] });
		});

		let newDealer = dealer;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
			newDealer.cards = res.data.cards;
			setDealer({ ...dealer, cards: [ ...res.data.cards ] });
		});
	}, []);

	//keeping the score updated
	useEffect(
		() => {
			calculateValue(dealer);
			calculateValue(player);
		},
		[ stand, player.cards, dealer.cards ]
	);

	//Check for Winner and if dealer reached 17 yet
	useEffect(
		() => {
			if (winner === '') {
				findWinner();
				if (stand) dealerStandsOnSeventeen();
			}
		},
		[ dealer.score, player.score ]
	);

	//if Winner is set then open dealer card
	useEffect(
		() => {
			if (winner !== '') {
				handleStand();
			}
		},
		[ winner ]
	);

	return (
		<div
			className="App"
			onClick={() => {
				setWinner('');
			}}>
			{winner === 'player' ? <Confetti /> : null}
			{winner !== '' ? <WinnerModal isOpen={winner !== ''} winner={winner} /> : null}

			<Transition in={true} timeout={2000} appear>
				{(state) => <h2 className={`heading-2 heading-2__${state}`}>Welcome to BlackJack 21!</h2>}
			</Transition>
			{/* <h2 className="heading-2">Welcome to BlackJack 21!</h2> */}
			<div className="board">
				<Player player={player} />
				<Dealer dealer={dealer} stand={stand} />
			</div>
			<span>{winner}</span>
			<button onClick={handleStand} className="btn btn__stand">
				Stand
			</button>
			<button onClick={handleShuffle} className="btn btn__stand">
				Shuffle
			</button>
			{stand || winner ? (
				<button onClick={handleHit} className="btn btn__hit btn__disabled" disabled>
					Hit
				</button>
			) : (
				<button onClick={handleHit} className="btn btn__hit">
					Hit
				</button>
			)}
		</div>
	);
}

export default App;
