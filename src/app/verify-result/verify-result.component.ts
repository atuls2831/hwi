import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './verify-result.component.html',
})
export class VerifyResultComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { score: number }) {}
}
