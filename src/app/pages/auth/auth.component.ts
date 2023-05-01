import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {
  hide = true;
  email = new FormControl('');
  password = new FormControl('');
  loading: boolean = false;



  signUpForm = new FormGroup({
    username: new FormControl<any>(''),
    email: new FormControl<any>(''),
    password: new FormControl<any>(''),
    rePassword: new FormControl<any>('')
  });


  constructor(private router: Router,
    private authService: AuthService,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log('INIT FUTÁS')
    console.log('INIT VÉGE')
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value,
        username: this.signUpForm.get('username')?.value,
        description: '',
        avatar: '',
        joined: new Date().toLocaleDateString()
      };
      this.userService.create(user).then(_ => {
        console.log('User added successfully.');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }

  async login() {
    this.loading = true;
    if (this.email.value && this.password.value) {
      this.authService.login(this.email.value, this.password.value).then(cred => {
        console.log(cred.user?.email);
        this.router.navigateByUrl('/main');
        this.loading = false;
        console.log('Login was successful!')
      }).catch(error => {
        console.error(error);
        this.loading = false;
      });
    }
  }
}
