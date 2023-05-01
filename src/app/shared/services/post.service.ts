import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollectionName = 'Posts';
  private chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


  constructor(
    private afs: AngularFirestore
  ) { }

  getAll() {
    return this.afs.collection<Post>(this.postCollectionName).valueChanges();
  }

  addPost(post: Post) {
    return this.afs.collection<Post>(this.postCollectionName).add(post);
  }

  public generateId(): string {
    let id = '';
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * this.chars.length);
      id += this.chars[randomIndex];
    }
    return id;
  }
}

