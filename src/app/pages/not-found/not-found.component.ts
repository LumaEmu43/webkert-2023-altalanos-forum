import { Component, OnInit } from '@angular/core';
import { ReversePipe } from 'src/app/shared/pipes/reverse.pipe';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
