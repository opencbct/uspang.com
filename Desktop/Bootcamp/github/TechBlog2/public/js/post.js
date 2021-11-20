const commentBtn = document.getElementById('comment-btn');
const commentText = document.getElementById('comment-text')


const handleComment = async (comment, postId) => {
    const body = {
      content: comment,
    };

    if (body.content.length) {
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace(`/posts/${postId}`);
      } else {
        alert('Failed to comment.');
      }
    } else {
      alert('enter something for a comment');
    }
  };

commentBtn.addEventListener('click', () => {
    handleComment(commentText.value, commentBtn.dataset.value);
})