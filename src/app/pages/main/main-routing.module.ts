import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ThreadComponent } from '../thread/thread.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'thread', component: ThreadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }


//KÉSŐBBRE MÉG JÓ LEHET
/*
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicComponent } from './topic/topic.component';

const routes: Routes = [
  { path: 'topic/:id', component: TopicComponent },
  // other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/