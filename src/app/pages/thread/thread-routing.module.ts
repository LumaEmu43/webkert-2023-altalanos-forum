import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreadModule } from './thread.module';
import { ThreadComponent } from './thread.component';

const routes: Routes = [
  { path: '', component: ThreadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreadRoutingModule { }
