import React from 'react';
import './App.scss';
import Player from './Player';
import Dealer from './Dealer';
import axios from 'axios';
class App extends React.Component {
	state = {
		player: {
			cards: [],
			score: 0,
			money: 2000
		},
		dealer: {
			cards: [],
			score: 0,
			showCard: false
		}
	};

	calculateValue = () => {};

	stand = () => {
		this.setState((prevState) => ({
			dealer: {
				...prevState.dealer,
				showCard: true
			}
		}));
	};

	hit = () => {};
	componentDidMount = () => {
		let player = this.state.player;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
			player.cards = res.data.cards;
			this.setState({ player });
		});

		let dealer = this.state.dealer;
		axios.get('https://deckofcardsapi.com/api/deck/mbj29hqt3euq/draw/?count=2').then((res) => {
			dealer.cards = res.data.cards;

			this.setState({ dealer });
		});
	};

	render() {
		return (
			<div className="App">
				<button onClick={this.play} className="btn btn__play">
					Play
				</button>
				<button onClick={this.stand} className="btn btn__play">
					Stand
				</button>
				<button onClick={this.hit} className="btn btn__play">
					Hit
				</button>

				<div className="board">
					<Player player={this.state.player} />
					<Dealer dealer={this.state.dealer} />
				</div>
			</div>
		);
	}
}

export default App;
