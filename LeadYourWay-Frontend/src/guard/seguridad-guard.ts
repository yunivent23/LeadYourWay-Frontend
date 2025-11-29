import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Loginservice } from '../app/services/loginservice';

export const seguridadGuard: CanActivateFn = (route, state) => {
    const lService=inject(Loginservice)
    const router=inject(Router)
    const rpta=lService.verificar();
    if(!rpta){
      router.navigate(['/login']);
      return false;
    }
    return rpta;
};