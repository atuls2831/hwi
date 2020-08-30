import { Component, OnInit, OnDestroy } from '@angular/core';
import { Prescription } from '../prescription.model';
import { Subscription } from 'rxjs';
import { PrescriptionService } from '../prescription.service';
import { MatDialog } from '@angular/material/dialog';
import { WebcamDialogComponent } from 'src/app/webcam-dialog/webcam-dialog.component';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css'],
})
export class PrescriptionListComponent implements OnInit, OnDestroy {
  isLoading = true;
  pres: Prescription[];
  presVerified: Prescription[];
  presWaitingRefill: Prescription[];
  private prescriptionSub: Subscription;

  constructor(
    public presService: PrescriptionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.presService.getPrescriptions();
    this.prescriptionSub = this.presService
      .getPrescriptionUpdateListener()
      .subscribe((postsData: { prescriptions: Prescription[] }) => {
        const prescriptions = postsData.prescriptions;

        this.presVerified = prescriptions.filter(
          (m) => !m.awaitingRefil && m.verified
        );
        this.presWaitingRefill = prescriptions.filter((m) => m.awaitingRefil);
        this.pres = prescriptions.filter(
          (m) => !m.awaitingRefil && !m.verified
        );

        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.prescriptionSub.unsubscribe();
  }

  fileToUpload: File = null;

  needsFileUpload(prescription: Prescription) {
    return prescription.idCheck;
  }

  canRequestRefill(prescription: Prescription) {
    return !this.needsFileUpload(prescription) || this.fileToUpload != null;
  }

  onRequestRefill(prescription: Prescription) {
    this.isLoading = true;
    this.presService
      .requestRefill(prescription._id, this.fileToUpload)
      .subscribe(() => {
        this.presService.getPrescriptions();
      });
  }

  onTakePhoto() {
    let dialogRef = this.dialog.open(WebcamDialogComponent);

    dialogRef.afterClosed().subscribe((result: File) => {
      this.fileToUpload = result;
    });
  }
}
