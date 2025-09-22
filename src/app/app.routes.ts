import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { signal } from '@angular/core';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { CreateBinComponent } from './components/create-bin/create-bin.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'create',component:CreateBinComponent,canActivate:[authGuard]},
    {path:'about',loadComponent: () =>
        import('./components/about/about.component').then(
          (mod) => mod.AboutComponent
        ),},
    {path:'',redirectTo:"/login",pathMatch:'full'},        /*pathmatch should be full otherwise blank is in above two paths too*/
    {path:'**',component:NotFoundComponent}               /*always write it in last otherwise it will show not found for every path including above all*/
];
