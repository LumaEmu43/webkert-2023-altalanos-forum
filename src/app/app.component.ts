import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'altalanos_v2';
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    console.log('APP INIT')
    this.authService.isUserLoggedIn().subscribe(user => {
      console.log('APP INIT this.authService.isUserLoggedIn().subscribe...')
      console.log(user);
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    });
    console.log('APP INIT VÉGE')
  }
}
