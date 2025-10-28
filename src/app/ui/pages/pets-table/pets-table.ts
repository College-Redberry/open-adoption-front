import { AfterViewInit, Component, computed, inject, linkedSignal, resource, signal, Signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pet, PetProps } from '../../../domain/pet/entity';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { PetHttpRepo } from '../../../data/repository/pet/pet-http-repo';
import { PetRepo } from '../../../domain/pet/repository';
import { Pagination } from '../../../utils/http_response';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { PetsForm } from '../../components/pets-form/pets-form';

@Component({
  selector: 'app-pets-table',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    MatCardModule,
    MatIcon,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
  ],
  templateUrl: './pets-table.html',
  styleUrl: './pets-table.scss'
})
export class PetsTable {
  private petRepo = inject<PetRepo>(PetHttpRepo);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'breed', 'age', 'gender', 'isAdoped', 'actions'];
  dataSource = new MatTableDataSource<PetProps>();

  readonly pagination = signal<Pagination>({ limit: 10, offset: 0 });

  readonly petsPage = resource({
    params: () => ({ userId: "", pagination: this.pagination() }),
    loader: ({ params }) => this.petRepo.list("", params.pagination).then(value => value.unwrap()),
  });

  public loadNextPage(page: PageEvent) {
    this.pagination.set({ limit: page.pageSize, offset: page.pageIndex });
  }

  public add() {
    this.dialog.open(PetsForm, {
      data: null,
    });
  }

  public edit(pet: Pet) {
    this.dialog.open(PetsForm, {
      data: pet,
    });
  }
}
