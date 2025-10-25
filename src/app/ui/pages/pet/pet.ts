import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Pet as PetI} from '../../../domain/pet/entity';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pet',
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './pet.html',
  styleUrl: './pet.scss'
})
export class Pet {
  readonly pet = signal<PetI | undefined>(undefined);

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const petData = nav?.extras?.state?.['pet'] as PetI | undefined;
    if (petData) this.pet.set(petData);
  }

  currentIndex = 0;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % (this.pet()?.images?.length || 0);
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + (this.pet()?.images?.length || 0)) % (this.pet()?.images?.length || 0);
  }
}
