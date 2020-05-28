import React from 'react';
import Cards from './Cards';

export default function Player() {
	return (
		<div className="player">
			Player
			<Cards code="AH" turnedDown={false} />
			<Cards code="KS" turnedDown={false} />
		</div>
	);
}
