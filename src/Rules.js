import React from 'react';
import ReactModal from 'react-modal';

export default function Rules({ showRules, setShowRules }) {
	return (
		<div>
			<ReactModal
				isOpen={showRules}
				onRequestClose={() => {
					setShowRules(false);
				}}
				ariaHideApp={false}
				style={{
					overlay: {
						position: 'fixed',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0,0,0, 0.7)',
						padding: '5rem'
					},
					content: {
						position: 'unset',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						background: 'rgb(19,91,13)',
						WebkitOverflowScrolling: 'touch',
						borderRadius: '4px',
						outline: 'none',
						border: 'none',
						overflow: 'auto',
						padding: '3rem 1rem 2rem 3rem',
						fontSize: '1.6rem',
						color: 'white'
					}
				}}>
				<div>
					<h4>Players are each dealt two cards, face up or down depending on the casino and the table</h4>
					<ul>
						<li>
							The value of cards two through ten is their pip value (2 through 10). Face cards (Jack,
							Queen, and King) are all worth ten
						</li>
						<li>Aces can be worth one or eleven</li>
						<li> A hand's value is the sum of the card values</li>
						<li> Players are allowed to draw additional cards to improve their hands</li>
						<li>
							A hand with an ace valued as 11 is called "soft", meaning that the hand will not bust by
							taking an additional card.The value of the ace will become one to prevent the hand from
							exceeding 21. Otherwise, the hand is called "hard".
						</li>
						<li>
							Once all the players have completed their hands, it is the dealer's turn. The dealer hand
							will not be completed if all players have either busted or received blackjacks. The dealer
							then reveals the hidden card and must hit until the cards total up to 17 points. At 17
							points or higher the dealer must stay.
						</li>
						<li>
							You are betting that you have a better hand than the dealer. The better hand is the hand
							where the sum of the card values is closer to 21 without exceeding 21.
						</li>
					</ul>
					<br />
					<h4>The detailed outcome of the hand follows:</h4>
					<ul>
						<li>
							If the player is dealt an Ace and a ten-value card (called a "blackjack" or "natural"), and
							the dealer does not, the player wins and usually receives a bonus
						</li>
						<li>
							If the player exceeds a sum of 21 ("busts"); the player loses, even if the dealer also
							exceeds 21
						</li>
						<li>If the dealer exceeds 21 ("busts") and the player does not; the player wins</li>
						<li>
							If the player attains a final sum higher than the dealer and does not bust; the player wins
						</li>
					</ul>
				</div>
			</ReactModal>
		</div>
	);
}
