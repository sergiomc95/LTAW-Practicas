# Práctica 4

En esta práctica se pide convertir el servidor de Chat de la práctica 3 en una aplición Electron nativa. Debe tener una interfaz gráfica que muestre la siguiente información:

*Versión de node
*Versión de Electron
*Versión de Chrome
*URL a la que se deben conectar los clientes para chatear
*Mostrar los mensajes que llegan al servidor, del resto de usuarios
*Botón de pruebas para enviar un mensaje a todos los clientes conectados
*La URL a la que se conectan los clientes deberá obtener la dirección IP de la máquina en la que se está ejecutando (no valdría dejar la url "cableada" en una cadena)

--------------------------------------------------------PASOS A SEGUIR PARA PROBAR LA PRACTICA---------------------------------------------------

 *Terminal en directorio "\LTAW-Practicas\P4"  y ejecutar "npm start", en ese momento se arranca Electron y visualizamos el menú de nuestra aplicación. Copiamos la URL que aparece y la pegamos en un navegador Firefox. Esa URL consiste en la dirección IP de la máquina donde se ejecuta, seguido del puerto establecido, en este caso es el 3000.

 *La página que se visualiza es la página del chat (index.html).

 *En un primer momento se le pide al usuario que introduzca su nombre, que desde ese momento será su nick.

 *A continuación se pueden unir al chat más usuarios y poder intercambiar mensajes entre ellos.

