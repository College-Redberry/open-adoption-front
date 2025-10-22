import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPet } from './search-pet';

describe('SearchPet', () => {
  let component: SearchPet;
  let fixture: ComponentFixture<SearchPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
