// modules in angular are building blocks
// that angular analyses to know whcih features
// your app uses

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { CreatePrescriptionComponent } from './prescription/create-prescription/create-prescription.component';
import { PrescriptionListComponent } from './prescription/prescription-list/prescription-list.component';
import { VarifyPrescriptionComponent } from './prescription/varify-prescription/varify-prescription.component';
import { CompletePrescriptionComponent } from './prescription/complete-prescription/complete-prescription.component';

// routes are js objects which decide for which url,
// which part of app should be presented

const routes: Routes = [
  // empty path means root path
  { path: 'verify', component: VarifyPrescriptionComponent },
  { path: 'complete', component: CompletePrescriptionComponent },
  // localhost:4200/create
  {
    path: 'create',
    component: CreatePrescriptionComponent,
    canActivate: [AuthGuard],
  },
  //{ path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: PrescriptionListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
