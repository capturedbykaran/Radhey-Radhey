document.addEventListener('DOMContentLoaded', () => {

  const ADMIN_PASSWORD = 'capturedbykaranmhk0827'; // 🔴 CHANGE THIS

  const loginBox = document.getElementById('loginBox');
  const dataBox = document.getElementById('dataBox');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const error = document.getElementById('error');
  const reviewsContainer = document.getElementById('reviewsContainer');
  const clearBtn = document.getElementById('clearBtn');

  // Auto unlock if already logged in (same tab)
  if (sessionStorage.getItem('admin') === '1') {
    unlock();
  }

  loginBtn.addEventListener('click', () => {
    const entered = document.getElementById('adminPassword').value;
    if (entered === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin', '1');
      unlock();
    } else {
      error.classList.remove('hidden');
    }
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('admin');
    location.reload();
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Delete all reviews?')) {
      localStorage.removeItem('reviews');
      loadReviews();
    }
  });

  function unlock() {
    loginBox.classList.add('hidden');
    dataBox.classList.remove('hidden');
    loadReviews();
  }

  function loadReviews() {
    reviewsContainer.innerHTML = '';
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    if (reviews.length === 0) {
      reviewsContainer.innerHTML = '<p class="small">No reviews yet.</p>';
      return;
    }

    reviews.forEach((r, i) => {
      const div = document.createElement('div');
      div.className = 'review-item';
      div.innerHTML = `
        <strong>${r.name}</strong> — ⭐ ${r.rating}/10
        <p>${r.text}</p>
        <div class="review-time">${r.time}</div>
      `;
      reviewsContainer.appendChild(div);
    });
  }

});
