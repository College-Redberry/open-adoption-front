import { Component, computed, inject } from '@angular/core';
import { ThemeRepo } from '../../../data/repository/theme/theme-repo';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Command } from '../../../utils/command';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {
  private themeRepo = inject(ThemeRepo);
  readonly isDarkMode = computed(() => this.themeRepo.isDarkMode());

  readonly toggleDarkModeCommand = new Command(() => this.themeRepo.toggleDarkMode());
}
