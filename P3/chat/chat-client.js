function main() {
  var user = prompt("Please enter your name");
//-- Sonido de la notificacion del mensaje
  var sonido = new Audio('iphone-notificacion.mp3');
//-- Crear el websocket
var socket = io();

//-- Obtener los elementos de interfaz:

//-- Boton de envio de mensaje
var send = document.getElementById('send')

//-- Parrafo para mostrar mensajes recibidos
var display = document.getElementById('display')

//-- Caja con el mensaje a enviar
var msg = document.getElementById("msg")
var usuarios = document.getElementById('users')



msg.addEventListener("keypress", function(event) {
// Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("send").click();
  }
});
socket.emit('persona', user)
//-- Cuando se aprieta el botón de enviar...
send.onclick = () => {

  //-- Enviar el mensaje, con el evento "new_message"
  socket.emit('new_message',user + ":" + msg.value);

  //-- Lo notificamos en la consola del navegador
  console.log("Mensaje emitido")
  msg.value = ""
}

//-- Cuando se reciba un mensaje del servidor se muestra
//-- en el párrafo
socket.on('new_message', msg => {
  display.innerHTML += msg + '<br>';
  sonido.play();
});

socket.on('welcome', msg => {
  display.innerHTML += msg + '<br>';  
});

}
