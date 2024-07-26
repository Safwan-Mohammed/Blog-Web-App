import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BlogModel } from '../../models/BlogModel';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-blog-page',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, ReactiveFormsModule, ToastModule, ButtonModule],
  templateUrl: './create-blog-page.component.html',
  styleUrl: './create-blog-page.component.css'
})

export class CreateBlogPageComponent implements OnInit {

  createBlogLabel : string = 'New Blog'
  updateBlogLabel : string = 'Update Blog'
  editBlog : boolean = false
  editBlogObj : any = {}

  constructor(private formBuilder : FormBuilder, private blogService : BlogService, private router : ActivatedRoute, private messageService : MessageService){}

  NewBlog : FormGroup = this.formBuilder.group({
    title : ['', Validators.required],
    content : ['', Validators.required]
  })

  ngOnInit(): void {
    let blogId : string = ''
    this.router.params.subscribe((params) => {
      blogId = params['id']
    })

    if(blogId?.length > 0){
      this.editBlog = true
      this.blogService.getBlog(blogId).subscribe({
        next : (response) => {
          this.editBlogObj = response
          this.NewBlog.setValue({
            title : response.title,
            content : response.content
          })
        },
        error : () => {
          this.blogErrorToast()
        }
      })
    }
  }

  onSubmit() : void {
    if(this.NewBlog.valid){
      // Fetch Email from state
      if(this.editBlog){
        this.editBlogObj.title = this.NewBlog.controls['title'].value
        this.editBlogObj.content = this.NewBlog.controls['content'].value
        this.addBlog(this.editBlogObj)
      }
      else{
      const newBlog : BlogModel = new BlogModel(localStorage.getItem("email")!, this.NewBlog.controls['title'].value, this.NewBlog.controls['content'].value)
      this.addBlog(newBlog)
    }}
    else{
      this.NewBlog.markAllAsTouched()
    }
  }

  addBlog(newBlog : BlogModel) : void {
    this.blogService.addBlog(newBlog).subscribe({
      next: (response) => {
        if(this.editBlog){
          this.blogUpdateToast()
        }
        else{
          this.blogAddedToast()
        }
        this.NewBlog.reset()
      },
      error: (response) => {
        if(response.status == 400){
          this.blogExistsToast()
        }
        if(response.status == 500){
          this.blogErrorToast()
        }
      }
    })
  }

  blogAddedToast(){
    this.messageService.clear()
    this.messageService.add({key:'blog-added', severity: 'success', summary: 'Success', detail: 'Blog Added Successfully!'})
  }

  blogUpdateToast(){
    this.messageService.clear()
    this.messageService.add({key:'blog-updated', severity: 'success', summary: 'Success', detail: 'Blog Updated Successfully!'})
  }

  blogExistsToast(){
    this.messageService.clear()
    this.messageService.add({key:'blog-exists', severity: 'error', summary: 'Failed', detail: 'Blog Already Exists!'})
  }

  blogErrorToast(){
    this.messageService.clear()
    this.messageService.add({key:'blog-error', severity: 'error', summary: 'Failed', detail: 'Internal Server Error!'})
  }
}
