import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
 //{}[]||@<>
export class LoginComponent implements OnInit {

  erreur = 0
  user = new User()
  constructor(private authservice: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    
  }
  onLoggedin(){
    this.authservice.SignIn(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authservice.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
         this.erreur = 1;
      }
    })
  }

}
