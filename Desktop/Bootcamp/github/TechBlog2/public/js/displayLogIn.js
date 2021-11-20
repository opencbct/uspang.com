const chooseLoginEl = document.getElementById('choose-login');
const chooseCreateEl = document.getElementById('choose-create');

const displayLogIn = (event) => {
  chooseLoginEl.parentNode.removeChild(chooseLoginEl);
  chooseCreateEl.parentNode.removeChild(chooseCreateEl);

  const columnsDiv = document.createElement('div');
  columnsDiv.classList.add('columns');
  const singleColumnDiv = document.createElement('div');
  singleColumnDiv.classList.add('column', 'is-half');

  const loginForm = document.createElement('form');
  const usernameInput = document.createElement('input');
  const passwordInput = document.createElement('input');
  const usernameLabel = document.createElement('label');
  const passwordLabel = document.createElement('label');
  const submitBtnEl = document.createElement('input');
  const usernameFieldDiv = document.createElement('div');
  const usernameControlDiv = document.createElement('div');
  const passwordFieldDiv = document.createElement('div');
  const passwordControlDiv = document.createElement('div');

  submitBtnEl.type = 'submit';
  usernameLabel.textContent = 'username: ';
  passwordLabel.textContent = 'password: ';
  submitBtnEl.value = 'login';

  columnsDiv.classList.add('is-centered');
  passwordInput.classList.add('input');
  usernameInput.classList.add('input');
  submitBtnEl.classList.add('button', 'is-dark');
  loginForm.classList.add('box');
  usernameFieldDiv.classList.add('field');
  usernameControlDiv.classList.add('control');
  passwordFieldDiv.classList.add('field');
  passwordControlDiv.classList.add('control');

  usernameFieldDiv.appendChild(usernameLabel);
  usernameFieldDiv.appendChild(usernameControlDiv);
  usernameControlDiv.appendChild(usernameInput);
  passwordFieldDiv.appendChild(passwordLabel);
  passwordFieldDiv.appendChild(passwordControlDiv);
  passwordControlDiv.appendChild(passwordInput);
  loginForm.appendChild(usernameFieldDiv);
  loginForm.appendChild(passwordFieldDiv);
  loginForm.appendChild(submitBtnEl);

  singleColumnDiv.appendChild(loginForm);
  columnsDiv.appendChild(singleColumnDiv);
  document.body.appendChild(columnsDiv);

  const handleLogin = async (username, password) => {
    const body = {
      username: username,
      password: password,
    };
    console.log(body);

    if (body.username.length && body.password.length) {
      const response = await fetch(`/api/users/sign-in/${username}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace(`/users/${username}`);
      } else {
        alert('Failed to log in.');
      }
    } else {
      alert('enter username and password');
    }
  };

  submitBtnEl.addEventListener('click', (event) => {
    event.preventDefault();
    handleLogin(usernameInput.value, passwordInput.value);
  });
};

export default displayLogIn;
