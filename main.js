//bot discord
const Discord = require('discord.js');
const client = new Discord.Client();
var token = require('./token.js');

//express
let express = require('express')
let app = express();
let http = require('http').createServer(app);
let fs = require('fs').promises;
var io = require('socket.io')(http);

let socketServer = require('socket.io')(http);

var createError = require('http-errors');



//ent
//empeche les injections html
var ent = require('ent');

//EJS
app.set('views', './view')
app.set('view engine', 'ejs')

app.use('/public' ,express.static('public'));


//bot discord
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  

client.on("message", msg => {
    //console.log("\x1b[31m", msg.author.username);
    //console.log("\x1b[37m",msg.content,"\x1b[37m");
    socketServer.emit("<message", { 'sender' :  ent.encode(msg.author.tag), 'content' :  ent.encode(msg.content) })
})

client.login(token);


//route
app.get('/about', (request, response) => {
  response.render('about')
});

app.get('/listserver', function(request, response){
  //console.log(client.guilds.cache.array())
  // client.guilds.cache.array() et la liste des serveur en array
  var guilds = client.guilds.cache.array()
  response.render('listserver', {guilds : guilds} )
})

app.get('/chat',(request, response) => {
  response.render('chat')
});

app.get('/', (request, response) => {
  response.render('index')
});

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});