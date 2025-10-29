import { Component } from '@angular/core';
import { SearchPet } from "../../components/search-pet/search-pet";
import { ObserversModule } from '@angular/cdk/observers';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pets',
  imports: [
    SearchPet,
    ObserversModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './pets.html',
  styleUrl: './pets.scss'
})
export class Pets {

}
