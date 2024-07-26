import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { BlogModel } from '../../models/BlogModel';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { BlogService } from '../../services/blog.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ToastModule, ButtonModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})

export class BlogCardComponent implements OnInit {
  @Input() blog! : BlogModel
  @Output() blogDeleted : EventEmitter<any> = new EventEmitter<any>()
  showButtons : boolean = false

  constructor(private router : Router, private blogService : BlogService, private messageService : MessageService){}

  ngOnInit() : void {
    this.showButtons = this.router.url === '/userBlogs'
  }

  editBlog(event : MouseEvent) : void{
    event.stopPropagation()
    this.router.navigate([`/createBlog/${this.blog._id}`])
  }

  deleteBlog(event : MouseEvent) : void{
    event.stopPropagation()
    this.blogService.deleteBlog(this.blog._id!).subscribe({
      next : (response) => {
        this.messageService.clear()
        this.messageService.add({severity: 'success', summary: "Success", detail: "Blog Deleted Successfully"})
        this.blogDeleted.emit()
      },
      error : () => {
        this.messageService.clear()
        this.messageService.add({severity: 'error', summary: "Failed", detail: "Internal Server Error"})
      }
    })
  }

  displayBlog(blogId : string) : void {
    this.router.navigate(['/viewBlog', blogId])
  }
}
