import { Component, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ToolbarComponent {
  readonly menuClick = output();
}
