
let socketClient = io();
let displaymsg = document.querySelector("ul#message");

socketClient.on('<message', message => {
    let affichemessage = document.createElement("LI");
    affichemessage.innerHTML += `<span class="badge badge-pill badge-dark">${message.sender}</span><p>${message.content}<p/>`;
    displaymsg.prepend(affichemessage);
});