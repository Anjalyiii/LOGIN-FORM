import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { signal } from '@angular/core';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { CreateBinComponent } from './components/create-bin/create-bin.component';
import { authGuard } from './auth.guard';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'create',component:CreateBinComponent,canActivate:[authGuard]},      /*go to createBin only if user is authenticated*/
    {path:'about',loadComponent: () =>                                      /*lazy loading,suppose we have a component which is big in size, so we can use lazy loading so it doesn't load with main bundle and only load separately when asked*/
        import('./components/about/about.component').then(                  /*dynamic ES module import,load only when needed*/
          (mod) => mod.AboutComponent                                       /*once file loaded,extract about*/
        ),},
    {path:'',redirectTo:"/login",pathMatch:'full'},   
    {path: 'user-form', component: UserFormComponent},     /*pathmatch should be full otherwise blank is in above two paths too*/
    {path:'**',component:NotFoundComponent}               /*always write it in last otherwise it will show not found for every path including above all*/
];
