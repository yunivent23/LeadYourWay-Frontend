import { Users } from "./users"

export class Bicicleta{
    idBicicleta:number=0
    descripcionBicicleta:string=""
    tipoBicicleta:string=""
    marcaBicicleta:string=""
    colorBicicleta:string=""
    estadoBicicleta:string=""
    precioBicicleta:number=0
    ubicacionBicicleta:string=""
    disponible:boolean=false
    vistas:number=0
    fechaPublicacion:Date=new Date();
    modeloBicicleta:String=""
    fotoBicicleta:String=""
    usuario:Users=new Users()
}