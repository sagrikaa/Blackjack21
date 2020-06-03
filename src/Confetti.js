import React, { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
export default function Confetti() {
	const canvas = useRef();

	const myConfetti = confetti.create(canvas.current, {
		resize: true,
		useWorker: true
	});

	useEffect(() => {
		myConfetti({
			particleCount: 100,
			spread: 200
		});
		// return () => {
		// 	confetti.reset();
		// };
	}, []);

	return <div ref={canvas} />;
}
