import { Component, OnInit, OnDestroy } from '@angular/core';
import { Prescription } from '../prescription.model';
import { Subscription } from 'rxjs';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-complete-prescription',
  templateUrl: './complete-prescription.component.html',
  styleUrls: ['./complete-prescription.component.css'],
})
export class CompletePrescriptionComponent implements OnInit, OnDestroy {
  pendingPrescriptions: Prescription[] = [];
  private pendingSub: Subscription;
  isLoading = false;

  constructor(public PrescriptionService: PrescriptionService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.PrescriptionService.getRefillPending();
    this.pendingSub = this.PrescriptionService.getRefillPendingListener().subscribe(
      (prescriptions: Prescription[]) => {
        this.pendingPrescriptions = prescriptions;
        console.log(this.pendingPrescriptions);
        this.isLoading = false;
      }
    );
  }

  onComplete(prescription: Prescription) {
    this.PrescriptionService.deletePrescription(prescription._id).subscribe(
      () => {
        this.isLoading = true;
        this.PrescriptionService.getRefillPending();
      }
    );
  }

  ngOnDestroy() {
    this.pendingSub.unsubscribe();
  }
}
