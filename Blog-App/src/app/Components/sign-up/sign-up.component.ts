import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthModel } from '../../models/AuthModel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, ToastModule, ButtonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers:[MessageService]
})

export class SignUpComponent {

  SignOutLabel : string = 'Sign Up'

  constructor(private formBuilder : FormBuilder, private router : Router, private authService : AuthService, private messageService : MessageService){}

  SignUpForm : FormGroup = this.formBuilder.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword : ['', [Validators.required, Validators.minLength(8)]],
  })

  onSubmit() : void {
    if(this.SignUpForm.valid){
      if(this.SignUpForm.controls['password'].value !== this.SignUpForm.controls['confirmPassword'].value){
        this.showPasswordMismatchError()
      }
      else{
        const credentials : AuthModel = new AuthModel(this.SignUpForm.controls['email'].value, this.SignUpForm.controls['password'].value)
        this.addUser(credentials)
      }
    }
    else{
      this.SignUpForm.markAllAsTouched()
    }
  }

  addUser(userObj : AuthModel) : void{
    this.authService.signUp(userObj).subscribe({
      next : (response) => {
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('email', response.email)
        this.showSignUpSuccessToast()
        this.SignUpForm.reset()
        setTimeout(() => {
          this.router.navigate([''])
        }, 3000)
      },
      error : (response) => {
        if(response.status == 400){
          this.showUserExistsToast()
        }
        if(response.status == 500){
          this.showInternalServerErrorToast()
        }
      }
    })
  }

  showPasswordMismatchError() {
    this.messageService.clear()
    this.messageService.add({ key:'password-mismatch-toast', severity: 'error', summary: 'Sign Up Failed', detail: "Passwords aren't matching", life: 5000 });
  }

  showUserExistsToast() {
    this.messageService.clear()
    this.messageService.add({ key:'user-exists-toast', severity: 'warn', summary: 'Sign Up Failed', detail: "User Already Exists!", life: 5000 });
  }

  showInternalServerErrorToast(){
    this.messageService.clear()
    this.messageService.add({ key:'internal-server-error-toast', severity: 'error', summary: 'Failed', detail: "Internal Server Error!", life: 5000 });
  }

  showSignUpSuccessToast(){
    this.messageService.clear()
    this.messageService.add({ key:'success-toast', severity: 'success', summary: 'Success', detail: "Account Created Successfully! Redirecting...", life: 5000 });
  }
}
