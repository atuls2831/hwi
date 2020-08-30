import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WebcamDialogComponent } from 'src/app/webcam-dialog/webcam-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{
  isLoading: boolean = false;
  private authStatusSub: Subscription;
  fileToUpload: File = null;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

  // for error handling, to hide spinner on failure
  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        // false is emmited from authservice on failure
        if (!authStatus ) {
          this.isLoading = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return ;
    }
    this.isLoading = true;
    console.log(form.value);
    console.log(this.fileToUpload);
    this.authService.createUser(form.value.email, form.value.password, this.fileToUpload);
  }

  onTakePhoto() {
    let dialogRef = this.dialog.open(WebcamDialogComponent)

    dialogRef.afterClosed().subscribe((result: File) => {
      this.fileToUpload = result;
    });
  }
}
