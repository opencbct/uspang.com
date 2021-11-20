import displayLogIn from './displayLogIn.js';
import displayCreateUser from './displayCreateUser.js';
const chooseLoginEl = document.getElementById('choose-login');
const chooseCreateEl = document.getElementById('choose-create');


chooseLoginEl.addEventListener('click', displayLogIn);

chooseCreateEl.addEventListener('click', displayCreateUser);
