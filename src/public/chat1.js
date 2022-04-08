const socket = io.connect();
// Query DOM
const loginForm = document.querySelector('.login-form');
user = document.getElementById('user'),
btn = document.querySelector('.btn'),
password = document.getElementById('pass');

const username = loginForm.elements[0];

let token = '';

const logUserIn = async () => {
  const data = {
    email: user.value,
    password: password.value,
  };
  const response = await fetch('http://localhost:3000/api/v1/users/login', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response);

  if (response.status === 200) {
    console.log('successfully');
    let userEmail;
    if (localStorage.getItem('userEmail') === null) {
      userEmail = [];
    } else {
      userEmail = JSON.parse(localStorage.getItem('userEmail'));
    }
    userEmail.push(data);
    socket.emit('subscribe', data.email);
    localStorage.setItem('userEmail', JSON.stringify(userEmail));
    window.location.replace(`./chat.html`);
  } else {
    alert('invalid credential,Try again');
    console.log('error,');
    user.value = '';
    password.value = '';
    return false;
  }
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  logUserIn();
});
