import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { PokedexComponent } from './features/pokedex/pokedex.component';

export const routes: Routes = [
    {
        path: '',
        component: PokedexComponent
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component:RegisterComponent
            }
        ]
    },
    {
        path: 'pokedex',
        component: PokedexComponent
    }
    
];
