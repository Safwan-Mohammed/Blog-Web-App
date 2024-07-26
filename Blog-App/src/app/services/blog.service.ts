import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BlogModel } from '../models/BlogModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  ApiUrl : string = `http://localhost:8000`
  constructor(private http : HttpClient){}

  addBlog(blog : BlogModel) : Observable<any>{
    return this.http.post(`${this.ApiUrl}/add-blog`, blog)
  }

  getBlog(blogId : string) : Observable<BlogModel>{
    return this.http.get<BlogModel>(`${this.ApiUrl}/get-blog/${blogId}`)
  }

  getAllBlogs() : Observable<any>{
    return this.http.get<BlogModel[]>(`${this.ApiUrl}/get-all-blogs`)
  }

  deleteBlog(blogId : string) : Observable<any>{
    return this.http.post(`${this.ApiUrl}/delete-blog`, {blogId})
  }

  getUserBlogs(email : string) : Observable<any>{
    return this.http.get<BlogModel[]>(`${this.ApiUrl}/get-user-blog/${email}`)
  }
}
