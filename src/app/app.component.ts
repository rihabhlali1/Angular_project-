import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flesk-btoc';

  constructor(private route: ActivatedRoute) {}

  isOverlayVisible(): boolean {
    return this.route.snapshot.firstChild?.queryParams['overlay'] === 'true';
  }
}
