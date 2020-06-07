import React from 'react';

export default function Chips({ onClick }) {
	return (
		<div>
			<img
				src="https://img.pngio.com/red-poker-chips-poker-chips-png-496912-pngtube-poker-chip-png-587_587.png"
				alt="Red Poker Chips - poker chips png #496912 - Pngtube"
				className="chip chip__red"
				onClick={onClick}
			/>
			<img
				src="https://img.pngio.com/poker-chips-png-image-purepng-free-transparent-cc0-png-image-poker-chip-png-1911_1400.png"
				alt=""
				className="chip chip__red"
			/>
		</div>
	);
}
