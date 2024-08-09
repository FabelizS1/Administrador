import swaggerJSDoc from 'swagger-jsdoc'  
import { SwaggerUiOptions } from 'swagger-ui-express'


/// Esto es para usar el swagger
const options : swaggerJSDoc.Options = {  
    swaggerDefinition: {
        openapi: '3.0.2',  /// Version API
        tags: [
            {
                name: 'Products',  // Esta es la opcion que se va a documentar que en este caso seria Products
                description: 'API operations related to products' /// Descripcion 
            }
        ], 
        info: {  // informacion general de la API
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0", 
            description: "API Docs for Products"
        }
    }, 
    apis: ['./src/router.ts']  /// Esto es donde va a escontrar los endpoints que se van a documentar
}




const swaggerSpec = swaggerJSDoc(options)   /// Aqui se usa la informacion de las options de arriba



//// Para actualizar el logo
const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg');
            height: 80px;
            width: auto;
        }
            
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript'
}

export default swaggerSpec
export {
    swaggerUiOptions
}