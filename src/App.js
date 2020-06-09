import React, { useState } from 'react';
import './App.scss';
import LandingPage from './LandingPage';
import Game from './Game';
import Settings from './Settings';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
	const [ minBet, setMinBet ] = useState(100);
	const [ cash, setCash ] = useState(2000);
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/game">
						<Game minBet={minBet} cash={cash} />
					</Route>
					<Route path="/settings">
						<Settings minBet={minBet} cash={cash} setMinBet={setMinBet} setCash={setCash} />
					</Route>
					<Route exact path="/">
						<LandingPage />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
