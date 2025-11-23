import { Users } from "./users"

export class Bicicleta{
    idBicicleta:number=0
    descripcionBicicleta:String=""
    tipoBicicleta:String=""
    marcaBicicleta:String=""
    colorBicicleta:String=""
    estadoBicicleta:String=""
    precioBicicleta:number=0
    ubicacionBicicletaString=""
    disponible:boolean=false
    vistas:number=0
    fechaPublicacion:Date=new Date();
    modeloBicicleta:String=""
    fotoBicicleta:String=""
    usuario:Users=new Users()
}