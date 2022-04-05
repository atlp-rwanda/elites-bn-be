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

// counting connected user

socket.on('register', (data) => {
  user.innerText = data;
});

// Listen for events
socket.on('chat', (data) => {
  feedback.innerHTML = '';
  console.log(data);
  output.innerHTML +=
    `<p><strong>${data.handle}: </strong>${data.message}</p>` +
    `<div>${data.time}</div>`;
});

socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});

const username = alert('Welcome to this chat!');

// emit event to server with the user's name

socket.on('subscribe', (data) => {
  handle.value = data;
});

socket.on('message', (data) => {
  for (i = 0; i < data.length; i++) {
    feedback.innerHTML = '';
    output.innerHTML +=
      `<p><strong>${data[i].sender}: </strong>${data[i].message}</p>` +
      `<div>${data[i].createdAt}</div>`;
  }
  console.log('received welcome-message >>', data);
});
