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
			// Draw slice
			// ctx.drawImage(img, 0, 0, 60, 123, 4 * 123, 2 * 70, 4 * 123 + 79, 2 * 70 + 123);

			ctx.drawImage(img, 0, 0, 79, 123, 0, 0, 75, 112.5);
		};
		img.src = 'http://math.hws.edu/eck/cs124/javanotes6/c13/cards.png';
	};
	render() {
		return <canvas ref={this.canvas} height="112.5" width="75" />;
	}
}
