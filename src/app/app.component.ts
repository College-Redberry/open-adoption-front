import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { SidenavComponent } from "./sidenav/sidenav.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SidenavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'open-adoption-front';
}
