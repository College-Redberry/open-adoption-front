import { Routes } from '@angular/router';
import { authenticationGuard } from './infra/guard/logged';

const login = {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./ui/pages/login/login').then(mod => mod.Login),
}

const pets = {
    path: 'pets',
    title: 'Pets',
    loadComponent: () => import('./ui/pages/pets/pets').then(mod => mod.Pets),
}

const redirectAllToLogin = { 
    path: '**', 
    redirectTo: 'login',
}

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./ui/components/unlogged/unlogged').then(mod => mod.Unlogged),
        children: [
            login,
            pets,
        ]
    },
    {
        path: '',
        canActivate: [authenticationGuard()],
        loadComponent: () => import('./ui/components/logged/logged').then(mod => mod.Logged),
    },
    redirectAllToLogin,
];
