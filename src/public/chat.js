const socket = io.connect();

// Query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');
const time = document.getElementById('time');
const user = document.getElementById('user');

// Emit events
btn.addEventListener('click', () => {
  const now = new Date();
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
    time: now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  });
  message.value = '';
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

socket.on('disconnect',()=>{
  localStorage.removeItem('userEmail');
})
// counting connected user

socket.on('register', (data) => {
  user.innerText = data;
});

// Listen for events
socket.on('chat', (data) => {
  feedback.innerHTML = '';
  output.innerHTML
    += `<p><strong>${data.handle}: </strong>${data.message}</p>`
    + `<div>${data.time}</div>`;
});

socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});

const username = alert('Welcome to this chat!');

// emit event to server with the user's name

socket.on('subscribe', (data) => {
  console.log(data);
  handle.value = data;
});

// get logged user
const loggedUser = JSON.parse(localStorage.getItem('userEmail')) 
socket.emit('subscribe', loggedUser);

const getData = async () => {
  data = await fetch('http://localhost:3000/api/v1/chat');
  const response = await data.json();
  socket.emit('message', response);
  return response;
};
getData();

socket.on('message', async (data) => {
  const fetchedData = data.message;
  for (i = 0; i < fetchedData.length; i++) {
    feedback.innerHTML = '';
    output.innerHTML
      += `<p><strong>${fetchedData[i].sender}: </strong>${fetchedData[i].message}</p>`
      + `<div>${fetchedData[i].createdAt}</div>`;
  }
});
