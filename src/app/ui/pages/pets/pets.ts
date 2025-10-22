import { Component } from '@angular/core';
import { SearchPet } from "../../components/search-pet/search-pet";
import { ObserversModule } from '@angular/cdk/observers';

@Component({
  selector: 'app-pets',
  imports: [
    SearchPet,
    ObserversModule,
  ],
  templateUrl: './pets.html',
  styleUrl: './pets.scss'
})
export class Pets {

}
