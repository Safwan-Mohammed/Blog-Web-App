import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthModel } from '../../models/AuthModel';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, RouterModule, ToastModule, ButtonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  SignInLabel : string = 'Sign In'
  constructor(private formBuilder : FormBuilder, private router : Router, private authService : AuthService, private messageService : MessageService){}

  LoginForm : FormGroup = this.formBuilder.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(8)]]
  })

  onSubmit() : void {
    if(this.LoginForm.valid){
      const credentials : AuthModel = new AuthModel(this.LoginForm.controls['email'].value, this.LoginForm.controls['password'].value)
      this.authService.signIn(credentials).subscribe((response) => {
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('email', response.email)
        this.showSuccessToast()
        this.LoginForm.reset()
        setTimeout(() => {
          this.router.navigate([''])
        }, 3000)
      })
    } else{
      this.LoginForm.markAllAsTouched()
    }
  }

  showSuccessToast(){
    this.messageService.clear()
    this.messageService.add({key: 'success-toast', severity: 'success', summary: 'Success', detail: "Logged In Successfully! Redirecting..."})
  }
}
