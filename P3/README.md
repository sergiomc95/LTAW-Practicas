# Práctica 3

En esta práctica se pide la implementación de una aplicación web de chat en el que múltiples usuarios puedan hablar entre sí a través del Navegador. La aplicación consiste en un programa servidor hecho en node.js, al que se conectan los clientes desde los navegadores. Cada vez que un usuario se conecte al servidor se le enviará un mensaje de bienvenida, que sólo él verá, y aunciará al resto de participantes que se ha conectado alguien nuevo

Para el intercambio de datos entre los clientes y el servidor se utilizará la biblioteca socket.io. Además, la aplicación web se desarrollará utilizando el paquete express de Node.

*El servidor se encargará de esta tarea. Además, el servidor responderá a estos comandos especiales. La respuesta sólo la verá el cliente que haya enviado el comando (El resto NO lo verán)

*/help: Mostrará una lista con todos los comandos soportados
*/list: Devolverá el número de usuarios conectados
*/hello: El servidor nos devolverá el saludo
*/date: Nos devolverá la fecha

--------------------------------------------------------PASOS A SEGUIR PARA PROBAR LA PRACTICA---------------------------------------------------

*Terminal en directorio "\LTAW-Practicas\P3\chat"  y ejecutar "node server.js", Acceder a "127.0.0.1:3000/" en un navegador Firefox.

*La página que se visualiza es la página del chat (index.html).

*En un primer momento se le pide al usuario que introduzca su nombre, que desde ese momento será su nick.

*A continuación se pueden unir al chat más usuarios y poder intercambiar mensajes entre ellos.

*Mejoras en la práctica:

*Los usuarios tienen nick.
*Implementado el comando /users para ver los usuarios conectados al chat en ese momento.
*Cuando un usuario manda un mensaje se incluye un sonido de notificación.
