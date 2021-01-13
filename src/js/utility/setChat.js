export default function setChat() {
  // eslint-disable-next-line no-undef
  const socket = io();
  const parent = document.querySelector('.chat-log');
  const messageContainer = parent.querySelector('.chat-block');
  const messageForm = parent.querySelector('.chat-log__form');
  const messageInput = parent.querySelector('.chat-log__input');
  const players = document.querySelectorAll('.head-row__name');

  const userName = prompt('What is your name?');

  function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
  }

  function autoScroll() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  appendMessage('You joined');
  socket.emit('new-user', userName);

  socket.on('chat-message', (data) => {
    appendMessage(`${data.name}: ${data.message}`);
    autoScroll();
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
    autoScroll();
    messageInput.value = '';
  });
}
