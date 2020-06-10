import React from 'react';
import ReactModal from 'react-modal';

export default function AlertModal(props) {
	return (
		<div>
			<ReactModal
				isOpen={props.isOpen}
				onRequestClose={() => {
					props.setIsOpen(false);
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
						backgroundColor: 'rgba(0,0,0, 0.7)'
					},
					content: {
						position: 'unset',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
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
				{props.children}
			</ReactModal>
		</div>
	);
}
