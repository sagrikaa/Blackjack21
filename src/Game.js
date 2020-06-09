import React, { useState, useEffect } from 'react';
import './App.scss';
import Player from './Player';
import Dealer from './Dealer';
import Confetti from './Confetti';
import WinnerModal from './WinnerModal';
import axios from 'axios';
import { Transition } from 'react-transition-group';
import { Link, Redirect } from 'react-router-dom';
import AlertModal from './AlertModal';

function Game({ minBet, cash }) {
	const [ player, setPlayer ] = useState({
		name: 'player',
		cards: [],
		score: 0,
		money: parseInt(localStorage.getItem('money')) || cash,
		bet: 0
	});

	const [ dealer, setDealer ] = useState({
		name: 'dealer',
		cards: [],
		score: 0,
		showCard: false
	});

	const [ shuffle, setShuffle ] = useState(false);
	//variable to determine if the bet is being played
	const [ bet, setBet ] = useState(false);

	//varibale to determine if player stands with the dealt hand
	const [ stand, setStand ] = useState(false);

	//varibale to determine the winner of the game
	const [ winner, setWinner ] = useState('');

	//variable to determine if the modal is open
	const [ isOpen, setIsOpen ] = useState(false);

	const [ redirect, setRedirect ] = useState(false);
	const calculateValue = (person) => {
		let score = 0;
		let count = 0;
		if (person && person.cards.length !== 0) {
			person.cards.forEach((ele, index) => {
				//Do not calculate the value of the first card of dealers hand until player stands
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
		//when player stands or blackjack
		if (
			player.score === 21 ||
			(stand && ((dealer.score >= 17 && player.score >= dealer.score) || dealer.score > 21))
		) {
			setWinner('player');
			return;
		}

		//when player is hitting
		if (player.score > 21 || dealer.score === 21 || (stand && dealer.score > player.score)) {
			setWinner('dealer');
			return;
		}
	};

	//func to draw cards for the dealer till it reaches a minimum score of 17
	const dealerStandsOnSeventeen = () => {
		if (stand === true && (dealer.score < 17 && dealer.score <= player.score) && winner === '') {
			let newDealer = dealer;
			axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=1').then((res) => {
				newDealer.cards = [ ...dealer.cards, ...res.data.cards ];
				setDealer({ ...newDealer });
				checkShuffle(res.data.remaining);
			});
		}
	};

	// if the bet has been set then deal hand to both player and dealer
	const dealHand = () => {
		if (player.bet !== 0) setBet(true);
	};

	//function to set bet for player
	const handleBet = (amount) => {
		let newBet = player.bet + amount;
		if (!(newBet <= player.money)) newBet = player.money;
		setPlayer({ ...player, bet: newBet });
	};

	//function to generate card for player's each hit
	const handleHit = () => {
		let newPlayer = player;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=1').then((res) => {
			newPlayer.cards = [ ...player.cards, ...res.data.cards ];
			setPlayer({ ...newPlayer });
			checkShuffle(res.data.remaining);
		});
	};

	const handleShuffle = (func) => {
		console.log('shuffle');
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/shuffle').then((res) => {
			checkShuffle(res.data.remaining);
		});
	};

	const checkShuffle = (data) => {
		if (data === 0) {
			setShuffle(true);
			setBet(false);
		} else setShuffle(false);
	};
	//Initial game setup
	useEffect(
		() => {
			console.log('here');
			if (!localStorage.getItem('money') || localStorage.getItem('money') === 0)
				localStorage.setItem('money', player.money);
			if (bet === true) {
				axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
					setPlayer({ ...player, cards: [ ...res.data.cards ] });
					checkShuffle(res.data.remaining);
				});

				axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
					setDealer({ ...dealer, cards: [ ...res.data.cards ] });
					checkShuffle(res.data.remaining);
				});
			}
		},
		[ bet ]
	);

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

	const resetGame = () => {
		setBet(false);
		setStand(false);
		setIsOpen(false);
		setWinner('');

		if (player.money <= 0) {
			console.log('reset');
			localStorage.removeItem('money');
			setRedirect(true);
		}
	};
	//if Winner is set then open dealer card
	useEffect(
		() => {
			if (winner !== '') {
				console.log(winner);
				let newMoney = player.money;
				if (winner === 'dealer') {
					newMoney -= player.bet;
				} else {
					newMoney += player.bet;
				}
				setStand(true);
				setIsOpen(true);
				// setBet(false);
				setPlayer({ ...player, bet: 0, money: newMoney });
				localStorage.setItem('money', newMoney);
			}
		},
		[ winner ]
	);

	return (
		<div className="game animate__animated animate__zoomIn animate__slower">
			{/* display winner using a modal and cofetti  */}
			<Transition in={true} timeout={2000} appear>
				{(state) => <h2 className={`heading-2 heading-2__${state}`}>Welcome to BlackJack 21!</h2>}
			</Transition>
			{winner === 'player' ? <Confetti /> : null}
			{console.log(isOpen)}
			<WinnerModal isOpen={isOpen} winner={winner} resetGame={resetGame} setIsOpen={setIsOpen} />
			{shuffle === true ? (
				<AlertModal isOpen={shuffle}>
					<p>Sorry! No more cards in the deck left. Shuffle to keep playing.</p>
					<button onClick={handleShuffle} className="btn btn__hit">
						Shuffle
					</button>
				</AlertModal>
			) : null}
			<h3 style={{ color: 'white', fontWeight: '300', fontSize: '3rem' }}>
				{player.bet ? `$${player.bet}` : null}
			</h3>
			{redirect === false ? (
				<button onClick={dealHand} className="btn btn__bet">
					Place bet
				</button>
			) : (
				<Redirect to="/" />
			)}

			<div className="board">
				<Player player={player} handleBet={handleBet} bet={bet} minBet={minBet} />
				{bet ? <Dealer dealer={dealer} stand={stand} /> : null}
			</div>
			{bet ? (
				<div className="horizontal-div">
					<button
						onClick={() => {
							setStand(true);
						}}
						className="btn btn__stand">
						Stand
					</button>
					{!(stand || winner) ? (
						<button onClick={handleHit} className="btn btn__hit">
							Hit
						</button>
					) : null}
				</div>
			) : null}
		</div>
	);
}

export default Game;
