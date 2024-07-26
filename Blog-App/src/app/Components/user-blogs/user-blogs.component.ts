import { Component, OnInit } from '@angular/core';
import { BlogModel } from '../../models/BlogModel';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { BlogService } from '../../services/blog.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-blogs',
  standalone: true,
  imports: [CommonModule, BlogCardComponent, ToastModule, ButtonModule],
  templateUrl: './user-blogs.component.html',
  styleUrl: './user-blogs.component.css'
})

export class UserBlogsComponent implements OnInit {
    UserBlogLabel : string = 'Your Blogs'
    blogsArray : BlogModel[] = []

    constructor(private blogService : BlogService, private messageService : MessageService){}

    ngOnInit(): void {
      this.loadBlogs()
    }

    onBlogDeleted() : void{
      this.loadBlogs()
    }

    loadBlogs() : void {
      this.blogService.getUserBlogs(localStorage.getItem("email")!).subscribe({
        next : (response) => {
          this.blogsArray = response.blogs
        },
        error : () => {
          this.messageService.clear()
          this.messageService.add({severity: 'error', summary: 'Error Fetching Blogs', detail: 'Please Try Refreshing The Page'})
        }
      })
    }
}
