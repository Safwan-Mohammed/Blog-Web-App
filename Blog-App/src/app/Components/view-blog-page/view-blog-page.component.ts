import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogModel } from '../../models/BlogModel';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-blog-page',
  standalone: true,
  imports: [CommonModule, ToastModule, ButtonModule],
  templateUrl: './view-blog-page.component.html',
  styleUrl: './view-blog-page.component.css'
})
export class ViewBlogPageComponent implements OnInit {
  blog! : BlogModel
  blogId! : string

  constructor(private router : ActivatedRoute, private blogService : BlogService, private messageService : MessageService){}

  ngOnInit(): void {
      this.router.params.subscribe((params) => {
        this.blogId = params['id']
      })
      this.blogService.getBlog(this.blogId).subscribe({
        next : (response) => {
          this.blog = response
        },
        error : () => {
          this.messageService.clear()
          this.messageService.add({severity: 'error', summary: 'Server Error', detail: 'Error Fetching Details. Please Try Again'})
        }
      })
  }

}
