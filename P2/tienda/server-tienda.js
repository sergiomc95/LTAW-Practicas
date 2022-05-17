//Servidor de la tienda

const url = require('url');
const http = require('http');
const fs = require('fs');

const PUERTO = 9090;

const FICHERO_JSON = "tienda.json"

const  tienda_json = fs.readFileSync(FICHERO_JSON);
const tienda = JSON.parse(tienda_json);

//-- Recorrer el array de productos
tienda.forEach((element, index)=>{
  console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
});

const server = http.createServer((req, res) => {

    //console.log("Petición recibida")




    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.pathname);

    //Variable recurso
    var resource = "";
    //Analizar el recurso solicitado
    if (url.pathname == '/') {
      resource += "/tienda.html";
    } else {
      resource += url.pathname;
    }

    //Obtención del tipo de recurso solicitado
    resource_type = resource.split(".")[1];
    resource = "." + resource;

    //console.log("Recurso: " + resource);
    //console.log("Extensión: " + resource_type);






    //Lectura asíncrona
    fs.readFile(resource, function(err, data){

      //Definición del tipo de archivo html.
      var mime = "text/html"

      //tipo de imágenes
      if(resource_type == 'jpg' || resource_type == 'png' || resource_type == 'PNG' || resource_type == 'gif'){
          mime = "image/" + resource_type;
      }

      //archivo css
      if (resource_type == "css"){
          mime = "text/css";
      }

      if (resource_type =='json'){
        mime = "application/json"
      }

      //Fichero no encontrado
      if (err) {
        resource = "./error.html";
        data = fs.readFileSync(resource);
        res.writeHead(404, {'Content-Type': mime});
        console.log("404 Not Found");
        res.write(data);
        res.end();
      }else{
          res.writeHead(200, {'Content-Type': mime});
          console.log("Peticion Recibida, 200 OK");
          res.write(data);
          res.end();
      }
    });
});

server.listen(PUERTO);
console.log("Servidor de la tienda online escuchando en puerto: " + PUERTO)