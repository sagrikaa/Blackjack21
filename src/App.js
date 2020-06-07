import React, { useState, useEffect } from 'react';
import './App.scss';
import LandingPage from './LandingPage';
import Game from './Game';
import Settings from './Settings';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function App() {
	const [ play, setPlay ] = useState(0);
	const [ setting, handleSetting ] = useState(0);

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/game">
						<Game />
					</Route>
					<Route path="/settings">
						<Settings />
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
