import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// cargar componente

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserGuard } from './services/user.guard';// para restringir el acceso a usuarios no logeados

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'user-edit', component: UserEditComponent, canActivate:[UserGuard]},
    {path: 'users', component: UsersComponent, canActivate:[UserGuard]},
    {path: 'users/:page', component: UsersComponent, canActivate:[UserGuard]},
    {path: 'timeline', component: TimelineComponent, canActivate:[UserGuard]},
    {path: 'profile/:id', component: ProfileComponent, canActivate:[UserGuard]},
    {path: '**', component: HomeComponent}// 404
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);