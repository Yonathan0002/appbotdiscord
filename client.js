
let socketClient = io();
let displaymsg = document.querySelector("ul#message");
socketClient.on('<message', message => {
    displaymsg.innerHTML += "<li><h2>"+ message.sender +"</h2> <h4>" + message.content + "<h4/></li>";
});