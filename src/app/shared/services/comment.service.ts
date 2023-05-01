import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  postCollectionName = 'Comments';


  constructor(
    private afs: AngularFirestore
  ) { }

  getAll() {
    return this.afs.collection<Comment>(this.postCollectionName).valueChanges();
  }

  addComment(comment: Comment) {
    return this.afs.collection<Comment>(this.postCollectionName).add(comment);
  }
}
