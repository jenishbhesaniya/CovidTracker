import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaraSouleComponent } from './cara-soule.component';

describe('CaraSouleComponent', () => {
  let component: CaraSouleComponent;
  let fixture: ComponentFixture<CaraSouleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaraSouleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaraSouleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
