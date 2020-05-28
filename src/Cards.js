import React, { Component } from 'react';

export default class Cards extends Component {
	canvas = React.createRef();

	componentDidMount() {
		this.drawCards();
	}

	drawCards = () => {
		const canvas = this.canvas.current;
		const ctx = canvas.getContext('2d');
		let img = new Image();

		img.onload = () => {
			//Card co-ordinates
			let cx, cy;

			//Card specs
			const cWidth = 79;
			const cHeight = 123;

			//Destination canvas co-ordinates
			const dx = 0;
			const dy = 0;

			//Destination specs
			const dWidth = 75;
			const dHeight = 112.5; // height to width ration = 3/2

			//if the card is turned down
			if (this.props.turnedDown) {
				cx = 2 * 79;
				cy = 4 * 123;
			} else if (this.props.code != null) {
				const code = this.props.code.split('');
				let suit, card;

				//if card numer is 10
				if (code.length > 2) {
					suit = code[2];
					card = code[0] + '' + code[1];
				} else {
					suit = code[1];
					card = code[0];
				}

				if (parseInt(card) >= 2 || parseInt(card) <= 10) {
					cx = (parseInt(card) - 1) * 79;
				} else {
					switch (card) {
						case 'A':
							cx = 0;
							break;
						case 'J':
							cx = 10 * 79;
							break;
						case 'Q':
							cx = 11 * 79;
							break;
						default:
							cx = 12 * 79;
							break;
					}
				}
				switch (suit) {
					case 'C':
						cy = 0;
						break;
					case 'D':
						cy = 123;
						break;
					case 'H':
						cy = 2 * 123;
						break;
					default:
						// spades
						cy = 3 * 123;
						break;
				}
			}

			ctx.drawImage(img, cx, cy, cWidth, cHeight, dx, dy, dWidth, dHeight);

			// ctx.drawImage(img, 0, 0, 79, 123, 0, 0, 75, 112.5);
		};

		img.src = 'http://math.hws.edu/eck/cs124/javanotes6/c13/cards.png';
	};

	render() {
		return <canvas ref={this.canvas} height="112.5" width="75" />;
	}
}
