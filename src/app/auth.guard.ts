import { CanActivateFn, Router, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { routes } from './app.routes';

export const authGuard: CanActivateFn = () => {
  const authService= inject(AuthService)
  const router=inject(Router)
  if (authService.isauthenticated()){
  return true;}
  else
  {router.navigate(['/'])
    return false}
};
