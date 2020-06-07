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
		money: 2000,
		bet: 0
	});

	const [ dealer, setDealer ] = useState({
		name: 'dealer',
		cards: [],
		score: 0,
		showCard: false
	});
	const [ refresh, setRefresh ] = useState(0);
	const [ stand, setStand ] = useState(false);
	const [ winner, setWinner ] = useState('');
	const [ isOpen, setIsOpen ] = useState(false);

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

			while (count > 0) {
				if (score > 21 || (person.name === 'dealer' && score <= player.score && score >= 17)) {
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
			console.log(player.score);
			console.log(dealer.score);
			console.log(stand);
			//when player stands or blackjack
			setWinner('player');
			return;
		}

		//when player is hitting
		if (player.score > 21 || dealer.score === 21 || (stand && dealer.score > player.score)) {
			console.log(player.score);
			console.log(dealer.score);
			console.log(stand);
			setWinner('dealer');
			return;
		}
	};

	const dealerStandsOnSeventeen = () => {
		if (stand === true && (dealer.score < 17 && dealer.score <= player.score) && winner === '') {
			let newDealer = dealer;
			axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=1').then((res) => {
				newDealer.cards = [ ...dealer.cards, ...res.data.cards ];
				setDealer({ ...newDealer });
			});
		}
	};

	const handleBet = (amount) => {
		let newBet = player.bet + amount;
		setPlayer({ ...player, bet: newBet });
	};

	const handleHit = () => {
		let newPlayer = player;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=1').then((res) => {
			newPlayer.cards = [ ...player.cards, ...res.data.cards ];
			setPlayer({ ...newPlayer });
		});
	};

	const handleShuffle = () => {
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/shuffle').then((res) => {
			console.log(res.data);
		});
	};

	const handleStand = () => {
		setStand(true);
	};

	const handleRefresh = () => {
		console.log(player.money);
		console.log(winner);
		if (player.money >= 10 && winner !== '') {
			console.log('refresh');

			setPlayer({ ...player, bet: 0 });
		}
	};

	const saveGameState = () => {
		localStorage.setItem('player', player);
		localStorage.setItem('dealer', dealer);
	};

	//Initial game setup
	useEffect(
		() => {
			let money;
			if (!localStorage.getItem('money')) localStorage.setItem('money', 1500);
			else money = localStorage.getItem('money');
			if (player.bet !== 0) {
				axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
					setPlayer({ ...player, money: money, cards: [ ...res.data.cards ] });
				});

				axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
					setDealer({ ...dealer, cards: [ ...res.data.cards ] });
				});
			}
		},
		[ player.  bet ]
	);

	// useEffect(() => {
	// 	localStorage.setItem('player', JSON.stringify(player));
	// 	localStorage.setItem('dealer', JSON.stringify(dealer));
	// });

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
				console.log(winner);
				handleStand();
				setIsOpen(true);
				let newMoney = player.money;
				if (winner === 'dealer') {
					newMoney -= player.bet;
				} else {
					newMoney += player.bet;
				}
				setPlayer({ ...player, money: newMoney });
			}
		},
		[ winner ]
	);

	return (
		<div className="game animate__animated animate__zoomIn animate__slower">
			{winner === 'player' ? <Confetti /> : null}
			{/* {winner !== '' ? <WinnerModal isOpen={true} winner={winner} /> : null} */}

			<Transition in={true} timeout={2000} appear>
				{(state) => <h2 className={`heading-2 heading-2__${state}`}>Welcome to BlackJack 21!</h2>}
			</Transition>
			<button onClick={handleRefresh} className="btn btn__stand">
				Refresh
			</button>
			<h3>{player.bet}</h3>
			<div className="board">
				<Player player={player} handleBet={handleBet} />
				<Dealer dealer={dealer} stand={stand} />
			</div>
			<span>{winner}</span>
			<button onClick={handleStand} className="btn btn__stand">
				Stand
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
			<button onClick={handleShuffle} className="btn btn__stand">
				Shuffle
			</button>
		</div>
	);
}

export default App;
