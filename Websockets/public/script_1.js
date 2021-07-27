
// On client side, the 'io' object is exposed. Use it
// You can choose to not pass parameter. In that case, it will default to connect to webpage that serves it
const clientSocket = io('http://localhost:3000');

const form = document.getElementById('form');
const textarea = document.getElementById('event-message');

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const formData = new FormData(form);

    textarea.value = '';

    // Use io.emit( eventName, eventData ) to send to server
    clientSocket.emit(formData.get('event-name'), formData.get('event-message'));
});


clientSocket.on('message', (msg)=> {
    console.dir(msg);
});