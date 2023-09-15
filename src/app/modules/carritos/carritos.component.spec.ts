import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritosComponent } from './carritos.component';

describe('CarritosComponent', () => {
  let component: CarritosComponent;
  let fixture: ComponentFixture<CarritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarritosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
