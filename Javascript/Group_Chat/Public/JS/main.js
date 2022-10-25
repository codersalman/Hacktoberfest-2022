const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get Username and room from URL
const {username, room } = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});


const socket  = io();

// Join chatroom 
socket.emit('joinRoom', {username, room});

// Get room and users
socket.on('roomUsers', ({ room, users })=>{
    outputRoomName(room);
    outputUser(users);
})
// message from server
socket.on('message', message =>{
    console.log(message);
    outputMessage(message);
    // Scroll down
    chatMessage.scrollTop = chatMessage.scrollHeight;
});

// Message Submit
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    // get text message
    const msg = e.target.elements.msg.value;

    // emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room to DOM
function outputRoomName(room){
    roomName.innerText = room;
}

// Add user to Dom
function outputUser(users){
    userList.innerHTML = `${users.map(user => `<li>${user.username}</lli>`).join()}`
}
