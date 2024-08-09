import express from 'express' 
import colors from 'colors'   ///// Colors
import cors, { CorsOptions } from 'cors'
import router  from './router'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import db from './config/db'

// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()    //// Se autentica
        db.sync()  // agregar nuevas columnas
        //console.log( colors.blue( 'Conexión exitosa a la BD desde FIAS'))
    } catch (error) {
        // console.log(error)
        console.log( colors.red.bold( 'Hubo un error al conectar a la BD') ) /// Donde    colors.red.bold    es color rojo
    }
}


connectDB()  ///// Conexion a Base de Datos




// Instancia de express
const server = express()   /// Inicializa express

// Permitir conexiones con cors
const corsOptions : CorsOptions  = {
   
    origin: function(origin, callback) {  /// El origen es quien esta enviando la peticion, el callback va a permitir o negar la peticion
        
        // Donde process.env.FRONTEND_URL es mi url de mi pagina web pero si se consulta desde la api que seria localhost:400 no aparece la informacion
        // Que seria FRONTEND_URL=http://localhost:5173  de las variables de entorno
        // Donde   process.env.FRONTEND_URL    es la url de donde sale la informacion que seria en el formulario
        if(origin === process.env.FRONTEND_URL) {  
            console.log('origin', origin)
            callback(null, true)   /// Para aceptar la conexion
        } else {
            callback(new Error('Error de CORS'))  /// Error de Cors
            console.log('Denegar...')
        }
    }
}

server.use(cors(corsOptions))  // Se le pasa cors y luego las opciones


/*
server.get('/', (req, res) => {
    const auth = true

    const datos = [
        { id: 1, nombre: 'Juan' },
        { id: 2, nombre: 'Pablo' }
    ]

    res.send(auth)
    res.send('Hola mundo en Express')
    res.send(datos)
    res.json(datos)

    res.json('Desde GET')
})*/



/// Endpoint

/*
server.post('/', (req, res) => {
    res.json('Desde POST')
})


server.put('/', (req, res) => {
    res.json('Desde PUT')
})


server.patch('/', (req, res) => {
    res.json('Desde PATCH')
})


server.delete('/', (req, res) => {
    res.json('Desde DELETE')
})
*/





// Leer datos de formularios para cuando hace se esta en el post, put, etc
server.use(express.json())   //// Los .use se ejecutan en todos los request, esto es un middleware


server.use(morgan('dev'))  // Para ver informacion de la peticion enviada al pòst
//server.use(morgan('combined'))


///// Asi es inicialmente
/////server.use('/', router)   //// Asi para llamar los router, del archivo route
//// Tambien se puede hacer asi      server.use('/api', router) 

server.use('/api/products', router)   //// Esto es un middleware

/*
server.get('/api', (req, res) => {
    res.json({msg: 'Desde API'})
})*/

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions)) /// Para actualizar el logo swaggerUiOptions
 
export default server