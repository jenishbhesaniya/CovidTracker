import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineLoginComponent } from './vaccine-login.component';

describe('VaccineLoginComponent', () => {
  let component: VaccineLoginComponent;
  let fixture: ComponentFixture<VaccineLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
