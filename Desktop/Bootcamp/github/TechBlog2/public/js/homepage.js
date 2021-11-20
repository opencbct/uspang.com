const postTitleEl = document.getElementById('post-title');
const postTextEl = document.getElementById('post-text');
const createPostBtn = document.getElementById('create-post');

const createPost = async (title, content, userId) => {
  const body = { title: title, content: content, user_id: userId };
  console.log(body);

    if (body.content.length && body.title.length) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to post.');
      }
    } else {
      alert('enter title and content for a post');
    }
  };

createPostBtn.addEventListener('click', () => {
  createPost(postTitleEl.value, postTextEl.value, createPostBtn.dataset.value);
})

const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);