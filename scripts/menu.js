// scripts/menu.js
document.addEventListener('DOMContentLoaded', () => {
  const lockBack = document.getElementById('lockBack');
  const gallery = document.getElementById('gallery');
  const settings = document.getElementById('settings');

  // Lock & return to start (clears unlocked state)
  lockBack.addEventListener('click', () => {
    localStorage.removeItem('unlocked');
    window.location.href = '../index.html';
  });

  // small placeholders
  gallery.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Gallery coming soon — I can add photos or a carousel here!');
  });
  settings.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Customize coming soon — theme, secrets, and sounds can be added.');
  });
});
