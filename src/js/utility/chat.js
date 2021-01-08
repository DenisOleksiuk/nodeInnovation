function chat() {
  const socket = io();

  const messageContainer = document.querySelector('.log__text');
  const messageForm = document.querySelector('.log__form');
  const messageInput = document.querySelector('.log__input');
  const players = document.querySelectorAll('.head-row__name');

  const userName = prompt('What is your name?');

  function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
  }

  appendMessage('You joined');
  socket.emit('new-user', userName);

  socket.on('chat-message', (data) => {
    appendMessage(`${data.name}: ${data.message}`);
  });

  socket.on('user-connected', (name) => {
    appendMessage(`${name} connected`);
  });

  socket.on('players', (name) => {
    const nameOfUsers = Object.values(name);
    players.forEach((el, i) => {
      el.textContent = nameOfUsers[i];
    });
  });

  socket.on('user-disconnected', (name) => {
    appendMessage(`${name} disconnected`);
  });

  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (messageInput.value === '') return;
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
  });
}

export default chat;
