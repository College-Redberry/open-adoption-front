import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsTable } from './pets-table';

describe('PetsTable', () => {
  let component: PetsTable;
  let fixture: ComponentFixture<PetsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
