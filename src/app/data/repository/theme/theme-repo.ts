import { effect, Injectable, signal } from '@angular/core';
import { Success } from '../../../utils/result';

@Injectable({
  providedIn: 'root'
})
export class ThemeRepo {
  readonly storageKey = "isDarkMode"
  readonly isDarkMode = signal<boolean>(JSON.parse(localStorage.getItem(this.storageKey) || "false"));

  constructor() {
    if (!this.isDarkMode()) {
      return;
    }

    this.toggleDarkMode();    
  }

  public toggleDarkMode() {
    this.isDarkMode.set(document.body.classList.toggle('dark-mode'));

    return Success();
  }

  readonly saveThemePreferenceToStorage = effect(() => {
    localStorage.setItem(this.storageKey, JSON.stringify(this.isDarkMode()));
  });
}
