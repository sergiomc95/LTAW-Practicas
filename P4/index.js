const electron = require('electron');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const print = document.getElementById("print");
const url = document.getElementById("url");
// Variables 
let  clients = document.getElementById("clients");
let mensajes = document.getElementById("mensajes");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.versions.node;
info2.textContent = process.versions.chrome;
info3.textContent = process.versions.electron;


btn_test.onclick = () => {
    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('test', "Mensaje enviado desde la aplicacion de escritorio");
}

//-- Mensajes recibido del proceso MAIN

electron.ipcRenderer.on('url', (event, message) => {
    url.innerHTML = message;
  });

electron.ipcRenderer.on('clients', (event, message) => {
    clients.innerHTML = message;
  });

  electron.ipcRenderer.on('msg', (event, message) => {
    mensajes.innerHTML += message + '<br>';
  });
