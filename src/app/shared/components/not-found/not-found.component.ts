import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  public title: string;
  public subtitle: string;

  constructor() {
    this.title = 'ERROR 404';
    this.subtitle = 'Not Found';
  }

  ngOnInit() {}
}
