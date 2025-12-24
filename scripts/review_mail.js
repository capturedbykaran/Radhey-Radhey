document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reviewForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim() || 'Anonymous';
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('reviewText').value.trim();

    // 🔴 PUT YOUR EMAIL ADDRESS HERE
    const YOUR_EMAIL = "capturedbykaran5@gmail.com";

    // Create email content
    const subject = encodeURIComponent("New Website Review 💖");
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Rating: ${rating}/10\n\n` +
      `Review:\n${review}\n\n` +
      `— Sent from your website`
    );

    // Open email app
    window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
  });
});
