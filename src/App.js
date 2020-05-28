import React from 'react';
import './App.scss';
import Cards from './Cards';
import Player from './Player';

import Dealer from './Dealer';
class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Player />
				<Dealer />
			</div>
		);
	}
}

export default App;
