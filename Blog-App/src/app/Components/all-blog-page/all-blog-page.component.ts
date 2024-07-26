import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { BlogModel } from '../../models/BlogModel';
import { BlogService } from '../../services/blog.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-all-blog-page',
  standalone: true,
  imports: [CommonModule, BlogCardComponent, ToastModule, ButtonModule],
  templateUrl: './all-blog-page.component.html',
  styleUrl: './all-blog-page.component.css'
})
export class AllBlogPageComponent implements OnInit {
  AllBlogLabel : string = 'All Blogs'
  blogsArray : BlogModel[] = []

  constructor(private blogService : BlogService, private messageService : MessageService){}

  ngOnInit(): void {
      this.blogService.getAllBlogs().subscribe({
        next : (response) =>{
          this.blogsArray = response?.blog
        },
        error : () => {
          this.messageService.clear()
          this.messageService.add({severity: 'error', summary: 'Internal Server Error', detail: 'Please Try Reloading The Page'})
        }
      })
  }
}
