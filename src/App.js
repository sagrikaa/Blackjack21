import React, { useState, useEffect } from 'react';
import './App.scss';
import LandingPage from './LandingPage';
import Game from './Game';
import Settings from './Settings';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function App() {
	const [ play, setPlay ] = useState(0);
	const [ setting, handleSetting ] = useState(0);
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
						<LandingPage play={play} setPlay={setPlay} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
