export class BlogModel{
  "_id"? : string
  "email" : string
  "title" : string
  "content" : string

  constructor(email : string, title : string, content : string, _id? : string){
    this.email = email
    this.title = title
    this.content = content
    this._id = _id
  }
}
