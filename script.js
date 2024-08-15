const socket = new WebSocket('ws://localhost:41234');
const messages = [];

const $ = (selector) => document.querySelector(selector);
const $status = $('#status');
const $form = $('#form');
const $messageStatus = $('#messageStatus');
const $messages = $('#messages');

socket.onopen = () => {
    $status.textContent = 'Conectado';
};

socket.onmessage = (event) => {
    const message = event.data;
    messages.push(message);
    $messageStatus.style.display = 'none';
    const newMessage = document.createElement('p');
    newMessage.classList.add('server')
    newMessage.textContent = message;
    $messages.appendChild(newMessage);
};

socket.onclose = () => {
    console.log('Conexión cerrada');
};

socket.onerror = (error) => {
    $status.textContent = 'Error de conexión';
};


$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = $('#message').value;
    socket.send(message);
    $('#message').value = '';
    $messageStatus.style.display = 'block';
    const newMessage = document.createElement('p');
    newMessage.classList.add('client')
    newMessage.textContent = message;
    $messages.appendChild(newMessage);
});