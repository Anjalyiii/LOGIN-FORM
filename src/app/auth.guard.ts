import { CanActivateFn, Router, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { routes } from './app.routes';

export const authGuard: CanActivateFn = () => {
  const authService= inject(AuthService)               /*to get instance of AuthService*/
  const router=inject(Router)
  if (authService.isauthenticated()){
  return true;                                      /*tells the angular to load the route*/
}
  else
  {router.navigate(['/'])                                  /*if not logged in,redirect to home*/
    return false}                                             /*will not load the protected route*/
};
