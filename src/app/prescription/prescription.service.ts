import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Prescription } from './prescription.model';

import { environment } from '../../environments/environment';
const BACKEND_URL = `${environment.apiUrl}/prescription`;

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  private prescriptions: Prescription[] = [];
  private unverified: Prescription[] = [];
  private refillPending: Prescription[] = [];

  private prescriptionsUpdated = new Subject<{
    prescriptions: Prescription[];
  }>();

  private unverifiedUpdated = new Subject<Prescription[]>();
  private refillPendingUpdated = new Subject<Prescription[]>();

  constructor(private http: HttpClient, private router: Router) {}

  async getPrescriptions() {
    const transformedPrescriptions = await this.http
      .get<{
        prescriptions: any;
      }>(BACKEND_URL)
      .toPromise();
    console.log(transformedPrescriptions);
    this.prescriptions = transformedPrescriptions.prescriptions;
    this.prescriptionsUpdated.next({
      prescriptions: [...this.prescriptions],
    });
  }

  getPrescriptionUpdateListener() {
    return this.prescriptionsUpdated.asObservable();
  }

  async getUnverified() {
    const transformedPrescriptions = await this.http
      .get<{
        prescriptions: any;
      }>(BACKEND_URL + '/unverified')
      .toPromise();
    console.log(transformedPrescriptions);
    this.unverified = transformedPrescriptions.prescriptions;
    this.unverifiedUpdated.next([...this.unverified]);
  }

  getUnverifiedUpdateListener() {
    return this.unverifiedUpdated.asObservable();
  }

  async getRefillPending() {
    const transformedPrescriptions = await this.http
      .get<{
        prescriptions: any;
      }>(BACKEND_URL + '/refill-pending')
      .toPromise();
    console.log(transformedPrescriptions);
    this.refillPending = transformedPrescriptions.prescriptions;
    this.refillPendingUpdated.next([...this.refillPending]);
  }

  getRefillPendingListener() {
    return this.refillPendingUpdated.asObservable();
  }

  async addPrescription(medicines: string[], image: File | null) {
    const postData = new FormData();
    postData.append('medicines', medicines.join());
    if (image) {
      postData.append('image', image);
    }
    const responseData = await this.http
      .post<any>(BACKEND_URL, postData)
      .toPromise();
    this.router.navigate(['/']);
  }

  requestRefill(prescriptionID: String, image: File | null) {
    let requestData = new FormData();
    if (image) {
      requestData.append('image', image);
    }
    console.log(prescriptionID);

    return this.http.post(
      `${BACKEND_URL}/recognise/${prescriptionID}`,
      requestData
    );
  }

  verifyPrescription(prescriptionID: String) {
    return this.http.put(`${BACKEND_URL}/verify/${prescriptionID}`, null);
  }

  deletePrescription(prescriptionID: String) {
    return this.http.get(`${BACKEND_URL}/complete/${prescriptionID}`);
  }
}
