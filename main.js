const Discord = require('discord.js');
const client = new Discord.Client();
var token = require('./token.js');


let express = require('express')();
let http = require('http').createServer(express);
let fs = require('fs').promises;
var io = require('socket.io')(http);

let socketServer = require('socket.io')(http);



//bot discord
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  

client.on("message", msg => {
    console.log("\x1b[31m", msg.author.username);
    console.log("\x1b[37m",msg.content,"\x1b[37m");
    socketServer.emit("<message", { 'sender' : msg.author.username, 'content' : msg.content })
})

client.login(token);



//web


express.get('/', (request, response) => {
    fs.readFile('./index.html')
    .then((content) => {
        // Writes response header
        response.writeHead(200, { 'Content-Type': 'text/html' });
        // Writes response content
        response.end(content);
    })
    .catch((error) => {
        // Returns 404 error: page not found
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Page not found.');
    });
});


express.use('/', (request, response) => {
    fs.readFile('./client.js')
      .then((content) => {
        // Writes response header
        response.writeHead(200, { 'Content-Type': 'application/javascript' });
        // Writes response content
        response.end(content);
      })
      .catch((error) => {
        // Returns 404 error: page not found
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Page not found.');
      });
  });


io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});