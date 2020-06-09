import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Settings(props) {
	// const [ minBet, setMinBet ] = useState(props.minBet);
	// const [ cash, setCash ] = useState(props.cash);

	const handleBetChange = (event) => {
		props.setMinBet(event.target.value);
	};
	const handleCashChange = (event) => {
		const cash = event.target.value;
		props.setCash(cash);

		localStorage.setItem('money', cash);
	};
	return (
		<div>
			<div className="settings">
				<Transition in={true} timeout={2000} appear>
					{(state) => <h2 className={`heading-2 heading-2__${state}`}>Settings</h2>}
				</Transition>
				<form action="#" className="form">
					<div className="form_group">
						<input
							type="number"
							className="form_input"
							placeholder={props.minBet}
							id="min-bet"
							onChange={handleBetChange}
						/>
						<label htmlFor="min-bet" className="form_label">
							Minimum Bet
						</label>
					</div>

					<div className="form_group">
						<input
							type="number"
							className="form_input"
							placeholder={props.cash}
							id="cash"
							onChange={handleCashChange}
						/>
						<label htmlFor="cash" className="form_label">
							Starting Cash
						</label>
					</div>
				</form>
				<Link to="/game" className=" btn">
					{localStorage.getItem('money') > 0 ? 'Resume' : 'Play'}
					<FontAwesomeIcon icon={faPlay} className="icon" />
				</Link>
			</div>
		</div>
	);
}
