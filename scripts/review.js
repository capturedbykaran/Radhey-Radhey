document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reviewForm');
  const successMsg = document.getElementById('successMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const reviewData = {
      name: document.getElementById('name').value || 'Anonymous',
      rating: document.getElementById('rating').value,
      text: document.getElementById('reviewText').value,
      time: new Date().toLocaleString()
    };

    // get old reviews or empty array
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(reviewData);

    // save again
    localStorage.setItem('reviews', JSON.stringify(reviews));

    form.reset();
    successMsg.classList.remove('hidden');
  });
});
