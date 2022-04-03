// import { io } from "socket.io-client";
// // Make connection
// const socket = io("ws://localhost:3000");
const socket = io.connect();
// // Query DOM
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// // Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// // Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
console.log('chat.js file uploaded');



const username = prompt('Welcome! Please enter your name:');

// emit event to server with the user's name
socket.emit('message', { username })

socket.on('message', (data) => {
    console.log('received welcome-message >>', data);
  })

