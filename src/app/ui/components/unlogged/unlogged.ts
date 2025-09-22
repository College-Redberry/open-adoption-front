import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../toolbar/toolbar';

@Component({
  selector: 'app-unlogged',
  imports: [Toolbar, RouterOutlet],
  templateUrl: './unlogged.html',
  styleUrl: './unlogged.scss'
})
export class Unlogged {

}
