import React, { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';

export default function Card(props) {
	const canvas = useRef();

	useEffect(
		() => {
			drawCard();
		},
		[ props ]
	);

	const drawCard = () => {
		const destination = canvas.current;
		const ctx = destination.getContext('2d');
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
			let x = window.matchMedia('(max-width: 600px)');
			if (x.matches) {
				// If media query matches
				destination.width = 60;
				destination.height = 90;
			}
			const dWidth = 75;
			const dHeight = 112.5; // height to width ratio = 3/2
			//if the card is turned down
			if (props.showCard === false) {
				cx = 2 * 79;
				cy = 4 * 123;
			} else if (props.code != null) {
				const code = props.code.split('');
				let suit, card;
				suit = code[1];
				card = code[0];
				// }

				if (parseInt(card) >= 2 && parseInt(card) <= 9) {
					if (parseInt(card) === 0) {
					}
					cx = (parseInt(card) - 1) * 79;
				} else {
					switch (card) {
						case 'A':
							cx = 0;
							break;
						case '0':
							cx = 9 * 79;
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
			ctx.drawImage(img, cx, cy, cWidth, cHeight, dx, dy, destination.width, destination.height);
		};

		img.src = 'http://math.hws.edu/eck/cs124/javanotes6/c13/cards.png';
	};

	return (
		<Transition in={true} timeout={2000} appear>
			{(state) => (
				<canvas ref={canvas} height="112.5" width="75" className={`card card-${props.customClass}__${state}`} />
			)}
		</Transition>
	);
}
