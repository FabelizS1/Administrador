import { exit } from 'node:process'
import db from '../config/db'

const clearDB = async () => {   /////
    try {
        await db.sync({force: true})  /// Elimina todos los datos de la base de datos
        console.log('Datos eliminados correctamente')
        exit(0)  /// Termina el programa y es 0 porque termina todo con exito
    } catch (error) {
        console.log(error)
        exit(1)// para terminar el programa donde 1 quiere decir que termina con errores
    }
}

/// process.argv[2]   Esto es un comando que se ejecuta en el node.js
/*
    Esto es el db de package.json el valor de --clear
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "test" : "jest --detectOpenHandles",
    "db" : "ts-node ./src/data --clear"
  },

*/
if(process.argv[2] === '--clear') {
    clearDB()
}
