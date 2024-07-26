export class AuthModel{
  "_id"? : string
  "email" : string
  "password" : string

  constructor(email : string, password : string, _id? : string){
    this.email = email
    this.password = password
    this._id = _id
  }
}
