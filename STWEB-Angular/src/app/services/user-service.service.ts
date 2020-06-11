import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { UserApp } from "../entities/usuario";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlApp: string = "https://back-turismoaragon.herokuapp.com/users";
  private urlAppGoogle: string = "https://back-turismoaragon.herokuapp.com/auth/google";

  constructor(private http: HttpClient) {

   }

  public logIn(email: string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    let options = { headers: headers };
    let json = {'email': email, 'password': password};
    return this.http.post( this.urlApp + '/login', JSON.stringify(json), options);
  }

  public loginGoogle() {
    return this.http.get( this.urlAppGoogle );
  }

  public register(user: UserApp) {
    return this.http.post( 'localhost:3000/register', user);
  }

  public getUsers(){
    return this.http.get(this.urlApp + '/');
  }

  public updateUser(user: UserApp) {
      this.http.post( 'localhost:3000/updateUser/' + user.id, user).subscribe( data => {

      });
      return user;
  }

  public deleteUser(id: number) {
    return this.http.delete('localhost:3000/delete/' + id);
  }

  public sendTokenToBackEnd(token: string){
      this.http.post('localhost:3000/google',
            {
               token: token
            }
         ).subscribe(
            onSuccess => {
               //login was successful
               //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
            }, onFail => {
               //login was unsuccessful
               //show an error message
            }
         );
    }

}
