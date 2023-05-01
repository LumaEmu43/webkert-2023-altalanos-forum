import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  postCollectionName = 'Posts';

  constructor(
    private afs: AngularFirestore
  ) { }

  getAll() {
    return this.afs.collection<Post>('posts').valueChanges();
  }
}
