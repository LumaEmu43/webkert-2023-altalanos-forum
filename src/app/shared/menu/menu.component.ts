import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { authInstance$ } from '@angular/fire/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() loggedInUser?: firebase.default.User | null;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    console.log('MENU INIT');
    console.log('MENU INIT VÉGE');
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      console.log('Logged out successfully.');
    }).catch(error => {
      console.error(error);
    });
  }

  onClick(){
    setTimeout(() => {
      window.location.reload();
    }, 30);
  }
}
