import {Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'


// Esto es un middleware
// Esto tiene un req y un res
// Se declara el tipo de dato req, res y next  que serian req: Request, res: Response, next: NextFunction
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {  

    console.log('Desde Middleware...')



    /// Esto se puede agregandole a un middleware
    //  Agregar un Middleware, este es un software intermedio que se usa para procesar
    //  solicitudes HTTP que llegan a una aplicacion web       
    let errors = validationResult(req)  /// Para leer los campos de error
    
    if (!errors.isEmpty()) { /// Si error es distinto de vacio entonces tiene errores
        return res.status(400).json({ errors: errors.array() }) /// Aqui se muestra el codigo del error y un array de errores a retornar
    }

    next() /// Ya termine aqui ve a la siguiente funcion
}