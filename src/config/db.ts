import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'


dotenv.config()

//// Esta es la variable de entorno con la url de la base de datos
//// console.log(process.env.DATABASE_URL)

/// se le agrega   ssl=true   al final de la url
//const db = new Sequelize('postgresql://rest_api_node_typescript_xs8q_user:a4CaYWIL9JJ49lFfgUE2UPRBjDATT7El@dpg-cqogckdsvqrc73fgn720-a.oregon-postgres.render.com/rest_api_node_typescript_xs8q?ssl=true')


/// const db = new Sequelize(process.env.DATABASE_URL!)
//Borrar el .ts en   /../models/**/*
const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*'],   /// Estos son los modelos, todos los archivos que estan en la carpeta models de extension ts esos son
    logging: false   /// Para quitar el log
})

export default db