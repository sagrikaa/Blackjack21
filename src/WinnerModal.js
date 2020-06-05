import React from 'react';
import ReactModal from 'react-modal';

export default function WinnerModal({ isOpen, winner }) {
	// const customStyles = {
	// 	content: {
	// 		backgroundColor: 'transparent',
	// 		color: 'black'
	// 	}
	// };

	return (
		<div>
			{/* <ReactModal isOpen={winner !== ''} contentLabel="Example Modal" style={customStyles} />hello
			<ReactModal /> */}
			<ReactModal
				isOpen={isOpen}
				contentLabel="Minimal Modal Example"
				style={{
					overlay: {
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0,0,0, 0.4)'
					},
					content: {
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						top: '40px',
						left: '40px',
						right: '40px',
						bottom: '40px',
						background: 'transparent',
						overflow: 'auto',
						WebkitOverflowScrolling: 'touch',
						// borderRadius: '4px',
						border: 'none',
						outline: 'none',
						padding: '20px',
						textTransform: 'uppercase',
						fontSize: '3rem'
					}
				}}>
				<p>{winner === 'player' ? 'Congratulations!! You won the bet' : 'You lost. Better Luck Next time!'}</p>
			</ReactModal>
		</div>
	);
}
