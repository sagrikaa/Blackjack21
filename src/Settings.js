import React from 'react';
import { Transition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Settings() {
	return (
		<div>
			{' '}
			<div className="landing-page">
				<Transition in={true} timeout={2000} appear>
					{(state) => <h2 className={`heading-2 heading-2__${state}`}>BlackJack 21</h2>}
				</Transition>
				<div className="horizontal-div">
  				</div>
			</div>
		</div>
	);
}
