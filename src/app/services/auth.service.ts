import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../models/user';
 //{}[]||@<>
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private helper = new JwtHelperService()
  public loggedUser!:string;
  public isloggedIn: Boolean | undefined 
  public roles!:string[];
  token!: string;
  apiURL: string = 'http://localhost:8083/users';

  constructor(private router: Router, private http: HttpClient, ) { 

  }

  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    localStorage.removeItem('jwt')
    localStorage.removeItem('isloggedIn')
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('accessToken')
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }
  SignIn(user: User){
    
    return this.http.post<User>(this.apiURL+"/login", user, { observe : "response"})
  }

  saveToken(jwt: string){
      localStorage.setItem("jwt", jwt)
      this.token = jwt
      localStorage.setItem("isloggedIn", ""+this.isloggedIn)
      this.decodeJWT()
  }

  decodeJWT(){
    if (this.token == undefined)
      return
    const decodedJWT = this.helper.decodeToken(this.token)
    this.roles = decodedJWT.roles
    console.log("roles"+this.roles)
    this.loggedUser = decodedJWT.sub
    this.isloggedIn = true
    localStorage.setItem("loggedUser", this.loggedUser)
    
  }

  loadToken(){
    this.token = localStorage.getItem("jwt")!;
    this.decodeJWT()
  }

  isTokenExpired(): Boolean{
    return this.helper.isTokenExpired(this.token)
  }

  
    getToken():string {
    return this.token;
    }
  setLoggedUserFromLocalStorage(loggedUser: string){
              this.loggedUser = loggedUser;
              this.isloggedIn = true;
             // this.getUserRoles(loggedUser);
  }
  isAdmin(): Boolean {
    if (!this.roles) //this.roles== undefiened
      return false;
    return (this.roles.indexOf('ADMIN') >= 0);
  }
}
