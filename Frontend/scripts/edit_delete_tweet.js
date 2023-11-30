document.addEventListener('DOMContentLoaded', () => {
  const menuButtons = document.querySelectorAll('.menu-button');

  menuButtons.forEach((button) => {
    const tweetMenu = button.closest('.tweet-menu');
    const menuOptions = tweetMenu.querySelector('.tweet-menu-options');
    const deleteButton = menuOptions.querySelector('.delete-option');
    const editButton = menuOptions.querySelector('.edit-option');

    button.addEventListener('click', () => {
      menuOptions.classList.toggle('show-options');
    });

    deleteButton.addEventListener('click', () => {
      const tweetId = deleteButton.getAttribute('data-tweet-id');
      const isConfirmed = confirm('You really want to delete the tweet?');
      if (!isConfirmed) {
        return;
      }
      deleteTweet(tweetId);
    });

    editButton.addEventListener('click', () => {
      const tweetId = editButton.getAttribute('data-tweet-id');
      window.location.href = `/api/v1/tweet/${tweetId}/edit`;
    });
  });

  async function deleteTweet(tweetId) {
    try {
      const response = await fetch(`/api/v1/tweet/${tweetId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const tweetElement = deleteButton.closest('.tweet');
        tweetElement.remove();
      } else {
        console.error('Failed to delete tweet');
      }
    } catch (error) {
      console.error('Error deleting tweet:', error);
    }
  }
});
