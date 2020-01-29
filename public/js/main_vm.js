// imports always go first - if we're importing anything


const socket = io();

function setUserId(packet) {
    console.log(packet);
}

function showDisconneectMessage() {
    console.log('a user disconnected');
}

socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconneectMessage);