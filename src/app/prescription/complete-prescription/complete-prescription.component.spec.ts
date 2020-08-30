import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePrescriptionComponent } from './complete-prescription.component';

describe('CompletePrescriptionComponent', () => {
  let component: CompletePrescriptionComponent;
  let fixture: ComponentFixture<CompletePrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletePrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
