import { Routes } from '@angular/router';
import { authenticationGuard } from './infra/guard/logged';

const login = {
    path: 'admin/login',
    title: 'Login',
    loadComponent: () => import('./ui/pages/login/login').then(mod => mod.Login),
}

const pets = {
    path: 'pets',
    title: 'Pets',
    loadComponent: () => import('./ui/pages/pets/pets').then(mod => mod.Pets),
}

const applyForm = {
    path: 'pets/:id/form',
    title: 'Form',
    loadComponent: () => import('./ui/pages/apply-form/apply-form').then(mod => mod.ApplyForm),
}

const pet = {
    path: 'pets/:id',
    title: 'Pet',
    loadComponent: () => import('./ui/pages/pet/pet').then(mod => mod.Pet),
}

const petsTable = {
    path: 'pets',
    title: 'Pets',
    loadComponent: () => import('./ui/pages/pets-table/pets-table').then(mod => mod.PetsTable),
}

const redirectAllToLogin = { 
    path: '**', 
    redirectTo: 'admin/login',
}

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./ui/components/unlogged/unlogged').then(mod => mod.Unlogged),
        children: [
            login,
            pets,
            applyForm,
            pet,
        ]
    },
    {
        path: 'admin',
        canActivate: [authenticationGuard()],
        loadComponent: () => import('./ui/components/logged/logged').then(mod => mod.Logged),
        children: [
            petsTable,
        ]
    },
    redirectAllToLogin,
];
