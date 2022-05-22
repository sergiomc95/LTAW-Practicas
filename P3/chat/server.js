var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clientes = 0;
var  nicks = [];

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal: /")
});

//--Servir fichero css
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.css');
  console.log("CSS: /")
});


//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero js solicitado")
});

app.get('/fondo.jpg', function(req, res){
  res.sendFile(__dirname + '/fondo.jpg');
  console.log("imagen solicitado")
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});


//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');
  clientes = clientes +1;
  socket.on('persona', user => {
    console.log(user);
    nicks += user + ',' + '\n';
    io.emit('usuarios', nicks)
    console.log( "todos los usuarios: " + nicks );
    socket.emit('bienvenido',"bienvenido al chat " + user );
    socket.broadcast.emit('bienvenido', "El nuevo usuario llamado " + user + " se ha unido al chat")



  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');
    clientes = clientes -1;
    nicks -= user + ',' + '\n';
    socket.broadcast.emit('Abandono', "El  usuario  " + user + "  ha abandonado el chat")
    console.log(user);

  });
});
  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', msg => {


    //-- Emitir un mensaje a todos los clientes conectados
    //io.emit('new_message', msg);
    var new_msg = msg.split(":")[1];
    console.log("Mensaje nuevo recibido: " + new_msg);
    if (new_msg === '/help') {
       console.log("funciona");
         msg = '<br>' + '/help:' + '<br>'+ 'Lista con todos los comandos soportados'
               +'<br>' + '/list:' + '<br>'+ 'Número de usuarios conectados'
               +'<br>' + '/hello:' + '<br>'+ 'Servidor devolverá el saludo'
               +'<br>' + '/date:' + '<br>'+ 'Servidor devolverá la fecha'
         socket.emit('new_message', msg);

     }else if (new_msg === '/list') {
       console.log(clientes + "numero de clientes");
        msg = 'Usuarios conectados: ' + clientes + '<br>' +  nicks
        socket.emit('new_message', msg);

     } else if (new_msg === '/hello') {
        msg = '<br>' + 'Buenas soy el servidor...'
        socket.emit('new_message', msg)
     } else if (new_msg === '/date') {
       console.log("probando fecha");
        var fecha= new Date();
        msg = 'Fecha: ' + fecha.getDate()
              + '<br> Dia de la semana: ' + fecha.getDay()
              + '<br> Mes : ' + (fecha.getMonth() + 1)
              + '<br> Año: ' + fecha.getFullYear()
              + '<br> Hora: ' + fecha.getHours()
              + '<br> Minutos: ' + fecha.getMinutes()
        socket.emit('new_message', msg);
     } else{
       io.emit('new_message', msg);
     }


  });
});