# Práctica 1

En esta práctica se pide construir un servidor web usando Node.js, el servidor tiene que proporcionar las páginas web de una tienda. Las páginas son estáticas, en formato HTML, y se componen de textos e imágenes, compartiendo una hoja de estilo. La tienda tiene 3 productos y una pagina web asociada a cada producto.



El servidor está implementado en node.js. Recibe peticiones de los clientes, que tiene que atender. Detecta la petición del cliente y accede al sistema de ficheros local para localizar el recurso pedido y devolverlo. Si se accede a un recursos no existente deberá generar una respuesta de error.
Para devolver el recurso solicitado tendrás que acceder al sistema de ficheros, leer los ficheros pedidos y meterlos en el mensaje de respuesta. 

--------------------------------------------------------PASOS A SEGUIR PARA PROBAR LA PRACTICA----------------------------------------------------

 *Terminal en directorio "LTAW-Practicas\P1\tienda"  y ejecutar "node server-tienda.js", Acceder a "http://localhost:8080/" en un navegador Firefox.

 *La primera página que se visualiza es la página principal (tienda.html), en ella podemos ver los tres productos que hay en la tienda (tres paquetes de viajes vacacionales).

 *Haciendo click en cada uno de los productos de la tienda se redigirá a las páginas propias de los productos. En cada una de ellas encontraremos una foto descripctiva, el listado de las posibles ciudades de destino y su precio correspondiente.

*En caso de acceder a una url que no sea ni la página principal (index.html), ni la de ninguno de los tres productos (spain.html, europe.html y world.html) el servidor realiza una redirección a una página de error(error.html).

*En cada una de las páginas se incluye un botón para regresar de nuevo a la página principal de la tienda.
