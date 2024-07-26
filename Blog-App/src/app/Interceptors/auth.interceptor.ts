import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, switchMap, throwError, EMPTY } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(authReq);
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && accessToken) {
        return authService.refreshAccessToken().pipe(
          switchMap(() => {
            const newAccessToken = localStorage.getItem('accessToken');
            if (newAccessToken) {
              const modifiedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              return next(modifiedReq);
            }
            return throwError(() => new Error('Failed to retrieve new access token'));
          }),
          catchError((refreshError) => {
            console.error('Error handling expired access token:', refreshError);
            router.navigate(['/signIn']);
            return EMPTY;
          })
        );
      }
      return throwError(() => error);
    })
  );
};
