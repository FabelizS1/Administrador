import colors from 'colors'
import server from './server'     //// Aqui se importa el archivo server



/// Donde  process.env.PORT  es una variable de entorno
/// donde el puerto es  process.env.PORT   o    4000
const port = process.env.PORT || 4000  // Instalacion del puerto

server.listen(port, () => {     /// Para escuchar por un puerto
    console.log( colors.cyan.bold( `REST API en el puerto ${port}`))  /// Donde colors.cyan.bold   es el color de letras de la terminal
})