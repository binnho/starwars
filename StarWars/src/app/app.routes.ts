import { PersonagemComponent } from './personagem/personagem.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FilmeComponent } from './filme/filme.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'personagens', component: PersonagemComponent },
    { path: 'filmes', component: FilmeComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
