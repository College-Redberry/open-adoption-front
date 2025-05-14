import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly storageKey = "isDarkMode"
  readonly isDarkMode = signal<boolean>(JSON.parse(localStorage.getItem(this.storageKey) || "false"));

  constructor() {
    if (!this.isDarkMode()) {
      return;
    }

    this.toggleDarkMode();    
  }

  toggleDarkMode() {
    this.isDarkMode.set(document.body.classList.toggle('dark-mode'));
  }

  readonly saveThemePreferenceToStorage = effect(() => {
    localStorage.setItem(this.storageKey, JSON.stringify(this.isDarkMode()));
  });
}
