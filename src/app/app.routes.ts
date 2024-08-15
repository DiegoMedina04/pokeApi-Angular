import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { PokedexComponent } from './features/pokedex/pokedex.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
        ]
    },
    {
        path: 'pokedex',
        component: PokedexComponent
    }

];
