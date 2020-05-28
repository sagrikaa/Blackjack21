import React from 'react';
import Cards from './Cards';
export default function Dealer() {
	return (
		<div className="dealer">
			Dealer
			<Cards code="7H" turnedDown={true} />
			<Cards code="10C" turnedDown={false} />
		</div>
	);
}
