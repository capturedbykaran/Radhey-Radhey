// script.js
document.addEventListener('DOMContentLoaded', () => {
  const digits = Array.from(document.querySelectorAll('.digit'));
  const unlockBtn = document.getElementById('unlockBtn');
  const mainContent = document.getElementById('mainContent');
  const card = document.querySelector('.card');

  // SECRET CODE (you can change this)
  const SECRET = '0827'; // classic "Her DOB" code

    // If already unlocked, go to menu immediately
  if (sessionStorage.getItem('unlocked') === '1') {
    window.location.href = 'pages/menu.html';
    return;
  }

// focus first input on load (guarded)
if (digits.length) digits[0].focus();

  // auto-advance & accept only digits
  digits.forEach((el, idx) => {
    el.addEventListener('input', (e) => {
      // Sanitize to single numeric digit
      let v = el.value.replace(/\D/g, '');
      el.value = v.slice(0,1);

      // visual class to show been filled (optional)
      if(el.value) el.classList.add('value');
      else el.classList.remove('value');

      if (el.value && idx < digits.length - 1) {
        digits[idx + 1].focus();
      }

      // If last input filled, try unlock automatically
      if(idx === digits.length - 1 && digits.every(d => d.value)) {
        tryUnlock();
      }
    });

    // handle backspace to jump back
    el.addEventListener('keydown', (ev) => {
      if(ev.key === 'Backspace' && !el.value && idx>0){
        digits[idx-1].focus();
      }
      // allow numeric keys and navigation
      if(ev.key.length === 1 && /\d/.test(ev.key)) {
        // allow
      }
    });

    // make tapping on the visible heart area focus this input (helpful for mobile)
    el.addEventListener('focus', () => {
      el.select?.();
    });
  });

  function getEnteredCode(){
    return digits.map(d => d.value || '').join('');
  }

  function flashInvalid(){
    // small shake animation for card
    card.style.transition = 'transform .12s';
    card.style.transform = 'translateX(-8px)';
    setTimeout(()=> card.style.transform = 'translateX(8px)', 120);
    setTimeout(()=> card.style.transform = 'translateX(0)', 240);
    // clear last digit
    digits.forEach(d => d.classList.remove('value'));
    digits.forEach(d => d.value = '');
    digits[0].focus();
  }

function revealSuccess(){
  // persist the unlocked state so reloads redirect automatically
  try { sessionStorage.setItem('unlocked', '1'); } catch (e) { /* ignore if storage not available */ }

  // subtle success animation then reveal main content / redirect
  card.style.transition = 'opacity .5s, transform .5s';
  card.style.transform = 'scale(.98)';
  setTimeout(() => { card.style.opacity = '0'; }, 200);

  // optional: disable inputs so user can't keep typing while redirecting
  digits.forEach(d => d.disabled = true);

  // remove + show message locally (keeps UX smooth) then redirect
  setTimeout(() => {
    // keep UX: remove card and show unlocked message briefly (useful on slow networks)
    try { card.remove(); } catch (e) {}
    mainContent.hidden = false;
    const w = document.querySelector('.welcome');
    const msg = document.createElement('p');
    msg.style.marginTop = '14px';
    msg.style.color = '#ffcee9';
    msg.textContent = 'Unlocked — you found the secret ✨';
    w.appendChild(msg);

    // redirect to menu
    window.location.href = 'pages/menu.html';
  }, 600);
}


  function tryUnlock(){
    const entered = getEnteredCode();
    if(entered.length < 4) return;
    if(entered === SECRET){
      revealSuccess();
    }else{
      flashInvalid();
    }
  }

  unlockBtn.addEventListener('click', tryUnlock);

  // allow pressing Enter to attempt unlock
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') tryUnlock();
  });

});
