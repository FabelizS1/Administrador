import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'


// El nombre de la Tabla
@Table({
    tableName: 'products'
})



// Creo un producto y heredo de Model
class Product extends Model {

    // Asi es muy basico
    //@Column
    //name: string

    //@Column
    //price: number


    //Aqui es un Column y se le agrega el tipo de dato
    @Column({
        type: DataType.STRING(100)  
    })
    declare name: string    /// Donde a cada variable se le debe colocar declare


    @Column({
        type: DataType.FLOAT
    })
    declare price: number


    @Default(true)  ///// Esta es la opcion por defecto de   availability
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product
