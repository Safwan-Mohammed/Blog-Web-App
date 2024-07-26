import { Routes } from '@angular/router';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { CreateBlogPageComponent } from './Components/create-blog-page/create-blog-page.component';
import { ViewBlogPageComponent } from './Components/view-blog-page/view-blog-page.component';
import { AllBlogPageComponent } from './Components/all-blog-page/all-blog-page.component';
import { UserBlogsComponent } from './Components/user-blogs/user-blogs.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  {path: '', component: AllBlogPageComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'createBlog/:id', component: CreateBlogPageComponent, canActivate : [AuthGuardService]},
  {path: 'createBlog', component: CreateBlogPageComponent, canActivate : [AuthGuardService]},
  {path: 'viewBlog/:id', component: ViewBlogPageComponent},
  {path: 'userBlogs', component: UserBlogsComponent, canActivate : [AuthGuardService]},
  {path: '**', redirectTo: ''}
];
