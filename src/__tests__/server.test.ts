import request from 'supertest'
import server, { connectDB } from '../server' /// Para conectar con connectDB
import db from '../config/db'


/*describe('Nuestro primer test', () => {
    //test() y it() se usan para test y las 2 son lo mismo
    it('Debe revisar que 1 + 1 sean 2', () => {
       expect(1 + 1).toBe(2) //expect() es el valor que espero, el resultado que espero y toBe() es el valor con quien se va a comparar
    })

    it('Debe revisar que 1 + 1 no sean 3', () => {
        expect(1 + 1).not.toBe(3) //expect() es el valor que espero, el resultado que espero y toBe() es el valor con quien se va a comparar
     })

}) */ // describe sirve para agrupar una serie de pruebas


/*
describe('GET /api', () => {
    it('should send back a json response', async () => {  /// Esta conexion al servidor va a ser asincrona
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)  /// Espera que la respuesta sea de 200
        console.log(res.status)
       

        expect(res.headers['content-type']).toMatch(/json/)  // Todo lo que sea '/json/'

        
        Donde se esta el valor msg   que esta en server
        server.get('/api', (req, res) => {
            res.json({msg: 'Desde API'})
        })
        console.log(res.text)
        console.log(res.body.msg)

        expect(res.body.msg).toBe('Desde API')
       
        expect(res.status).not.toBe(404)

        expect(res.body.msg).not.toBe('desde api')
        
    })
})
*/


jest.mock('../config/db')  /// Aqui se le pasa el mock


describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')   // aqui se espia,crear una funcion , se le pasa la bd y se le pasa el metodo al que se le quiere validar su comportamiento que es authenticate, todo esto del archivo del server.ts
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD')) // Con mockRejectedValueOnce se muestra el error del catch ya que esta negando
        const consoleSpy = jest.spyOn(console, 'log') /// se espera un console y se le agrega un log

        await connectDB()  ////Se ejecuta 

        expect(consoleSpy).toHaveBeenCalledWith(   /// que se ejecute consoleSpy y expect un string que es el mensaje de error
            expect.stringContaining('Hubo un error al conectar a la BD')
        )

    })
})