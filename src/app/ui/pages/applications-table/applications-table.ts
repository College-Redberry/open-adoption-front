import { Component, inject, resource, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RequestHttpRepo } from '../../../data/repository/request/request-http-repo';
import { RequestProps } from '../../../domain/request/entity';
import { RequestRepo } from '../../../domain/request/repository';
import { Pagination } from '../../../utils/http_response';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog';
import { Request } from '../../../domain/request/entity';

@Component({
  selector: 'app-applications-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './applications-table.html',
  styleUrl: './applications-table.scss'
})
export class ApplicationsTable {
  private requestRepo = inject<RequestRepo>(RequestHttpRepo);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'age',
    'property',
    'approved_at',
    'actions',
  ];

  dataSource = new MatTableDataSource<RequestProps>();
  readonly pagination = signal<Pagination>({ limit: 10, offset: 0 });

  readonly requestsPage = resource({
    params: () => ({ pagination: this.pagination() }),
    loader: ({ params }) =>
      this.requestRepo.list().then((value) => value.unwrap()),
  });

  public loadNextPage(page: PageEvent) {
    this.pagination.set({ limit: page.pageSize, offset: page.pageIndex });
  }

  public async approve(req: Request) {
    this.dialog.open(ConfirmDialog, {
      data: {
        content: "Tem certeza?",
      },
    }).afterClosed().subscribe(() => {
      this.requestRepo.approve(req.id).then(() => {
        this.requestsPage.reload()
      });
    });
  }
}
