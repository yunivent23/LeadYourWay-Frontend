import { Routes } from '@angular/router';
import { Usuariocomponent } from './components/usuariocomponent/usuariocomponent';
import { Usuarioinsertar } from './components/usuariocomponent/usuarioinsertar/usuarioinsertar';
import { Usuariobuscar } from './components/usuariocomponent/usuariobuscar/usuariobuscar';
import { Bicicletacomponent } from './components/bicicletacomponent/bicicletacomponent';
import { Bicicletabuscar } from './components/bicicletacomponent/bicicletabuscar/bicicletabuscar';
import { Bicicletainsertar } from './components/bicicletacomponent/bicicletainsertar/bicicletainsertar';
import { Sesion } from './components/sesion/sesion';
import { Iniciosesion } from './components/sesion/iniciosesion/iniciosesion';

export const routes: Routes = [
    {path:'users',component:Usuariocomponent,
    children:[
        {path:'news',component:Usuarioinsertar},
        {path:'edits/:id',component:Usuarioinsertar},
        {path:'searchs',component:Usuariobuscar}
    ],
    },
    {
        path:'bicicleta',
        component:Bicicletacomponent,
        children:[
        {path:'news',component:Bicicletainsertar},
        {path:'edits/:id',component:Bicicletainsertar},
        {path:'searchs',component:Bicicletabuscar}
        ],
    },

    {
        path:'sesion',
        component:Sesion,
        children:[
        {path:'inicio',component:Iniciosesion}
        ],
    }
];
