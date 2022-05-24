var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clientes = 0;
var nicks = [];
var clientesactivos = [];

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//--Servir fichero css
app.get('/css/index.css', function(req, res){
  res.sendFile(__dirname + '/css/index.css');
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
});

app.get('/css/fondo.jpg', function(req, res){
  res.sendFile(__dirname + '/css/fondo.jpg');
});

app.get('/iphone-notificacion.mp3', function(req, res){
  res.sendFile(__dirname + '/iphone-notificacion.mp3');
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});


//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  
  socket.on('persona', user => {
    console.log('\n--> Usuario conectado!');
    clientes = clientes + 1;
    console.log(user + ' se ha conectado\n');
    nicks += user + ',' + '\n';
    clientesactivos.push(user)
    console.log("Usuarios conectados actualmente: " + clientesactivos.join(', ')+ '\n');
    //-- Mensaje de bienvenida al chat del nuevo cliente
    socket.emit('welcome', "Bienvenido al chat " + user );
    //io.emit('welcome', "El nuevo usuario llamado " + user + " se ha unido al chat")
    socket.broadcast.emit('welcome', "El nuevo usuario llamado " + user + " se ha unido al chat")



  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('\n--> Usuario Desconectado');
    console.log(user + ' se ha desconectado\n');
    clientes = clientes -1;
    nicks -= user + ',' + '\n';
    pos = clientesactivos.indexOf(user)
    clientesactivos.splice(pos, 1)
    console.log("Usuarios conectados actualmente: " + clientesactivos.join(', '))
    socket.broadcast.emit('Abandono', "El  usuario  " + user + "  ha abandonado el chat")

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
         msg = '<br>' + '/help:' + ' Lista con todos los comandos soportados'
               +'<br>' + '/list:' + ' Número de usuarios conectados'
               +'<br>' + '/hello:' + ' Servidor devolverá el saludo'
               +'<br>' + '/date:' + ' Servidor devolverá la fecha'
               +'<br>' + '/users:' + ' Servidor devolverá los nombres de usuarios activos' + '<br>'
         socket.emit('new_message', msg);

     }else if (new_msg === '/list') {
        console.log(clientesactivos.length + "numero de clientes");
        msg = 'Usuarios conectados: ' + clientesactivos.length + '<br>';
        socket.emit('new_message', msg);

     } else if (new_msg === '/hello') {
        msg = '<br>' + 'Buenas soy el servidor...' + '<br>'
        socket.emit('new_message', msg)
     } else if (new_msg === '/date') {
       console.log("probando fecha");
        var fecha= new Date();
        msg = 'Fecha: ' + fecha.getDate()
              + '<br> Dia de la semana: ' + fecha.getDay()
              + '<br> Mes : ' + (fecha.getMonth() + 1)
              + '<br> Año: ' + fecha.getFullYear()
              + '<br> Hora: ' + fecha.getHours()
              + '<br> Minutos: ' + fecha.getMinutes() + '<br>'
        socket.emit('new_message', msg);
     } else if (new_msg === '/users') {
      console.log(clientesactivos.length + "numero de clientes");
      msg = 'Usuarios conectados: ' + clientesactivos.join(', ') + '<br>';
      socket.emit('new_message', msg);

    } else{
       io.emit('new_message', msg);
     }


  });
});