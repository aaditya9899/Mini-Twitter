document.addEventListener('DOMContentLoaded', () => {
  const editForm = document.getElementById('edit-tweet-form');
  editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(editForm);
    const tweetId = editForm.getAttribute('data-tweet-id');
    const content = formData.get('content');

    try {
      const response = await fetch(`/api/v1/tweet/${tweetId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        window.location.href = `/api/v1/tweet/${tweetId}`;
        console.log('Tweet content updated successfully');
      } else {
        console.error('Failed to update tweet content');
      }
    } catch (error) {
      console.error('Error updating tweet content:', error);
    }
  });
});
