import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Post } from 'src/app/shared/models/Post';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  posts: Post[] = [];
  postCount: number = 0;
  loggedInUser?: firebase.default.User | null;
  loggedInUserSubscription?: Subscription;
  loggedinuser: any;

  nickname: string = '';
  email: string = '';
  description: string = '';
  joined: string = '';
  avatar: string = '';
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

  postForm = new FormGroup({
    content: new FormControl<any>(''),
    title: new FormControl<any>('')
  });

  answerForm = new FormGroup({
    content: new FormControl<any>(''),
  });




  constructor(private postService: PostService,
    private authService: AuthService,
    private userService: UserService
  ) { }

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
          this.userid = currentuser?.id as string;
        });
      }
    });

    this.posts = [];
    this.postService.getAll().pipe(
      distinctUntilChanged()
    ).subscribe(posts => {
      this.posts = posts;
      console.log(this.posts);
    });

    this.loggedInUserSubscription = this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      console.log('Logged in user:', this.loggedInUser?.email);
    });
  }


  onSubmit() {
    this.postCount = this.posts.length;
    console.log(this.postForm.value)
    this.post = {
      author: this.nickname,
      content: this.postForm.get('content')?.value,
      created: new Date().toLocaleDateString(),
      replies: '0',
      title: this.postForm.get('title')?.value,
      authorid: this.userid,
      postid: this.postService.generateId()
    }

    this.postService.addPost(this.post);
    console.log('asd')
  }

  onAnswer() {
    console.log('nyomod')
    console.log(this.nickname)
  }
}
