// Query DOM
const loginForm = document.querySelector('.login-form');
(user = document.getElementById('user')),
(btn = document.querySelector('.btn')),
(password = document.getElementById('pass'));

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

  if (response.status === 200) {
    const result = await response.json();
    token = result.payload.accesstoken;
    localStorage.setItem('accesstoken', JSON.stringify(token));
    window.location.replace('./chat.html');
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
