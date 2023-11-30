document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const currentUser = JSON.parse(body.getAttribute('data-current-user'));

  const followButtons = document.querySelectorAll('.follow-button');

  followButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const userId = button.getAttribute('data-user-id');
      const isFollowing = currentUser.following.includes(userId); // Corrected here

      try {
        const response = await fetch(
          `/api/v1/user/${isFollowing ? 'unfollow' : 'follow'}/${userId}`, // Corrected here
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          }
        );

        if (response.ok) {
          // Toggle the button text
          button.textContent = isFollowing ? 'Follow' : 'Following';
          location.reload();

          // Update currentUser's following array
          if (isFollowing) {
            currentUser.following = currentUser.following.filter(
              (id) => id !== userId // Corrected here
            );
          } else {
            currentUser.following.push(userId); // Corrected here
          }
        } else {
          console.error('Failed to update follow status.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
  });
});
