import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-webcam-dialog',
  templateUrl: './webcam-dialog.component.html',
  styleUrls: ['./webcam-dialog.component.css']
})
export class WebcamDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WebcamDialogComponent>) { }

  private trigger: Subject<void> = new Subject<void>();

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  ngOnInit(): void {
  }

  takePhoto() {
    this.trigger.next();
  }

  dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }

  handleImage(event: WebcamImage) {
    let file = this.dataURLtoFile(event.imageAsDataUrl, "file")

    this.dialogRef.close(file);
  }
}
