import { Component } from '@angular/core';
import { SearchPet } from "../../components/search-pet/search-pet";
import { ObserversModule } from '@angular/cdk/observers';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pets',
  imports: [
    SearchPet,
    ObserversModule,
    RouterLink,
  ],
  templateUrl: './pets.html',
  styleUrl: './pets.scss'
})
export class Pets {

}
