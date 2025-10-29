import { Component, computed, effect, inject, linkedSignal, resource, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Pet } from '../../../domain/pet/entity';
import { PetHttpRepo } from '../../../data/repository/pet/pet-http-repo';
import { PetRepo } from '../../../domain/pet/repository';
import { debounceTime } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Pagination } from '../../../utils/http_response';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search-pet',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './search-pet.html',
  styleUrl: './search-pet.scss'
})
export class SearchPet {
  private petRepo = inject<PetRepo>(PetHttpRepo);

  readonly name = signal('');
  readonly breed = signal('');
  readonly age = signal('');
  readonly gender = signal('');
  readonly isAdopted = signal<boolean | null>(null);

  readonly debouncedFilters = toSignal(
    toObservable(
      computed(() => ({
        name: this.name(),
        breed: this.breed(),
        age: this.age(),
        gender: this.gender(),
        is_adopted: this.isAdopted(),
      }))
    ).pipe(debounceTime(500)),
    { initialValue: { name: '', breed: '', age: '', gender: '', is_adopted: null } }
  );

  readonly pagination = signal<Pagination>({ limit: 10, offset: 0 });

 readonly petPage = resource({
    params: () => ({
      filters: this.debouncedFilters(),
      pagination: this.pagination(),
    }),
    loader: ({ params }) => this.petRepo.list(params.filters, params.pagination).then(value => value.unwrap()),
  });

  readonly pets: WritableSignal<Pet[]> = linkedSignal({
    source: () => this.petPage.value()?.data || [],
    computation: (source, previous) => this.petsComputation(source, previous?.value || []),
  });

  readonly areAllPetsLoaded = computed(() => {
    const petsCount = this.petPage.value()?.count;
    return !!petsCount && petsCount === this.pets()?.length;
  });

  public loadNextPage() {
    if (this.areAllPetsLoaded() || this.petPage.isLoading()) {
      return;
    }

    this.pagination.update((value) => ({ limit: 10, offset: value.offset + (value.limit || 0) }));
  }

  private petsComputation(oldPets: Pet[], newPets: Pet[]) {
    const merged = [...newPets, ...oldPets];
    return Array.from(new Map(merged.map(item => [item.id, item])).values());
  }

  readonly teste = effect(() => {
    this.debouncedFilters();
    this.pets.set([]);
  })
}
