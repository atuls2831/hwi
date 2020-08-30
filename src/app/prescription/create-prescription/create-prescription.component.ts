import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../../medicines/medicine.service';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-create-prescription',
  templateUrl: './create-prescription.component.html',
  styleUrls: ['./create-prescription.component.css'],
})
export class CreatePrescriptionComponent implements OnInit {
  allMedicines = [];
  isLoading: Boolean = true;

  constructor(
    public prescriptionService: PrescriptionService,
    public MedicineService: MedicineService
  ) {}

  ngOnInit(): void {
    this.MedicineService.getMedicines().subscribe((medicines) => {
      this.allMedicines = medicines;
      this.allMedicines.sort((med1, med2) => {
        if (med1.name < med2.name) {
          return -1;
        } else if (med1.name > med2.name) {
          return 1;
        } else {
          return 0;
        }
      });
      this.isLoading = false;
    });
  }

  async onSubmit(medicines) {
    this.isLoading = true;
    await this.prescriptionService.addPrescription(
      medicines.map((m) => m.value)
    );
  }
}
