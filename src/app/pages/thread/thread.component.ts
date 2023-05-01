import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  loggedInUser?: firebase.default.User | null;
  loggedInUserSubscription?: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log('THREAD INIT')
    this.loggedInUserSubscription = this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      console.log('Logged in user:', this.loggedInUser?.email);
    });
  }

  topics: any[] = [
    {
      id: 1,
      title: 'Angular Forms',
      description: 'How to build forms in Angular',
      author: 'John Doe',
      date: new Date('2022-01-01'),
    },
    {
      id: 2,
      title: 'Angular Components',
      description: 'How to use components in Angular',
      author: 'Jane Smith',
      date: new Date('2022-01-02'),
    },
    {
      id: 3,
      title: 'Angular Directives',
      description: 'How to create directives in Angular',
      author: 'Bob Johnson',
      date: new Date('2022-01-03'),
    },
    {
      id: 4,
      title: 'Macskák cuki cicák',
      description: 'Hogyan kell cuki cicákat simogatni',
      author: 'Gyanús Fickó',
      date: new Date('2022-01-03'),
    },
  ];

}
