import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'



//La informacion de los metodos de swagger debe ir escrita asi con estos espacios si no no funciona




const router = Router()     ///// Para llamar a la funcion Router de Express

/** 
*
* @swagger
* components:       
*   schemas: 
*       Product:
*           type: object
*           properties: 
*               id:
*                   type: integer
*                   description: The product ID
*                   example: 1
*               name:
*                   type: string
*                   description: The product name
*                   example: Monitor Curvo de 49 Pulgadas
*               price:
*                   type: number
*                   description: The product price
*                   example: 300
*               availability:
*                   type: boolean
*                   description: The product availability
*                   example: true
* 
* 
*/


/*
router.get('/', (req, res) => {
    res.json('Desde GET')
})


router.post('/', (req, res) => {
    res.json('Desde POST')
})


router.put('/', (req, res) => {
    res.json('Desde PUT')
})


router.patch('/', (req, res) => {
    res.json('Desde PATCH')
})


router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})
*/




// Routing
/**
 * 
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *               - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *                                  
 * 
 */
router.get('/', getProducts)  ////Donde getProducts es la funcion 



/// Seria   router.get('/', getProductById)
/**
 * 
 * @swagger
 * /api/products/{id}:
 *    get:
 *      summary: Get product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path 
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      responses:
 *          200:
 *              description: Succefull response
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *              
 *          400:
 *              description: Bad Request - Invalid ID
 *              
 * 
 * 
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),   /// como es un parametro se usa este y no body y se valida que sea un valor numerico
    handleInputErrors,  //// Se usa el middleware con los errores
    getProductById     ///// Funcion para optener por producto
)

/*

router.post('/', createProduct)  Donde createProduct  es la funcion de handler/products

*/

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new Product
 *          tags: 
 *              - Products              
 *          description: Returns a new record in the database
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:         
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              name: 
 *                                  type: string
 *                                  example: "Monitor Curvo 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *          responses: 
 *              201:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                            schema: 
 *                                $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid input data
 * 
 * 
 */                 
router.post('/', 
    // Validación
    // Se usa await check('name')   porque es una funcion async en este caso lo cambiamos por body. 
    // Eliminar la opcion de .run(req)
    body('name')  
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
   
    handleInputErrors,  /// Se agrega este middleware, y si todo esta bien se va a la funcion siguiente

    createProduct   /// Funcion que esta en Product.ts
)



/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: return the updated product
 *      parameters:
 *            - in: path 
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer 
 *      requestBody: 
 *              required: true
 *              content:
 *                  application/json:         
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              name: 
 *                                  type: string
 *                                  example: "Monitor Curvo 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *      responses:
 *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product not found 
 * 
 * 
 * 
 */
router.put('/:id',  // Aqui se le agrega la variable de id

    param('id').isInt().withMessage('ID no válido'),  /// Para validar el parametro
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),

    handleInputErrors,

    updateProduct   /// Funcion que esta en el handler de product
)



/**
 * 
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags:
 *          - Products
 *      description: Return updated availability
 *      parameters:
 *            - in: path 
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer 
 *      responses:
  *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product not found     
 * 
 * 
 * 
 */
router.patch('/:id',   /// Aqui se le pasa el valor del id
    param('id').isInt().withMessage('ID no válido'),   /// Para validar el parametro, este seria el parametro
    handleInputErrors,   /// Este es un middleware
    updateAvailability   /// Se le agrega la funcion de updateAvailability
)




/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *      summary: Delete product by a given ID
 *      tags:
 *          - Products
 *      description: Return a confirmation message
 *      parameters:
 *            - in: path 
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema: 
 *                  type: integer 
 *      responses:
  *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product not found      
 * 
 */
router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct   /// Este es el delete del Product
)

export default router