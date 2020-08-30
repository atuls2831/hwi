import { Component, OnInit, OnDestroy } from '@angular/core';
import { PrescriptionService } from '../prescription.service';

import { Prescription } from '../prescription.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-varify-prescription',
  templateUrl: './varify-prescription.component.html',
  styleUrls: ['./varify-prescription.component.css'],
})
export class VarifyPrescriptionComponent implements OnInit {
  unverifiedPrescriptions: Prescription[] = [];
  private unverifiedSub: Subscription;
  isLoading = false;

  constructor(public PrescriptionService: PrescriptionService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.PrescriptionService.getUnverified();
    this.unverifiedSub = this.PrescriptionService.getUnverifiedUpdateListener().subscribe(
      (prescriptions: Prescription[]) => {
        this.unverifiedPrescriptions = prescriptions;
        console.log(this.unverifiedPrescriptions);
        this.isLoading = false;
      }
    );
  }

  onVerify(prescription: Prescription) {
    this.PrescriptionService.verifyPrescription(prescription._id).subscribe(
      () => {
        this.isLoading = true;
        this.PrescriptionService.getUnverified();
      }
    );
  }

  ngOnDestroy() {
    this.unverifiedSub.unsubscribe();
  }
}
