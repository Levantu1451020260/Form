
    // Fireworks animation: launch from bottom, then explode


	// Birthday cake and text animation with improved cake movement
	(function() {
		const texts = ["Happy Birthday!", "生日快樂"];
		let currentTextIndex = 0;
		let lastSwitch = Date.now();
		const switchInterval = 2500; // ms
		const fadeDuration = 700; // ms

		function animateCakeAndText() {
			const cake = document.getElementById('birthday-cake');
			const flame1 = document.getElementById('flame1');
			const flame2 = document.getElementById('flame2');
			const flame3 = document.getElementById('flame3');
			const flameGlow = document.getElementById('flame-glow');
			const icingDrip = document.getElementById('icing-drip');
			const text = document.getElementById('happy-birthday-text');
			if (!cake || !flame1 || !flame2 || !flame3 || !flameGlow || !icingDrip || !text) {
				requestAnimationFrame(animateCakeAndText);
				return;
			}
			// Add fade class if not present
			if (!text.classList.contains('fade-text')) {
				text.classList.add('fade-text', 'show-text');
			}
			let t = 0;
			let switching = false;
			function frame() {
				t += 0.06;
				// Candle flames flicker
				const flicker1 = 4 + Math.sin(t*2 + 0.5)*0.7 + Math.random()*0.5;
				const flicker2 = 4 + Math.cos(t*2 - 0.5)*0.7 + Math.random()*0.5;
				const flicker3 = 5 + Math.sin(t*2.5)*1.1 + Math.random()*0.7;
				const glow = 2 + Math.abs(Math.sin(t*2))*1.2 + Math.random()*0.5;
				flame1.setAttribute('ry', flicker1);
				flame2.setAttribute('ry', flicker2);
				flame3.setAttribute('ry', flicker3);
				flameGlow.setAttribute('ry', glow);

				// Cake movement: gentle bounce + slight rotation + scale
				const bounce = Math.sin(t*1.2)*6 + Math.sin(t*0.3)*2;
				const rotate = Math.sin(t*0.7) * 2.5; // degrees
				const scaleX = 1 + Math.sin(t*1.2)*0.012;
				const scaleY = 1 - Math.sin(t*1.2)*0.012;
				cake.setAttribute(
					'transform',
					`translate(0,${bounce}) scale(${scaleX},${scaleY}) rotate(${rotate},170,180)`
				);

				// Icing drip wiggle
				const dripY = 62 + Math.sin(t*1.5)*1.2;
				const dripPath = `M65 ${dripY} Q70 ${dripY+8} 75 ${dripY} Q80 ${dripY+8+Math.sin(t)*1.5} 85 ${dripY} Q90 ${dripY+8} 95 ${dripY}`;
				icingDrip.setAttribute('d', dripPath);

				const now = Date.now();
				// Fade out, switch text, fade in with slide effect
				if (!switching && now - lastSwitch > switchInterval) {
					switching = true;
					text.classList.remove('show-text');
					setTimeout(() => {
						currentTextIndex = (currentTextIndex + 1) % texts.length;
						const base = texts[currentTextIndex];
						let wave = '';
						for (let i = 0; i < base.length; i++) {
							const ch = base[i];
							const dy = Math.sin(t*1.5 + i*0.35) * 8;
							const hue = 320 + Math.sin(t + i*0.3)*40;
							wave += `<span style="display:inline-block;transform:translateY(${dy}px);color:hsl(${hue},90%,85%);transition:transform 0.4s;">${ch === ' ' ? '&nbsp;' : ch}</span>`;
						}
						text.innerHTML = wave;
						text.classList.add('show-text');
						lastSwitch = Date.now();
						switching = false;
					}, fadeDuration);
				} else if (!switching) {
					// Animate text wave
					const base = texts[currentTextIndex];
					let wave = '';
					for (let i = 0; i < base.length; i++) {
						const ch = base[i];
						const dy = Math.sin(t*1.5 + i*0.35) * 8;
						const hue = 320 + Math.sin(t + i*0.3)*40;
						wave += `<span style="display:inline-block;transform:translateY(${dy}px);color:hsl(${hue},90%,85%);transition:transform 0.4s;">${ch === ' ' ? '&nbsp;' : ch}</span>`;
					}
					text.innerHTML = wave;
				}
				requestAnimationFrame(frame);
			}
			frame();
		}
		// Wait for DOMContentLoaded to ensure SVG elements exist
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", animateCakeAndText);
		} else {
			animateCakeAndText();
		}
	})();

	// Confetti animation (unchanged)
    