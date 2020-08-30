import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarifyPrescriptionComponent } from './varify-prescription.component';

describe('VarifyPrescriptionComponent', () => {
  let component: VarifyPrescriptionComponent;
  let fixture: ComponentFixture<VarifyPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarifyPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarifyPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
