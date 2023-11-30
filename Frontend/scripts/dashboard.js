// script.js
document.addEventListener('DOMContentLoaded', () => {
  const tweetForm = document.getElementById('tweet-form');
  const tweetContent = document.getElementById('tweet-content');
  const tweetList = document.getElementById('tweet-list');

  // Handle tweet submission
  tweetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = tweetContent.value;

    // Call your API to create a new tweet using content
    // Example API call: POST /api/tweets

    // After successful response, update the UI with the new tweet
    const newTweet = { content };
    const li = document.createElement('li');
    li.innerHTML = `<span>${content}</span><button class="edit-btn">Edit</button><button class="delete-btn">Delete</button>`;
    tweetList.appendChild(li);

    // Clear the input field
    tweetContent.value = '';
  });

  // Handle tweet editing and deletion (similar logic)
  tweetList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit-btn')) {
      // Implement edit functionality
    } else if (e.target.classList.contains('delete-btn')) {
      // Implement delete functionality
    }
  });
});
