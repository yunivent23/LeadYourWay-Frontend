import { Rol } from "./rol"

export class Usuario{
    id: number=0
    username: string=""
    password: string=""
    enabled: boolean=false
    dni: string=""
    email: string=""
    fecha: Date=new Date()
    telefono: string=""
    direccion: string=""
    roles: Rol[]=[]
    fotoUsuario: string=""
}