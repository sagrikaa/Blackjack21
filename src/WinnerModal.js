import React from 'react';
import ReactModal from 'react-modal';

export default function WinnerModal({ isOpen, resetGame, winner }) {
	const handleClose = () => {
		resetGame();
	};
	return (
		<div>
			<ReactModal
				isOpen={isOpen}
				onRequestClose={handleClose}
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
						backgroundColor: 'rgba(0,0,0, 0.4)'
					},
					content: {
						position: 'unset',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						background: 'transparent',
						overflow: 'auto',
						WebkitOverflowScrolling: 'touch',
						borderRadius: '4px',
						outline: 'none',
						border: 'none',
						padding: '20px',
						textTransform: 'uppercase',
						fontSize: '3rem',
						color: 'white'
					}
				}}>
				<p>{winner === 'player' ? 'Congratulations!! You won the bet' : 'You lost. Better Luck Next time!'}</p>
			</ReactModal>
		</div>
	);
}
