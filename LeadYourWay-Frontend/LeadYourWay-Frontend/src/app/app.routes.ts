import { Routes } from '@angular/router';
import { Usuariocomponent } from './components/usuariocomponent/usuariocomponent';
import { Usuarioinsertarcomponent } from './components/usuariocomponent/usuarioinsertarcomponent/usuarioinsertarcomponent';

export const routes: Routes = [
    {path:'usuarios',component:Usuariocomponent,
    children:[
        {path:'news',component:Usuarioinsertarcomponent}
    ]
}
];
