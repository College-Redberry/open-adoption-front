import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsForm } from './pets-form';

describe('PetsForm', () => {
  let component: PetsForm;
  let fixture: ComponentFixture<PetsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
