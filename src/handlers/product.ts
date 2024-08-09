import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'   /// Para las validaciones
import Product from '../models/Product.model'   /// Importar el modelo
import { IsNumeric } from 'sequelize-typescript'

export const getProducts = async (req: Request, res: Response) => {
    /*try {


    } catch (error) {
        console.log(error)
    }*/


        ///const products = await Product.findAll()

        const products = await Product.findAll({   /// Aqui se conecta al modelo que es Product y luego findAll
            order: [
                ['price', 'DESC']  /// Organizar en forma descendente los precios
            ]
            ////,limit: 2   Tambien se puede agregar un limit para tener solo 2 registros
            ////,attributes: { exclude: ['createdAt', 'updatedAt'] }  ///Aqui se quitan del resultado las siguientes opciones   'createdAt', 'updatedAt'
        })

        res.json({data: products})  /// Para traer todos los datos


}

export const getProductById = async (req: Request, res: Response) => {
    /*try {


    } catch (error) {
        console.log(error)
    }*/

        console.log(req.params.id)  /// Este es el id del parametro

        const { id } = req.params   /// Se hace distroctoring y se extrae el id
        const product = await Product.findByPk(id)  // Se usa  findByPk  para buscar por el id

        /// Esto para el caso de que no haya un producto
        if(!product) {
            return res.status(404).json({    /// Se coloca el error 404
                error: 'Producto No Encontrado'  /// El mensaje de error
            })
        }

        res.json({data: product})  //// Para mostrar los datos


}


/// Aqui se agrega el tipo de dato a req  y a  res , que seria Request y Response
export const createProduct = async (req : Request, res : Response) => {  /// Cuando se usa el modelo la funcion debe ser async
    //try {

        ///Para validar la informacion, tambien puede anidar 2 opciones como aparece abajo
        ///await check('name').notEmpty().isNumeric   
        /*await check('name').notEmpty().withMessage('El nombre de Producto no puede ir vacio')
                .run(req)
        await check('price')
                .isNumeric().withMessage('Valor no valido')
                .notEmpty().withMessage('El precio de Producto no puede ir vacio')
                .custom(value => value > 0).withMessage('Precio no Valido')  //// donde value es el valor del precio
                .run(req)
        */

         
                

    /*} catch (error) {
        console.log(error)
    }*/



            /// Esto se puede agregandole a un middleware
        //  Agregar un Middleware, este es un software intermedio que se usa para procesar
        //  solicitudes HTTP que llegan a una aplicacion web       
        let errors = validationResult(req)  /// Para leer los campos de error

        if (!errors.isEmpty()){ /// Si error es distinto de vacio entonces tiene errores
            return res.status(400).json({errors: errors.array()}) /// Aqui se muestra el codigo del error y un array de errores
        }





        const product = await Product.create(req.body)  /// req.body: La respues del json se pasa con, Para crear un nuevo registro
        //// const savedProduct = await product.save()  /// Asi se guarda la informacion
        product.save()  /// Asi se guarda la informacion

        req.body
        //// res.json({data: savedProduct})  //// Aqui retorna producto
        res.status(201).json({data: product})  //// Aqui retorna producto
}



export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params   /// obtener el parametro
    const product = await Product.findByPk(id)  /// Buscar el producto

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    // Tambien se puede Actualizar asi:
    ///product.name = req.body.name
    //product.price = req.body.price
    //product.availability = req.body.availability

    await product.update(req.body)  // Donde req.body es la data, y luego se actualiza
    await product.save()            // Aqui se guarda la informacion
    res.json({data: product})
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    // Actualizar
    /// Con patch solo se actualiza esa opcion, es decir, modificaciones parciales  y quedan todas las demas iguales
    /// se le coloca el ! para que pueda colocar el valor contrario
    product.availability = !product.dataValues.availability     
    await product.save()


    //Muestra toda la data de ese producto en particular
    //console.log(product.dataValues)
    //En esta opcion se toma la opcion de availability
    //console.log(product.dataValues.availability)

    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    await product.destroy()  /// Con esto se elimina el producto 
    res.json({data: 'Producto Eliminado'})  /// Esta es la respuesta
}