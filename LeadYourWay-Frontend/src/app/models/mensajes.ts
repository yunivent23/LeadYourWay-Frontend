import { Chats } from "./chats"

export class Mensajes{
    idMensaje:number=0
    contenido:string=""
    fechaEnvio: Date = new Date()
    leido: boolean=false
    chats: Chats = new Chats

}