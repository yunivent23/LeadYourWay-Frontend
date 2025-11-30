import { Bicicleta } from "./bicicleta"
import { Users } from "./users"

export class Alquiler{
    idAlquiler:number=0
    precioTotal: number=0
    estadoAlquiler:string=""
    fechaInicio=new Date()
    fechaFin=new Date()
    estadoPago:boolean=false
    bicicleta=new Bicicleta()
    cliente=new Users()
    suministrador=new Users()
}