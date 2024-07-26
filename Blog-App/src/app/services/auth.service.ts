import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { AuthModel } from '../models/AuthModel';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  ApiUrl : string = `https://blog-server-safwan-mohammeds-projects.vercel.app/`
  loggedIn = new BehaviorSubject<boolean>(false)

  constructor(private http : HttpClient, private router : Router, private messageService : MessageService){
    this.loggedIn.next(!!localStorage.getItem('email'))
  }

  get isLoggedIn() : Observable<boolean>{
    return this.loggedIn.asObservable()
  }

  signUp(loginObj: AuthModel): Observable<any> {
    return this.http.post(`${this.ApiUrl}/auth/sign-up`, loginObj).pipe(
      tap(() => {
        this.loggedIn.next(true);
      }),
      catchError((error) => {
        console.error('Sign up failed:', error);
        return throwError(error);
      })
    );
  }

  signIn(loginObj: AuthModel): Observable<any> {
    return this.http.post(`${this.ApiUrl}/auth/sign-in`, loginObj).pipe(
      tap(() => {
        this.loggedIn.next(true);
      }),
      catchError((error) => {
        console.error('Sign in failed:', error);
        if(error.status == 400){
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: `User Doesn't Exist. Please Sign Up!`
          });
      }
      else{
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Internal Server Error'
        });
      }
        return throwError(error);
      })
    );
  }

  signOut(loginObj: {refreshToken : string, email : string}): void {
    this.http.post(`${this.ApiUrl}/auth/sign-out`, loginObj).subscribe({
      next : (response) => {
        this.loggedIn.next(false)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('email')
        this.messageService.clear()
        this.messageService.add({
          severity: 'success',
          summary: 'Logged Out',
          detail: 'You have been successfully logged out.'
        });
        setTimeout(() => {
          this.router.navigate([''])
        }, 3000)
      },
      error: (response) => {
        this.messageService.clear()
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error logging out. Please try again.'
        });
      }
    })
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<any>(`${this.ApiUrl}/auth/refresh-token`, { refreshToken }).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.accessToken);
      }),
      catchError((error) => {
        this.messageService.clear()
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Internal Server Error. Please try again.'
        });
        return throwError(error);
      })
    );
  }
}
