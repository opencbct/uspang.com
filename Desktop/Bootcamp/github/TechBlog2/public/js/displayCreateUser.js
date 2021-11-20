const chooseLoginEl = document.getElementById('choose-login');
const chooseCreateEl = document.getElementById('choose-create');

const displayCreateUser = (event) => {
  chooseLoginEl.parentNode.removeChild(chooseLoginEl);
  chooseCreateEl.parentNode.removeChild(chooseCreateEl);

  const columnsDiv = document.createElement('div');
  columnsDiv.classList.add('columns');
  const singleColumnDiv = document.createElement('div');
  singleColumnDiv.classList.add('column', 'is-half');

  const createForm = document.createElement('form');
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
  submitBtnEl.value = 'create';

  columnsDiv.classList.add('is-centered');
  passwordInput.classList.add('input');
  usernameInput.classList.add('input');
  submitBtnEl.classList.add('button', 'is-dark');
  createForm.classList.add('box');
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
  createForm.appendChild(usernameFieldDiv);
  createForm.appendChild(passwordFieldDiv);
  createForm.appendChild(submitBtnEl);

  singleColumnDiv.appendChild(createForm);
  columnsDiv.appendChild(singleColumnDiv);
  document.body.appendChild(columnsDiv);

  const handleCreateUser = async (username, password) => {
    const body = {
      username: username,
      password: password,
    };

    console.log(body);

    const result = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(`user created with id#${result.id}`);
        return result;
      });

    if (result.id) {
      window.location.href = `/users/${body.username}`;
    } else {
      alert('error with user creation');
      window.location.href = '/';
    }
  };

  submitBtnEl.addEventListener('click', (event) => {
    event.preventDefault();
    handleCreateUser(usernameInput.value, passwordInput.value);
  });
};

export default displayCreateUser;
