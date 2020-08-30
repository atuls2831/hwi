import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Medicine } from './medicines.model';

const BACKEND_URL = `${environment.apiUrl}/medicine`;

@Injectable({ providedIn: 'root' })
export class MedicineService {
  constructor(private http: HttpClient) {}

  getMedicines() {
    return this.http.get<Medicine[]>(BACKEND_URL);
  }
}
