import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // if (event.url.match('/usuario')) {
        if (event.url === '/usuario' || event.url === '/usuario/perfil') {
          this.hideElement = true;
        } else {
          this.hideElement = false;
        }
      }
    });
  }

  public hideElement: boolean = false;
}
