// scripts/message.js
document.addEventListener('DOMContentLoaded', () => {
  const heartsContainer = document.getElementById('hearts');
  const cards = Array.from(document.querySelectorAll('.compliment-card'));
  const copyBtn = document.getElementById('copyBtn');

  // Create a single heart element and animate it upwards
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '💖';

    // random horizontal position across full screen
    heart.style.left = Math.random() * 100 + 'vw';

    // random size range
    const size = Math.random() * 25 + 15; // 15px – 40px
    heart.style.fontSize = size + 'px';

    // random animation duration
    const duration = Math.random() * 4 + 4; // 4s – 8s
    heart.style.animationDuration = duration + 's';

    // random delay for smooth natural effect
    heart.style.animationDelay = (Math.random() * 2) + 's';

    // add slight horizontal drifting
    const drift = Math.random() * 40 - 20; // -20px to +20px sideways
    heart.style.setProperty('--drift', drift + 'px');

    document.getElementById('hearts').appendChild(heart);

    // cleanup after animation
    setTimeout(() => {
        heart.remove();
    }, (duration + 2) * 1000);
}


  // spawn hearts at a gentle interval
  const heartInterval = setInterval(createHeart, 280);

  // make cards interactive: when clicked, create a burst of hearts and play a tiny "pop" animation
  function burstHearts(x = 8) {
    for (let i = 0; i < x; i++) {
      createHeart();
    }
  }

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      // small pulse
      card.animate([
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(-6px) scale(1.03)' },
        { transform: 'translateY(0) scale(1)' }
      ], { duration: 380, easing: 'ease-out' });

      // burst hearts and optionally speak text (if allowed)
      burstHearts(6);
      // optional: use the Web Speech API for a soft voice (permission required on some browsers)
    //   if (window.speechSynthesis) {
    //     const text = card.querySelector('.compliment-text').textContent;
    //     const utter = new SpeechSynthesisUtterance(text);
    //     utter.rate = 1.05;
    //     utter.pitch = 1.1;
    //     // speak softly
    //     try { window.speechSynthesis.cancel(); window.speechSynthesis.speak(utter); } catch(e){}
    //   }
    });

    // keyboard access
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // copy final message to clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const text = "I can't stop thinking about you... You're not just special, you're my favorite notification! 📱💖";
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = 'Copied ✓';
        setTimeout(() => copyBtn.textContent = 'Copy message', 1500);
      } catch (e) {
        // fallback alert
        alert('Copy this message:\n\n' + text);
      }
    });
  }

  // cleanup when navigating away (stop interval)
  window.addEventListener('beforeunload', () => {
    clearInterval(heartInterval);
  });
});
