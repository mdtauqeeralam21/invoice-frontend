import { CanActivateFn } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  
  return authService.getUserProfile().pipe(
    map(userProfile => {
      if (userProfile.isAdmin) {
        return true; // User is admin, allow access
      } else {
        return false;
      }
    })
  );
}
