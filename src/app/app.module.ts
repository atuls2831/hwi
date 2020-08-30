import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-matrial.module';
import { WebcamModule } from 'ngx-webcam';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { CreatePrescriptionComponent } from './prescription/create-prescription/create-prescription.component';
import { PrescriptionListComponent } from './prescription/prescription-list/prescription-list.component';
import { VarifyPrescriptionComponent } from './prescription/varify-prescription/varify-prescription.component';
import { WebcamDialogComponent } from './webcam-dialog/webcam-dialog.component';
import { CompletePrescriptionComponent } from './prescription/complete-prescription/complete-prescription.component';
import { VerifyResultComponent } from './verify-result/verify-result.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    CreatePrescriptionComponent,
    PrescriptionListComponent,
    VarifyPrescriptionComponent,
    WebcamDialogComponent,
    CompletePrescriptionComponent,
    VerifyResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
    AuthModule,
    WebcamModule
  ],
  providers: [
    // HTTP_INTERCEPTORS token provided by angular
    // multi: true indicates that there can be multiple interceptors
    // don't overwrite the previous one
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  // since errorComponent is not created through selector or routing
  // need to tell Angular to be ready to load this component
  entryComponents: [
    ErrorComponent,
    WebcamDialogComponent,
    VerifyResultComponent
  ],
})
export class AppModule {}
