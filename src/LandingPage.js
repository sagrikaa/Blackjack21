import React from 'react';
import { Transition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export default function LandingPage({ handlePlay, handleSetting }) {
	return (
		<div className="landing-page">
			<Transition in={true} timeout={2000} appear>
				{(state) => <h2 className={`heading-2 heading-2__${state}`}>BlackJack 21</h2>}
			</Transition>
			<div className="horizontal-div">
				<Link to="/game" className=" btn btn__play">
					Play
					<FontAwesomeIcon icon={faPlay} className="icon" />
				</Link>

				<Link to="/settings" className=" btn btn__setting">
					Settings <FontAwesomeIcon icon={faCog} className="icon " />
				</Link>
			</div>
		</div>
	);
}
