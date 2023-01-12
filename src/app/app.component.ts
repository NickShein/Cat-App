import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cat-app';
  clickStatus = false;

  receiveClick($event: boolean) {
    this.clickStatus = $event;
  }
}
