import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, distinctUntilChanged } from 'rxjs';
import { Post } from 'src/app/shared/models/Post';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedinuser: any;
  nickname: string = '';
  email: string = '';
  description: string = '';
  joined: string = '';
  avatar: string = '';

  posts: Post[] = [];
  postCount: number = 0;
  loggedInUser?: firebase.default.User | null;
  loggedInUserSubscription?: Subscription;
  userid: string = '';
  post: Post = {
    author: '',
    content: '',
    created: '',
    replies: '',
    title: '',
    authorid: '',
    postid: ''
  };

  userUpdate: User = {
    email: '',
    id: '',
    username: '',
    description: '',
    joined: '',
    avatar: ''
  }

  profileForm = new FormGroup({
    nickname: new FormControl<any>(''),
    description: new FormControl<any>('')
  });


  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(curruser => {
      if (curruser) {
        console.log(curruser);
        this.userService.getById(curruser.uid as string).subscribe(currentuser => {
          this.nickname = currentuser?.username as string;
          this.email = currentuser?.email as string;
          this.description = currentuser?.description as string;
          this.joined = currentuser?.joined as string;
          this.avatar = currentuser?.avatar as string;
          console.log(this.userid)
        });
      }
    });

    this.postLoading();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/profile') {
        this.postLoading(); // Call the myFunction() method when the user navigates to the page
      }
    });
  }

  public postLoading() {
    this.posts = [];
    this.postService.getAll().subscribe(posts => {
      this.authService.isUserLoggedIn().subscribe(curruser => {
        this.userid = curruser?.uid as string;
      })
      posts.forEach(post => {
        if (post.authorid === this.userid) {
          this.posts.push(post)
        }
      })
    });
  }


  constructor(private authService: AuthService,
    private afs: AngularFirestore,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private postService: PostService,
    private router: Router) {
  }

  onSubmit() {
    this.authService.isUserLoggedIn().subscribe(curruser => {
      if (curruser) {
        console.log(curruser);
        this.userService.getById(curruser.uid as string).subscribe(currentuser => {
          this.userUpdate = {
            email: currentuser?.email as string,
            id: curruser.uid as string,
            username: this.profileForm.get('nickname')?.value,
            description: this.profileForm.get('description')?.value,
            joined: currentuser?.joined as string,
            avatar: currentuser?.avatar as string
          }
          console.log('userUpdate tomb:')
          console.log(this.userUpdate)

          this.userService.update(this.userUpdate);
          setTimeout(() => {
            window.location.reload();
          }, 30);
        });
      }
    });
  }

}
